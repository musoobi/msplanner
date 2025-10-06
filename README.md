# Microsoft Planner Integration

A comprehensive Microsoft Planner integration using the Microsoft Graph API.

## Features

- Microsoft 365 authentication
- Plan and task management
- Real-time synchronization
- Microsoft Graph API integration
- Azure AD authentication

## Microsoft Graph API Integration

This project integrates with Microsoft Planner using the [Microsoft Graph Planner API](https://learn.microsoft.com/en-us/graph/api/resources/planner-overview?view=graph-rest-1.0).

### Supported Operations

- **Plans**: Create, read, update, delete plans
- **Tasks**: Full task lifecycle management
- **Buckets**: Organize tasks in custom columns
- **Assignments**: Assign tasks to users
- **Visualization**: Board views and task organization

### API Endpoints Used

- `GET /groups/{group-id}/planner/plans` - Get plans in a group
- `GET /planner/plans/{plan-id}/tasks` - Get tasks in a plan
- `POST /planner/tasks` - Create new tasks
- `PATCH /planner/tasks/{task-id}` - Update tasks

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure Microsoft 365 credentials
4. Set up environment variables
5. Run the application: `npm start`

## Environment Variables

```bash
MICROSOFT_CLIENT_ID=your-client-id
MICROSOFT_CLIENT_SECRET=your-client-secret
MICROSOFT_TENANT_ID=your-tenant-id
MICROSOFT_GRAPH_ENDPOINT=https://graph.microsoft.com/v1.0
```

## Development

- `npm run dev` - Start development server
- `npm run test` - Run tests
- `npm run test:planner` - Test Microsoft Graph integration
- `npm run lint` - Run linter
- `npm run format` - Format code

## Version Management

- `npm run version:show` - Show current version
- `npm run version:patch` - Bump patch version
- `npm run version:minor` - Bump minor version
- `npm run version:major` - Bump major version

## Microsoft 365 Requirements

- Microsoft 365 Business or Enterprise license
- Microsoft Graph API permissions
- Azure AD application registration
- Appropriate Planner permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Microsoft 365
5. Submit a pull request

## License

MIT License - see LICENSE file for details
