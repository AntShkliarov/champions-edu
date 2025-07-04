# 🚀 01. Start Here - Setup & Smart Locators

**Welcome to the Cursor Test Automation Workshop!**

⏱️ **This Session**: Setup (10 min) + Exercise 1 (30 min) = 40 minutes total
🎯 **Goal**: Master AI-assisted locator generation and test automation setup

## Prerequisites

**🛠 AI Code Assistant**:
- **Primary Tool**: Cursor IDE (licensed by company, request via MyApp)
- **Alternatives**: GitHub Copilot, Gemini, Windsurf, RooCode, or any AI code assistant provided by your client
- **📝 Note**: Examples use Cursor IDE commands, but adapt to your chosen tool

**📋 Required**:
- Node.js 22+
- TypeScript familiarity
- Git basics

## Part 1: Environment Setup (15 min)

### Step 1: Clone & Install
```bash
cd workspace
npm install
npx playwright install
```

### Step 2: Verify Setup
```bash
npm run setup-check
```
✅ Should show: "✓ Setup complete - ready for AI-assisted testing!"

### Step 3: Open in AI Assistant
- **Cursor IDE**: Open project folder in Cursor
- **Other Tools**: Open project in your IDE with AI assistant enabled
- **Verify**: AI assistant is active and responding

## Part 2: Smart Locator Generation (25 min)

### Exercise: Modernize Legacy Selectors

**📂 File**: `workspace/practice-artifacts/sample-todo-page.html`

**🎯 Mission**: Transform fragile selectors using AI assistance

### Step 1: Examine the Legacy Test (5 min)

**Open**: `workspace/tests/01-smart-locators.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test('legacy todo test - needs modernization', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/practice-artifacts/sample-todo-page.html');

  // 🚨 FRAGILE SELECTORS - Let's fix with AI!
  await page.locator('#todoInput').fill('Learn AI testing');
  await page.locator('button[onclick="addTodo()"]').click();
  await page.locator('.todo-item:last-child .todo-text').textContent();
});
```

### Step 2: AI-Powered Locator Improvements (10 min)

**🤖 AI Assistant Prompt** (Cursor: `Cmd/Ctrl + L`, adapt for other tools):

```
I have this Playwright test with fragile CSS selectors. Please help me improve the locators to be more resilient and maintainable.

Current test uses:
- #todoInput
- button[onclick="addTodo()"]
- .todo-item:last-child .todo-text

Please suggest better locator strategies and rewrite the test with modern best practices.
```

**🎯 Expected AI Output**: Data-testid selectors, getByRole patterns, semantic locators

### Step 3: Implement AI Suggestions (10 min)

**✨ Apply the AI-generated improvements**:

```typescript
import { test, expect } from '@playwright/test';

test('modern todo test - AI optimized', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/practice-artifacts/sample-todo-page.html');

  // ✅ RESILIENT SELECTORS - AI improved!
  await page.getByTestId('todo-input').fill('Learn AI testing');
  await page.getByRole('button', { name: 'Add Todo' }).click();
  await expect(page.getByTestId('todo-list')).toContainText('Learn AI testing');
});
```

### Step 4: Advanced Locator Challenge (Optional)

**🔥 Challenge**: Ask AI to generate locators for complex scenarios

**🤖 Advanced Prompt**:
```
Help me create robust locators for testing dynamic content:
1. A todo item that appears after clicking "Add"
2. Filtering todos by status (completed/pending)
3. Bulk selection with checkboxes
4. Drag and drop reordering

Prioritize accessibility and semantic meaning over CSS classes.
```

## Part 3: Validation & Testing (10 min)

### Run Your Improved Test
```bash
npx playwright test 01-smart-locators.spec.ts --headed
```

### Practical Tips

1. **Use latest AI models** to receive better results (this workshop has been tested with Claude 3.7 Sonnet and Claude 4)
2. **Use Cursor's Agent mode** to create files automatically and make direct code changes
3. **Let AI fix failing tests** - When tests fail, let AI to find solutions
4. **Use keyboard shortcuts** - Press Ctrl+Z in chat's terminal after opening test reports to continue execution/ autofixing errors
5. **Be specific in your prompts** - Include details about what you're trying to test and the expected behavior

### Self-Evaluation Checklist

**✅ Locator Quality**:
- [ ] Using `data-testid` attributes where available
- [ ] Leveraging `getByRole()` for interactive elements
- [ ] Avoiding fragile CSS class selectors
- [ ] Semantic locators over positional ones

**✅ AI Collaboration**:
- [ ] Successfully prompted AI for locator improvements
- [ ] Applied AI suggestions with understanding
- [ ] Can articulate why new locators are better
- [ ] Comfortable asking follow-up questions to AI

**✅ Test Quality**:
- [ ] Test runs consistently without failures
- [ ] Assertions verify actual user value
- [ ] Code is readable and maintainable
- [ ] Follows Playwright best practices

## 🎉 Success Metrics

**Champion Level**:
- Generated 5+ different locator strategies with AI
- Can explain trade-offs between locator types
- Test passes 10 consecutive runs
- Ready to teach others

## Next Steps

**✅ Completed Smart Locators?**
👉 **Continue to**: [02_PAGE_OBJECTS.md](./02_PAGE_OBJECTS.md)

---

*🤖 Pro Tip: The AI assistant is your pair programming partner - don't hesitate to ask for explanations, alternatives, or improvements!*

---

## 🆘 Troubleshooting

**Cursor AI not responding?**
- Check internet connection
- Restart Cursor completely
- Verify you're signed in

**Tests not running?**
```bash
# Check Node version (need 22+)
node --version

# Clean reinstall
cd workspace
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

---

## 🎯 What's Next?

**✅ Completed Exercise 1?**

👉 **Continue to: `02_PAGE_OBJECTS.md`**

You'll learn how to transform messy test code into professional, maintainable Page Object Models using Cursor AI.

**💡 Pro Tip**: The locators you create here will be the foundation for building robust page objects in Exercise 2!

**🚀 Great job getting started with AI-assisted test automation!**