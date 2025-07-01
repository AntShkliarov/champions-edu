# 🤖 05. Playwright MCP Integration

> **📚 This is optional advanced content**  
> Complete the main course modules (01-04) first before exploring MCP integration.

---

# 🤖 Playwright MCP Integration Guide

## What is Playwright MCP?

**MCP (Model Context Protocol)** is a standardized way for AI tools to interact with external systems. The Playwright MCP server allows AI assistants like Cursor to:

- Control browsers directly through natural language
- Generate tests by observing page interactions  
- Debug tests interactively with AI assistance
- Provide real-time guidance during test development

## 🚀 Getting Started

### Prerequisites
- Node.js 22+ installed
- Playwright project set up
- Cursor AI or compatible MCP client

### Installation

```bash
# Install the Playwright MCP server
npm install -g @modelcontextprotocol/server-playwright

# Or for local project
npm install --save-dev @modelcontextprotocol/server-playwright
```

### Configuration

1. **Create MCP Configuration** (`mcp-config.json`):
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-playwright"],
      "env": {
        "PLAYWRIGHT_BROWSER": "chromium",
        "PLAYWRIGHT_HEADLESS": "false"
      }
    }
  }
}
```

2. **Configure Cursor for MCP**:
   - Open Cursor Settings
   - Navigate to "Extensions" → "MCP"
   - Add the configuration file path
   - Restart Cursor

## 🎯 Practical Examples

### Example 1: AI-Guided Test Creation

**Cursor Prompt:**
```
Using Playwright MCP, help me create a test for the todo application:

1. Navigate to the todo page
2. Observe the page structure
3. Generate a test that adds a new todo item
4. Verify the todo appears in the list

Guide me through each step and explain what you're doing.
```

**Expected MCP Interaction:**
```typescript
// MCP will help generate this test interactively
test('AI-guided todo creation', async ({ page }) => {
  // MCP navigates and analyzes the page
  await page.goto('file://./practice-artifacts/sample-todo-page.html');
  
  // MCP identifies optimal locators
  const titleInput = page.locator('[data-testid="todo-title-input"]');
  const addButton = page.locator('[data-testid="add-todo-btn"]');
  
  // MCP guides test actions
  await titleInput.fill('AI-generated todo');
  await addButton.click();
  
  // MCP suggests assertions
  await expect(page.locator('[data-testid="todo-list"]'))
    .toContainText('AI-generated todo');
});
```

### Example 2: Interactive Debugging

**Cursor Prompt:**
```
My test is failing on the todo page. Use MCP to:
1. Navigate to the page
2. Inspect the failing element
3. Suggest why the test might be failing
4. Provide alternative locator strategies

Help me debug this interactively.
```

**MCP Debug Session:**
```typescript
// MCP helps debug step by step
test.describe('Debug with MCP assistance', () => {
  test('debug failing locator', async ({ page }) => {
    await page.goto('file://./practice-artifacts/sample-todo-page.html');
    
    // MCP analyzes why this might fail
    // const failingLocator = page.locator('.todo-item-title'); // Fragile!
    
    // MCP suggests better alternatives
    const betterLocator = page.locator('[data-testid="todo-title-1"]');
    
    // MCP validates the fix
    await expect(betterLocator).toBeVisible();
  });
});
```

### Example 3: Page Analysis and Optimization

**Cursor Prompt:**
```
Use MCP to analyze the todo page and:
1. Identify all interactive elements
2. Suggest optimal test data IDs
3. Generate a comprehensive page object model
4. Recommend testing strategies

Provide detailed analysis with reasoning.
```

**MCP Analysis Output:**
```typescript
// MCP generates comprehensive page analysis
interface MCPPageAnalysis {
  elements: {
    forms: Array<{
      selector: string;
      purpose: string;
      testId: string;
      recommendation: string;
    }>;
    buttons: Array<{
      selector: string;
      action: string;
      reliability: 'high' | 'medium' | 'low';
      suggestion: string;
    }>;
    lists: Array<{
      selector: string;
      itemSelector: string;
      dynamicContent: boolean;
      testStrategy: string;
    }>;
  };
  recommendations: {
    pageObjectStructure: string;
    testDataStrategy: string;
    reliabilityImprovements: string[];
  };
}
```

## 🛠️ Advanced MCP Patterns

### Pattern 1: Dynamic Test Generation

```typescript
// MCP can generate tests based on page state
test('MCP dynamic test generation', async ({ page }) => {
  await page.goto('file://./practice-artifacts/sample-todo-page.html');
  
  // MCP analyzes current page state
  const todoCount = await page.locator('[data-testid^="todo-item-"]').count();
  
  // MCP generates appropriate test based on state
  if (todoCount === 0) {
    // Generate empty state test
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
  } else {
    // Generate todo interaction test
    const firstTodo = page.locator('[data-testid="todo-item-1"]');
    await expect(firstTodo).toBeVisible();
  }
});
```

### Pattern 2: AI-Assisted Locator Healing

```typescript
// MCP helps create self-healing locators
class MCPLocatorStrategy {
  static async findElement(page: Page, description: string) {
    // MCP tries multiple strategies
    const strategies = [
      `[data-testid*="${description.toLowerCase()}"]`,
      `[aria-label*="${description}"]`,
      `text=${description}`,
      // MCP suggests more based on page analysis
    ];
    
    for (const strategy of strategies) {
      try {
        const element = page.locator(strategy);
        if (await element.count() > 0) {
          return element;
        }
      } catch (error) {
        // MCP logs and continues to next strategy
        continue;
      }
    }
    
    throw new Error(`MCP could not locate element: ${description}`);
  }
}
```

### Pattern 3: Real-time Test Assistance

```typescript
// MCP provides real-time testing guidance
test('MCP assisted test development', async ({ page }) => {
  // MCP guides navigation
  await page.goto('file://./practice-artifacts/sample-todo-page.html');
  
  // MCP suggests next actions based on page state
  const mcpSuggestion = await getMCPSuggestion(page);
  console.log('MCP suggests:', mcpSuggestion.nextAction);
  
  // MCP helps validate actions
  await page.fill('[data-testid="todo-title-input"]', 'MCP guided test');
  
  // MCP provides assertion recommendations
  const assertionSuggestions = await getMCPAssertions(page);
  
  // Execute MCP recommended assertions
  for (const assertion of assertionSuggestions) {
    await expect(page.locator(assertion.selector))[assertion.method](assertion.value);
  }
});

async function getMCPSuggestion(page: Page): Promise<MCPSuggestion> {
  // This would integrate with actual MCP server
  return {
    nextAction: 'Fill the todo title input with test data',
    confidence: 0.95,
    alternatives: ['Click add button directly', 'Select priority first']
  };
}
```

## 🎨 MCP Prompts for Different Scenarios

### For Beginners
```
"Use MCP to teach me Playwright basics by:
1. Showing me how to navigate to a page
2. Identifying elements step by step
3. Explaining why you choose specific locators
4. Walking through creating my first test

Be detailed and educational in your explanations."
```

### For Debugging
```
"My Playwright test is failing with [error message]. Use MCP to:
1. Analyze the current page state
2. Identify why the locator isn't working
3. Suggest 3 alternative approaches
4. Help me implement the best solution

Show me the debugging process step by step."
```

### For Page Object Creation
```
"Analyze this page using MCP and create a professional page object model:
1. Identify all major page sections
2. Group related functionality
3. Suggest optimal method names
4. Include error handling strategies
5. Provide usage examples

Make it production-ready with TypeScript types."
```

### For Performance Optimization
```
"Use MCP to optimize my test performance by:
1. Analyzing current wait strategies
2. Identifying unnecessary delays
3. Suggesting parallel execution opportunities
4. Recommending caching strategies

Provide before/after comparisons with timing data."
```

## 📊 MCP Benefits & Limitations

### ✅ Benefits
- **Interactive Learning**: Real-time guidance and explanations
- **Dynamic Analysis**: Adapts to current page state
- **Error Recovery**: Suggests alternatives when tests fail
- **Best Practices**: Enforces testing standards automatically
- **Rapid Development**: Faster test creation and debugging

### ⚠️ Limitations
- **Network Dependency**: Requires stable internet connection
- **Learning Curve**: New paradigm for test development
- **Tool Integration**: May require specific IDE setup
- **Resource Usage**: Additional computational overhead
- **Debugging Complexity**: New layer in the testing stack

## 🔧 Troubleshooting

### Common Issues

**1. MCP Server Not Starting**
```bash
# Check installation
npm list @modelcontextprotocol/server-playwright

# Reinstall if needed
npm uninstall -g @modelcontextprotocol/server-playwright
npm install -g @modelcontextprotocol/server-playwright
```

**2. Cursor Not Connecting to MCP**
- Verify MCP configuration in Cursor settings
- Check firewall/security settings
- Restart Cursor completely
- Review MCP server logs

**3. MCP Commands Not Working**
- Ensure Playwright is properly installed
- Check browser availability
- Verify page accessibility
- Review MCP server permissions

### Debug Commands

```bash
# Test MCP server directly
npx @modelcontextprotocol/server-playwright --help

# Check MCP connection
curl -X POST http://localhost:3000/mcp/health

# View MCP logs
tail -f ~/.cursor/mcp-logs/playwright.log
```

## 🚀 Next Steps

### Immediate Actions
1. **Set up MCP**: Follow installation and configuration steps
2. **Try Basic Example**: Start with simple page navigation
3. **Practice Prompting**: Experiment with different AI requests
4. **Document Learnings**: Keep track of effective prompts

### Advanced Exploration
1. **Custom MCP Tools**: Create domain-specific MCP extensions
2. **Team Integration**: Share MCP configurations and best practices
3. **CI/CD Integration**: Explore MCP in automated environments
4. **Performance Monitoring**: Track MCP impact on test execution

### Learning Resources
- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [Playwright MCP Examples](https://github.com/modelcontextprotocol/servers)
- [Community Discord](https://discord.gg/playwright)
- [AI Testing Patterns](https://testautomationu.applitools.com/)

---

**💡 Pro Tip**: Start with simple MCP interactions and gradually build complexity. The real power of MCP comes from iterative learning and refinement of your AI prompts.

**🎯 Goal**: Use MCP to augment your testing skills, not replace your expertise. The AI is your pair programming partner, not your replacement!

Happy Testing with AI! 🤖🚀 