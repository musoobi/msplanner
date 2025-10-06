# Branch Strategy for Microsoft Planner Integration

## Main Branches

### `main`
- Production-ready Microsoft Planner integration
- Protected branch
- Only updated via pull requests
- All commits must be tested and reviewed
- Microsoft Graph API compatibility verified

### `develop`
- Integration branch for Planner features
- Main development branch
- Feature branches merge here first
- Microsoft Graph API testing environment

## Supporting Branches

### Feature Branches
- Format: `feature/planner-description` or `feature/graph-description`
- Examples: 
  - `feature/planner-task-sync`
  - `feature/graph-authentication`
  - `feature/planner-365-integration`
- Created from `develop`
- Merged back to `develop`

### Planner-Specific Branches
- `feature/planner-api-v1` - Microsoft Graph Planner API v1.0 features
- `feature/planner-authentication` - Azure AD authentication
- `feature/planner-sync` - Plan and task synchronization
- `feature/planner-webhooks` - Real-time updates

### Release Branches
- Format: `release/planner-version-number`
- Examples: `release/planner-1.2.0`
- Created from `develop`
- Used for final testing with Microsoft 365
- Merged to both `main` and `develop`

### Hotfix Branches
- Format: `hotfix/planner-description`
- Examples: `hotfix/planner-auth-token-refresh`
- Created from `main`
- Merged to both `main` and `develop`

## Microsoft Graph API Considerations

### API Versioning
- Track Microsoft Graph API versions in branch names
- `feature/graph-api-v1.0` - Current stable API
- `feature/graph-api-beta` - Beta features and testing

### Authentication Branches
- `feature/msal-authentication` - Microsoft Authentication Library
- `feature/service-principal` - Service principal authentication
- `feature/delegated-permissions` - User-delegated permissions

## Workflow for Planner Integration

1. Create feature branch from `develop`
2. Develop and test with Microsoft 365 test tenant
3. Test Microsoft Graph API calls and permissions
4. Create pull request to `develop`
5. Code review focusing on:
   - Microsoft Graph API best practices
   - Authentication security
   - Rate limiting compliance
   - Error handling for Planner API
6. Merge to `develop`
7. Create release branch for Microsoft 365 production testing
8. Final testing with production Microsoft 365 tenant
9. Merge release branch to `main` and `develop`
10. Tag release in `main`

## Commit Convention for Planner Integration

We follow [Conventional Commits](https://www.conventionalcommits.org/) with Planner-specific types:

```
type(scope): description

[optional body]

[optional footer(s)]
```

### Types:
- `feat`: New Planner feature
- `fix`: Bug fix in Planner integration
- `docs`: Documentation for Planner API usage
- `style`: Code style changes
- `refactor`: Refactor Planner API calls
- `test`: Tests for Planner functionality
- `chore`: Maintenance tasks
- `planner`: Planner-specific changes
- `graph`: Microsoft Graph API changes

### Planner-Specific Scopes:
- `auth`: Authentication and authorization
- `plans`: Plan management
- `tasks`: Task operations
- `buckets`: Bucket management
- `assignments`: Task assignments
- `sync`: Synchronization features
- `api`: Microsoft Graph API calls

### Examples:
```
feat(planner): add task creation with Microsoft Graph API
fix(auth): resolve token refresh for Planner access
planner(tasks): implement task assignment functionality
graph(api): update to Microsoft Graph API v1.0
docs(planner): add Microsoft 365 setup instructions
test(planner): add unit tests for plan synchronization
```

## Microsoft 365 Integration Considerations

### Environment-Specific Branches
- `feature/planner-dev-tenant` - Development Microsoft 365 tenant
- `feature/planner-test-tenant` - Testing Microsoft 365 tenant
- `feature/planner-prod-tenant` - Production Microsoft 365 tenant

### Security Branches
- `feature/planner-permissions` - Microsoft 365 permissions management
- `feature/planner-compliance` - Microsoft 365 compliance features
- `feature/planner-security` - Security enhancements

### API Rate Limiting
- Monitor Microsoft Graph API rate limits
- Implement proper retry logic
- Handle 429 (Too Many Requests) responses
- Use appropriate backoff strategies
