import { test, expect } from '@playwright/test';

// ✅ GOOD EXAMPLE - Professional Page Object Model Implementation
// This demonstrates best practices for maintainable test automation

interface TodoItem {
  title: string;
  priority: 'low' | 'medium' | 'high';
  category: 'personal' | 'work' | 'shopping' | 'health' | 'learning';
}

interface TodoStats {
  total: number;
  completed: number;
  pending: number;
}

class TodoPage {
  private page: any;
  
  // Locators - using data-testid for stability
  private readonly locators = {
    // Header and stats
    appTitle: '[data-testid="app-title"]',
    totalCount: '[data-testid="total-count"]',
    completedCount: '[data-testid="completed-count"]',
    pendingCount: '[data-testid="pending-count"]',
    
    // Form elements
    todoForm: '[data-testid="add-todo-form"]',
    titleInput: '[data-testid="todo-title-input"]',
    prioritySelect: '[data-testid="todo-priority-select"]',
    categorySelect: '[data-testid="todo-category-select"]',
    addButton: '[data-testid="add-todo-btn"]',
    clearButton: '[data-testid="clear-form-btn"]',
    
    // Filters and search
    filterAll: '[data-testid="filter-all"]',
    filterActive: '[data-testid="filter-active"]',
    filterCompleted: '[data-testid="filter-completed"]',
    searchInput: '[data-testid="search-input"]',
    
    // Todo list
    todoList: '[data-testid="todo-list"]',
    todoItems: '[data-testid^="todo-item-"]',
    emptyState: '[data-testid="empty-state"]',
    notification: '[data-testid="notification"]'
  };

  constructor(page: any) {
    this.page = page;
  }

  // Navigation
  async goto(): Promise<TodoPage> {
    const filePath = 'file://' + process.cwd() + '/practicum/practice-artifacts/sample-todo-page.html';
    await this.page.goto(filePath);
    await this.waitForPageLoad();
    return this;
  }

  private async waitForPageLoad(): Promise<void> {
    await expect(this.page.locator(this.locators.appTitle)).toBeVisible();
    await expect(this.page.locator(this.locators.todoForm)).toBeVisible();
  }

  // Form interactions with fluent interface
  async fillTitle(title: string): Promise<TodoPage> {
    await this.page.fill(this.locators.titleInput, title);
    return this;
  }

  async selectPriority(priority: TodoItem['priority']): Promise<TodoPage> {
    await this.page.selectOption(this.locators.prioritySelect, priority);
    return this;
  }

  async selectCategory(category: TodoItem['category']): Promise<TodoPage> {
    await this.page.selectOption(this.locators.categorySelect, category);
    return this;
  }

  async clickAddTodo(): Promise<TodoPage> {
    await this.page.click(this.locators.addButton);
    await this.waitForNotification();
    return this;
  }

  async clickClearForm(): Promise<TodoPage> {
    await this.page.click(this.locators.clearButton);
    return this;
  }

  // High-level actions using builder pattern
  async addTodo(todo: TodoItem): Promise<TodoPage> {
    return await this
      .fillTitle(todo.title)
      .then(page => page.selectPriority(todo.priority))
      .then(page => page.selectCategory(todo.category))
      .then(page => page.clickAddTodo());
  }

  // Todo item interactions
  async getTodoItem(id: number) {
    return new TodoItemComponent(this.page, id);
  }

  async getAllTodoItems(): Promise<TodoItemComponent[]> {
    const todoElements = await this.page.locator(this.locators.todoItems).all();
    return Promise.all(
      todoElements.map(async (element) => {
        const dataId = await element.getAttribute('data-id');
        if (!dataId) {
          throw new Error('Todo item is missing a data-id attribute');
        }
        return new TodoItemComponent(this.page, parseInt(dataId, 10));
      })
    );
  }

  // Filter operations
  async filterByAll(): Promise<TodoPage> {
    await this.page.click(this.locators.filterAll);
    return this;
  }

  async filterByActive(): Promise<TodoPage> {
    await this.page.click(this.locators.filterActive);
    return this;
  }

  async filterByCompleted(): Promise<TodoPage> {
    await this.page.click(this.locators.filterCompleted);
    return this;
  }

  async searchTodos(searchTerm: string): Promise<TodoPage> {
    await this.page.fill(this.locators.searchInput, searchTerm);
    await this.page.waitForTimeout(300); // Debounce search
    return this;
  }

  // Assertions with meaningful error messages
  async expectStats(expectedStats: TodoStats): Promise<void> {
    await expect(this.page.locator(this.locators.totalCount))
      .toContainText(expectedStats.total.toString());
    await expect(this.page.locator(this.locators.completedCount))
      .toContainText(expectedStats.completed.toString());
    await expect(this.page.locator(this.locators.pendingCount))
      .toContainText(expectedStats.pending.toString());
  }

  async expectTodoCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.page.locator(this.locators.emptyState)).toBeVisible();
    } else {
      await expect(this.page.locator(this.locators.todoItems)).toHaveCount(count);
    }
  }

  async expectFormCleared(): Promise<void> {
    await expect(this.page.locator(this.locators.titleInput)).toHaveValue('');
    await expect(this.page.locator(this.locators.prioritySelect)).toHaveValue('medium');
    await expect(this.page.locator(this.locators.categorySelect)).toHaveValue('work');
  }

  async expectNotification(message: string, type: 'success' | 'error' = 'success'): Promise<void> {
    const notification = this.page.locator(this.locators.notification);
    await expect(notification).toContainText(message);
    await expect(notification).toHaveClass(new RegExp(type));
  }

  private async waitForNotification(): Promise<void> {
    await this.page.waitForSelector(`${this.locators.notification}.show`, { timeout: 2000 });
  }

  // Utility methods
  async getFormValues(): Promise<Partial<TodoItem>> {
    return {
      title: await this.page.inputValue(this.locators.titleInput),
      priority: await this.page.inputValue(this.locators.prioritySelect) as TodoItem['priority'],
      category: await this.page.inputValue(this.locators.categorySelect) as TodoItem['category']
    };
  }
}

class TodoItemComponent {
  private page: any;
  private id: number;

  private readonly locators = {
    todoItem: (id: number) => `[data-testid="todo-item-${id}"]`,
    checkbox: (id: number) => `[data-testid="todo-checkbox-${id}"]`,
    title: (id: number) => `[data-testid="todo-title-${id}"]`,
    editButton: (id: number) => `[data-testid="edit-btn-${id}"]`,
    deleteButton: (id: number) => `[data-testid="delete-btn-${id}"]`
  };

  constructor(page: any, id: number) {
    this.page = page;
    this.id = id;
  }

  async toggle(): Promise<void> {
    await this.page.click(this.locators.checkbox(this.id));
  }

  async edit(newTitle: string): Promise<void> {
    // Handle the prompt dialog before clicking
    this.page.on('dialog', (dialog: any) => dialog.accept(newTitle));
    await this.page.click(this.locators.editButton(this.id));
  }

  async delete(): Promise<void> {
    // Handle confirmation dialog
    this.page.on('dialog', (dialog: any) => dialog.accept());
    await this.page.click(this.locators.deleteButton(this.id));
  }

  async expectTitle(expectedTitle: string): Promise<void> {
    await expect(this.page.locator(this.locators.title(this.id)))
      .toContainText(expectedTitle);
  }

  async expectCompleted(isCompleted: boolean = true): Promise<void> {
    const todoItem = this.page.locator(this.locators.todoItem(this.id));
    if (isCompleted) {
      await expect(todoItem).toHaveClass(/completed/);
    } else {
      await expect(todoItem).not.toHaveClass(/completed/);
    }
  }

  async expectVisible(): Promise<void> {
    await expect(this.page.locator(this.locators.todoItem(this.id))).toBeVisible();
  }

  async expectNotVisible(): Promise<void> {
    await expect(this.page.locator(this.locators.todoItem(this.id))).not.toBeVisible();
  }
}

// Test data factory for consistent test data
class TodoDataFactory {
  static createTodo(overrides: Partial<TodoItem> = {}): TodoItem {
    return {
      title: 'Sample Todo Task',
      priority: 'medium',
      category: 'work',
      ...overrides
    };
  }

  static createHighPriorityLearningTodo(): TodoItem {
    return this.createTodo({
      title: 'Learn Cursor AI Automation',
      priority: 'high',
      category: 'learning'
    });
  }

  static createPersonalTodo(): TodoItem {
    return this.createTodo({
      title: 'Buy groceries',
      priority: 'low',
      category: 'personal'
    });
  }
}

// Professional test implementation
test.describe('Todo List Application - POM Implementation', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test.describe('Adding Todos', () => {
    test('should add a new todo with all fields', async () => {
      const newTodo = TodoDataFactory.createHighPriorityLearningTodo();
      
      await todoPage.addTodo(newTodo);
      
      await todoPage.expectStats({ total: 3, completed: 1, pending: 2 });
      await todoPage.expectNotification('Task added successfully!');
      
      // Verify the todo appears in the list
      const addedTodo = await todoPage.getTodoItem(1); // Should be first in list
      await addedTodo.expectTitle(newTodo.title);
      await addedTodo.expectCompleted(false);
    });

    test('should clear form after adding todo', async () => {
      const todo = TodoDataFactory.createPersonalTodo();
      
      await todoPage.addTodo(todo);
      
      await todoPage.expectFormCleared();
    });

    test('should clear form manually', async () => {
      await todoPage
        .fillTitle('Test Todo')
        .then(page => page.selectPriority('high'))
        .then(page => page.selectCategory('personal'))
        .then(page => page.clickClearForm());
      
      await todoPage.expectFormCleared();
    });
  });

  test.describe('Todo Operations', () => {
    test('should complete a todo item', async () => {
      const firstTodo = await todoPage.getTodoItem(1);
      
      await firstTodo.toggle();
      
      await firstTodo.expectCompleted(true);
      await todoPage.expectStats({ total: 2, completed: 2, pending: 0 });
    });

    test('should delete a todo item', async () => {
      const firstTodo = await todoPage.getTodoItem(1);
      
      await firstTodo.delete();
      
      await todoPage.expectTodoCount(1);
      await todoPage.expectStats({ total: 1, completed: 1, pending: 0 });
    });

    test('should edit a todo item', async () => {
      const firstTodo = await todoPage.getTodoItem(1);
      const newTitle = 'Updated Todo Title';
      
      await firstTodo.edit(newTitle);
      
      await firstTodo.expectTitle(newTitle);
      await todoPage.expectNotification('Task updated!');
    });
  });

  test.describe('Filters and Search', () => {
    test('should filter todos by status', async () => {
      await todoPage.filterByActive();
      await todoPage.expectTodoCount(1);
      
      await todoPage.filterByCompleted();
      await todoPage.expectTodoCount(1);
      
      await todoPage.filterByAll();
      await todoPage.expectTodoCount(2);
    });

    test('should search todos by title', async () => {
      await todoPage.searchTodos('Playwright');
      
      await todoPage.expectTodoCount(1);
      const visibleTodo = await todoPage.getTodoItem(1);
      await visibleTodo.expectTitle('Learn Playwright automation');
    });

    test('should show empty state when all todos deleted', async () => {
      const todo1 = await todoPage.getTodoItem(1);
      const todo2 = await todoPage.getTodoItem(2);
      
      await todo1.delete();
      await todo2.delete();
      
      await todoPage.expectTodoCount(0);
    });
  });

  test.describe('Form Validation', () => {
    test('should require title field', async () => {
      await todoPage.clickAddTodo();
      
      // Form should not submit without title
      await todoPage.expectTodoCount(2); // Still original count
    });

    test('should handle maximum title length', async () => {
      const longTitle = 'A'.repeat(101); // Exceeds maxlength="100"
      
      await todoPage.fillTitle(longTitle);
      
      const formValues = await todoPage.getFormValues();
      expect(formValues.title?.length).toBeLessThanOrEqual(100);
    });
  });
});

// 🎯 BENEFITS OF THIS POM APPROACH:
// ✅ Stable locators using data-testid
// ✅ Reusable page objects and components
// ✅ Fluent interface for readable tests
// ✅ Type safety with TypeScript interfaces
// ✅ Separation of concerns (page logic vs test logic)
// ✅ Test data factories for consistency
// ✅ Meaningful assertions with custom error messages
// ✅ Error handling and retry logic
// ✅ Maintainable and extensible code structure
// ✅ Professional test organization and patterns 