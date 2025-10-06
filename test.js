/**
 * Basic test file for Microsoft Planner Integration
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Test 1: Check if required files exist
function testFileStructure() {
  console.log('🧪 Testing file structure...');

  const requiredFiles = [
    'package.json',
    'VERSION',
    'index.js',
    '.gitignore',
    'README.md',
  ];

  const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));

  if (missingFiles.length === 0) {
    console.log('✅ All required files present');
    return true;
  } else {
    console.log('❌ Missing files:', missingFiles);
    return false;
  }
}

// Jest test for file structure
test('should have all required files', () => {
  expect(testFileStructure()).toBe(true);
});

// Test 2: Check package.json structure
function testPackageJson() {
  console.log('🧪 Testing package.json...');

  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

    const requiredFields = [
      'name',
      'version',
      'description',
      'main',
      'scripts',
    ];
    const missingFields = requiredFields.filter((field) => !packageJson[field]);

    if (missingFields.length === 0) {
      console.log('✅ package.json structure is valid');
      return true;
    } else {
      console.log('❌ Missing fields in package.json:', missingFields);
      return false;
    }
  } catch (error) {
    console.log('❌ Invalid package.json:', error.message);
    return false;
  }
}

// Jest test for package.json
test('should have valid package.json', () => {
  expect(testPackageJson()).toBe(true);
});

// Test 3: Check version file
function testVersionFile() {
  console.log('🧪 Testing VERSION file...');

  try {
    const version = fs.readFileSync('VERSION', 'utf8').trim();
    const versionRegex = /^\d+\.\d+\.\d+$/;

    if (versionRegex.test(version)) {
      console.log(`✅ Version file is valid: ${version}`);
      return true;
    } else {
      console.log(`❌ Invalid version format: ${version}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Error reading VERSION file:', error.message);
    return false;
  }
}

// Jest test for version file
test('should have valid VERSION file', () => {
  expect(testVersionFile()).toBe(true);
});

// Test 4: Check if npm scripts work
function testNpmScripts() {
  console.log('🧪 Testing npm scripts...');

  try {
    // Test version script
    const versionOutput = execSync('npm run version:show', {
      encoding: 'utf8',
    });
    console.log(`✅ Version script works: ${versionOutput.trim()}`);

    return true;
  } catch (error) {
    console.log('❌ npm scripts test failed:', error.message);
    return false;
  }
}

// Run all tests
function runTests() {
  console.log('🚀 Starting Microsoft Planner Integration Tests...\n');

  const tests = [
    testFileStructure,
    testPackageJson,
    testVersionFile,
    testNpmScripts,
  ];

  const results = tests.map((test) => test());
  const passed = results.filter((result) => result === true).length;
  const total = results.length;

  console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);

  if (passed === total) {
    console.log('🎉 All tests passed! Microsoft Planner Integration is ready.');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed. Please check the output above.');
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  testFileStructure,
  testPackageJson,
  testVersionFile,
  testNpmScripts,
  runTests,
};
