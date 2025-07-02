# 🌐 03. API Testing - Backend Validation

**Master comprehensive API testing with AI assistance!**

⏱️ **This Session**: 30 minutes  
🎯 **Goal**: Build robust API test automation using AI code assistant  
🛠 **AI Assistant**: Cursor IDE (primary) or GitHub Copilot, Gemini, Windsurf, RooCode  
📝 **Note**: Examples use Cursor commands - adapt `Cmd/Ctrl + L` to your AI tool  
📋 **Prerequisites**: Completed `02_PAGE_OBJECTS.md`  
📋 **Next**: `04_ADVANCED_PATTERNS.md` (Expert Track) for advanced patterns

---

## 🎓 What You'll Learn

**From Simple Requests**:
```typescript
// Basic API call
const response = await request.get('/api/users/1');
expect(response.status()).toBe(200);
```

**To Professional API Testing**:
```typescript
// Comprehensive validation with AI-generated patterns
await ApiTestBuilder
  .forEndpoint('/api/users/1')
  .withExpectedStatus(200)
  .withSchemaValidation()
  .withPerformanceAssertions()
  .withSecurityChecks()
  .execute();
```

---

## 🌍 Step 1: Explore the Public API (5 min)

### JSONPlaceholder API Overview

**📡 Base URL**: `https://jsonplaceholder.typicode.com`

**Available Endpoints**:
- `GET /posts` - All blog posts
- `GET /posts/1` - Specific post
- `POST /posts` - Create new post
- `PUT /posts/1` - Update post
- `DELETE /posts/1` - Delete post
- `GET /users` - All users
- `GET /comments` - All comments

### Quick API Exploration

1. **Ask AI Assistant**:
   ```
   Help me understand the JSONPlaceholder API structure by analyzing these endpoints:
   - GET https://jsonplaceholder.typicode.com/posts/1
   - GET https://jsonplaceholder.typicode.com/users/1
   - GET https://jsonplaceholder.typicode.com/comments?postId=1
   
   For each endpoint, explain:
   1. The response structure and data types
   2. Required and optional fields
   3. Relationships between entities
   4. Potential test scenarios (happy path, edge cases, error conditions)
   5. Security considerations and validation needs
   
   Then suggest a comprehensive testing strategy.
   ```

2. **Study the Swagger**: Open `workspace/practice-artifacts/public-api-swagger.yaml` in [https://editor.swagger.io](https://editor.swagger.io/)

---

## 🔧 Step 2: Build API Test Foundation (15 min)

### Generate Professional API Tests

1. **Create**: `workspace/tests/03-api-comprehensive.spec.ts`

2. **Ask AI Assistant**:
   ```
   Create a comprehensive API test suite for JSONPlaceholder with these requirements:
   
   Test Architecture:
   - Use Playwright's request context for API calls
   - TypeScript interfaces for all response types
   - Reusable API client class with methods for each endpoint
   - Data validation using schema matching
   - Performance assertions (response time under 500ms)
   - Error handling and retry logic
   
   Test Coverage:
   - CRUD operations for posts (Create, Read, Update, Delete)
   - User management operations  
   - Comment system testing
   - Data relationships validation (posts → users, posts → comments)
   - Edge cases (invalid IDs, malformed data, boundary conditions)
   - HTTP status code validation
   - Response header verification
   - Content-Type assertions
   
   Advanced Features:
   - Parameterized tests for different data sets
   - Test data factories for generating realistic test data
   - Custom matchers for API-specific assertions
   - Parallel test execution optimization
   - Test cleanup and teardown
   
   Make it production-ready with proper error handling and logging.
   ```

3. **Study the Professional Example**: 
   - Open `workspace/practice-artifacts/sample-api-tests.spec.ts`
   - Note the patterns and structure used

### Key Patterns to Implement

**🏗️ API Client Class**:
```typescript
class JsonPlaceholderClient {
  constructor(private request: APIRequestContext) {}

  async getPosts(): Promise<Post[]> {
    const response = await this.request.get('/posts');
    expect(response.status()).toBe(200);
    return await response.json();
  }

  async createPost(post: CreatePostRequest): Promise<Post> {
    // Implementation with validation
  }
}
```

**🧩 TypeScript Interfaces**:
```typescript
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}
```

**🏭 Test Data Factory**:
```typescript
class ApiDataFactory {
  static createValidPost(): CreatePostRequest {
    return {
      title: 'AI-Generated Test Post',
      body: 'This is a comprehensive test scenario',
      userId: 1
    };
  }
}
```

---

## 🧪 Step 3: Basic API Validation (10 min)

### Implement Simple Validation

1. **Ask AI Assistant**:
   ```
   Add basic validation to my API tests:
   
   Status Code Validation:
   - Verify correct status codes for successful requests
   - Check appropriate error codes for invalid requests
   
   Response Structure:
   - Validate that responses contain expected fields
   - Check data types of key fields
   
   Basic Assertions:
   - Verify content-type headers
   - Check response times are reasonable
   
   Create simple helper functions for common assertions.
   ```

2. **Run your API tests**:
   ```bash
   cd workspace
   npx playwright test tests/03-api-comprehensive.spec.ts
   ```

### Example Basic Test

```typescript
test.describe('JSONPlaceholder API - Basic Validation', () => {
  test('should handle post lifecycle with validation', async ({ request }) => {
    const client = new JsonPlaceholderClient(request);
    
    // Create post with basic validation
    const newPost = ApiDataFactory.createValidPost();
    const created = await client.createPost(newPost);
    
    // Basic validations
    expect(created.id).toBeDefined();
    expect(created.title).toBe(newPost.title);
    expect(created.body).toBe(newPost.body);
    
    // Cleanup
    await client.deletePost(created.id);
  });
});
```

> **📚 Note**: Advanced API validation techniques (schema validation, performance testing, security testing, etc.) are covered in the Expert Track module `04_ADVANCED_PATTERNS.md`.

---

## ✅ Self-Evaluation

**Check off each item as you complete it:**

- [ ] **API Understanding**: Analyzed JSONPlaceholder endpoints and data structures
- [ ] **Client Architecture**: Built reusable API client class with proper methods
- [ ] **TypeScript Support**: Full interfaces for requests and responses
- [ ] **CRUD Coverage**: Implemented Create, Read, Update, Delete test scenarios
- [ ] **Schema Validation**: Added JSON schema validation for API contracts
- [ ] **Performance Testing**: Response time assertions and load testing patterns
- [ ] **Error Handling**: Proper error scenarios and edge case testing
- [ ] **Data Relationships**: Validated entity relationships (posts ↔ users ↔ comments)
- [ ] **Security Awareness**: Implemented basic security validation patterns

**🎯 Score: ___/9** (Need 7/9 to continue confidently)

### Quick Validation Test
```bash
# All API tests should pass
cd workspace
npx playwright test tests/03-api-comprehensive.spec.ts

# Verify test coverage includes both happy path and error scenarios
```

---

## 🎯 Key Benefits You've Achieved

**🔒 Contract Validation**:
- API responses match expected schemas
- Breaking changes detected automatically
- Data type safety enforced

**⚡ Performance Monitoring**:
- Response time thresholds validated
- Performance regression detection
- Load testing patterns established

**🛡️ Comprehensive Coverage**:
- CRUD operations fully tested
- Edge cases and error scenarios covered
- Data relationships validated

**🔧 Maintainable Architecture**:
- Reusable API client for multiple test files
- Type-safe interfaces prevent runtime errors
- Centralized test data management

---

## 🆘 Troubleshooting

**API tests failing?**
```bash
# Check network connectivity
curl https://jsonplaceholder.typicode.com/posts/1

# Verify JSON structure
# API might have updated - check current response format
```

**Schema validation errors?**
- Verify JSON schema definitions match actual API responses
- Check for optional vs required fields
- Validate array vs object response types

**Performance tests unstable?**
- Account for network latency variations
- Use appropriate timeout values
- Consider testing in different environments

---

## 🎯 What's Next?

**✅ Completed Exercise 3?**

**Core Track Complete!** You've mastered the essential skills for AI-assisted test automation.

**Ready for Expert Track?**  
→ Continue to: **[04_ADVANCED_PATTERNS.md](./04_ADVANCED_PATTERNS.md)** - Production-Ready Code

**💡 Pro Tip**: API testing often catches integration issues that UI tests miss!

**🌐 You've built a comprehensive API testing foundation!** 