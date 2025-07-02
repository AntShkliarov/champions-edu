import { test, expect } from '@playwright/test';

// ⚠️ BAD EXAMPLE - This test needs refactoring to POM
// This is intentionally written with anti-patterns for students to improve

test.describe('Todo List Tests - NEEDS REFACTORING', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the todo app
    await page.goto('file://' + process.cwd() + '/practicum/practice-artifacts/sample-todo-page.html');
  });

  test('should add a new todo item', async ({ page }) => {
    // Add a new todo - using fragile selectors
    await page.fill('#todo-title', 'Learn Cursor AI');
    await page.selectOption('#todo-priority', 'high');
    await page.selectOption('#todo-category', 'learning');
    await page.click('button[type="submit"]');
    
    // Verify the todo was added - poor assertions
    await expect(page.locator('.todo-item').last()).toContainText('Learn Cursor AI');
    await expect(page.locator('.priority-high').last()).toBeVisible();
    
    // Check stats updated
    await expect(page.locator('[data-testid="total-count"]')).toContainText('3');
  });

  test('should complete a todo item', async ({ page }) => {
    // Find and click the first checkbox - brittle selector
    await page.click('.todo-item:first-child .todo-checkbox');
    
    // Verify it's marked as completed
    await expect(page.locator('.todo-item:first-child')).toHaveClass(/completed/);
    
    // Check stats updated
    await expect(page.locator('[data-testid="completed-count"]')).toContainText('2');
  });

  test('should delete a todo item', async ({ page }) => {
    // Click delete button - fragile selector
    await page.click('.todo-item:first-child .btn-delete');
    
    // Handle confirmation dialog
    page.on('dialog', dialog => dialog.accept());
    
    // Verify todo was deleted
    await expect(page.locator('.todo-item')).toHaveCount(1);
    await expect(page.locator('[data-testid="total-count"]')).toContainText('1');
  });

  test('should filter todos by status', async ({ page }) => {
    // Click active filter
    await page.click('button[data-filter="active"]');
    
    // Should only show active todos
    await expect(page.locator('.todo-item')).toHaveCount(1);
    await expect(page.locator('.todo-item')).not.toHaveClass(/completed/);
    
    // Click completed filter
    await page.click('button[data-filter="completed"]');
    
    // Should only show completed todos
    await expect(page.locator('.todo-item')).toHaveCount(1);
    await expect(page.locator('.todo-item')).toHaveClass(/completed/);
  });

  test('should search todos', async ({ page }) => {
    // Type in search box
    await page.fill('[data-testid="search-input"]', 'Playwright');
    
    // Should filter to matching todos
    await expect(page.locator('.todo-item')).toHaveCount(1);
    await expect(page.locator('.todo-item')).toContainText('Learn Playwright automation');
  });

  test('should edit a todo item', async ({ page }) => {
    // Click edit button
    await page.click('.todo-item:first-child .btn-edit');
    
    // Handle prompt dialog
    page.on('dialog', dialog => dialog.accept('Updated todo title'));
    
    // Verify todo was updated
    await expect(page.locator('.todo-item:first-child .todo-title')).toContainText('Updated todo title');
  });

  test('should clear form', async ({ page }) => {
    // Fill form
    await page.fill('#todo-title', 'Test todo');
    await page.selectOption('#todo-priority', 'low');
    await page.selectOption('#todo-category', 'personal');
    
    // Click clear button
    await page.click('[data-testid="clear-form-btn"]');
    
    // Verify form is cleared
    await expect(page.locator('#todo-title')).toHaveValue('');
    await expect(page.locator('#todo-priority')).toHaveValue('medium');
    await expect(page.locator('#todo-category')).toHaveValue('work');
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Should show validation message
    const titleInput = page.locator('#todo-title');
    await expect(titleInput).toHaveAttribute('required');
    
    // Browser validation should prevent form submission
    await expect(page.locator('.todo-item')).toHaveCount(2); // Still 2 items
  });

  test('should show empty state when no todos', async ({ page }) => {
    // Delete all todos
    await page.click('.todo-item:first-child .btn-delete');
    page.on('dialog', dialog => dialog.accept());
    
    await page.click('.todo-item:first-child .btn-delete');
    
    // Should show empty state
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
    await expect(page.locator('[data-testid="empty-state"]')).toContainText('No tasks found');
  });
});

// 🔧 PROBLEMS WITH THIS TEST:
// 1. Fragile selectors (CSS classes instead of data-testid)
// 2. Repeated code - no reusable methods
// 3. No page object model - all interactions inline
// 4. Poor test organization - no logical grouping
// 5. Hardcoded values scattered throughout
// 6. No error handling or retry logic
// 7. Difficult to maintain and extend
// 8. No fluent interface for readability
// 9. Direct DOM manipulation without abstraction
// 10. No separation of concerns 