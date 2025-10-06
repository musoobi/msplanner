/**
 * Microsoft Planner Integration
 * A comprehensive Microsoft Planner integration using the Microsoft Graph API
 */

const express = require('express');
const { Client } = require('@microsoft/microsoft-graph-client');
const { ConfidentialClientApplication } = require('@azure/msal-node');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Microsoft Graph configuration
const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
  },
};

const msalInstance = new ConfidentialClientApplication(msalConfig);

// Initialize Microsoft Graph client
let graphClient;

async function initializeGraphClient() {
  try {
    const clientCredentialRequest = {
      scopes: ['https://graph.microsoft.com/.default'],
    };

    const response = await msalInstance.acquireTokenByClientCredential(
      clientCredentialRequest
    );

    graphClient = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          return response.accessToken;
        },
      },
    });

    console.log('✅ Microsoft Graph client initialized successfully');
    return true;
  } catch (error) {
    console.error(
      '❌ Failed to initialize Microsoft Graph client:',
      error.message
    );
    return false;
  }
}

// Test Microsoft Planner API endpoints
async function testPlannerAPI() {
  try {
    console.log('🧪 Testing Microsoft Planner API...');

    // Test 1: Get user's groups
    console.log('📋 Testing: Get user groups...');
    const groups = await graphClient.groups.get();
    console.log(`✅ Found ${groups.value.length} groups`);

    // Test 2: Get plans from first group (if any)
    if (groups.value.length > 0) {
      const groupId = groups.value[0].id;
      console.log(`📋 Testing: Get plans from group ${groupId}...`);

      try {
        const plans = await graphClient.groups
          .byGroupId(groupId)
          .planner.plans.get();
        console.log(`✅ Found ${plans.value.length} plans in group`);

        // Test 3: Get tasks from first plan (if any)
        if (plans.value.length > 0) {
          const planId = plans.value[0].id;
          console.log(`📋 Testing: Get tasks from plan ${planId}...`);

          try {
            const tasks = await graphClient.planner.plans
              .byPlannerPlanId(planId)
              .tasks.get();
            console.log(`✅ Found ${tasks.value.length} tasks in plan`);
          } catch (taskError) {
            console.log(`⚠️  Could not access tasks: ${taskError.message}`);
          }
        }
      } catch (planError) {
        console.log(`⚠️  Could not access plans: ${planError.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error('❌ Planner API test failed:', error.message);
    return false;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: require('./VERSION').trim(),
  });
});

// Test endpoint
app.get('/test', async (req, res) => {
  try {
    if (!graphClient) {
      const initialized = await initializeGraphClient();
      if (!initialized) {
        return res.status(500).json({
          error: 'Failed to initialize Microsoft Graph client',
          message:
            'Check your environment variables and Microsoft 365 credentials',
        });
      }
    }

    const testResults = await testPlannerAPI();

    res.json({
      status: 'test_completed',
      results: testResults,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Test failed',
      message: error.message,
    });
  }
});

// Main endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Microsoft Planner Integration API',
    version: require('./VERSION').trim(),
    endpoints: {
      health: '/health',
      test: '/test',
    },
    documentation:
      'https://learn.microsoft.com/en-us/graph/api/resources/planner-overview',
  });
});

// Start server
async function startServer() {
  console.log('🚀 Starting Microsoft Planner Integration Server...');
  console.log(`📊 Version: ${require('./VERSION').trim()}`);

  // Check environment variables
  const requiredEnvVars = [
    'MICROSOFT_CLIENT_ID',
    'MICROSOFT_CLIENT_SECRET',
    'MICROSOFT_TENANT_ID',
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.log('⚠️  Missing environment variables:');
    missingVars.forEach((varName) => console.log(`   - ${varName}`));
    console.log(
      '📝 Please create a .env file with your Microsoft 365 credentials'
    );
  } else {
    console.log('✅ All required environment variables found');

    // Initialize Graph client
    await initializeGraphClient();
  }

  app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log('🔗 Test endpoints:');
    console.log(`   - Health: http://localhost:${PORT}/health`);
    console.log(`   - Test: http://localhost:${PORT}/test`);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Microsoft Planner Integration Server...');
  process.exit(0);
});

startServer().catch(console.error);
