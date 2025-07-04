# Self-Check Quiz: Coding Assistants - Theory

## Instructions
This quiz tests your understanding of coding assistants theory from Modules 1-3. Each question requires thoughtful analysis rather than simple recall. Consider the practical implications and strategic aspects of using coding assistants effectively.

---

## Question 1: Strategic Model Selection

You're working on a complex enterprise application that requires implementing a new authentication system with multiple OAuth providers, custom middleware, and extensive error handling. The task involves modifying 15+ files across different layers of the architecture.

**Scenario A:** Your teammate suggests using GPT-4o for this task because "it's fast and gets things done quickly."

**Scenario B:** Another colleague recommends Claude 4 Sonnet with Agent Mode.

Analyze both approaches and explain:
1. Which model would be more appropriate and why?
2. What specific risks does each approach present?
3. How would you structure your prompts to maximize success?

---

## Question 2: Agent Mode vs. Traditional Prompting

Compare these two approaches for implementing a comprehensive test suite for a new feature:

**Approach A:** Using traditional single-prompt interactions:
- "Generate unit tests for UserService.ts"
- "Create integration tests for the user API endpoints"  
- "Add mock data for user testing scenarios"

**Approach B:** Using Agent Mode with a comprehensive prompt:
- "Implement a complete test suite for the user management feature following our existing patterns, including unit tests, integration tests, and mock data generation."

Explain:
1. What are the key advantages and disadvantages of each approach?
2. In what scenarios would you choose one over the other?
3. How do Coding Assistant Rules impact the effectiveness of each approach?

---

## Question 3: Context Management and @ Tagging

You're refactoring a legacy codebase where the same login logic is duplicated across multiple test files. You have:
- `@test/utils/LoginHelper.ts` (shared utility)
- `@test/specs/AdminLogin.spec.ts` (duplicated logic)
- `@test/specs/UserLogin.spec.ts` (duplicated logic)
- `@test/specs/GuestLogin.spec.ts` (duplicated logic)
- `@docs/TestingPatterns.md` (project guidelines)

Construct an effective prompt using @ tagging that would help a coding assistant apply the DRY principle effectively. Explain your reasoning for:
1. Which files to reference and in what order
2. How to structure the prompt for maximum clarity
3. What potential issues might arise and how to prevent them


## Question 4: Coding Assistant Rules Design

You're establishing Coding Assistant Rules for a React TypeScript project that uses:
- Jest for testing with custom matchers
- Styled-components for styling
- Redux Toolkit for state management
- Strict ESLint configuration
- Custom architectural patterns (feature-based folder structure)

Design a comprehensive Coding Assistant Rules strategy that addresses:
1. What specific conventions should be documented?
2. How would you handle the "over-engineering" tendency of Claude models?
3. What workflow documentation would be most valuable?
4. How would you balance automation with developer decision-making?

---

## Question 5: Cross-Platform Feature Comparison

A development team is choosing between GitHub Copilot and Cursor for their main development workflow. They need:
- Multi-file refactoring capabilities
- Integration with existing VS Code extensions
- Custom instruction support
- Advanced context management
- Team collaboration features

Analyze both platforms and provide:
1. A detailed comparison of how each platform handles these requirements
2. Specific scenarios where one platform significantly outperforms the other
3. How the choice of AI models available on each platform impacts the decision
4. Integration considerations with existing development workflows

---

## Question 6: Prompt Engineering for Complex Tasks

You need to implement a data migration script that:
- Reads from multiple database tables
- Transforms data according to business rules
- Handles error cases and rollback scenarios
- Generates migration reports
- Follows company security protocols

Design a prompt strategy that:
1. Maximizes the likelihood of generating secure, robust code
2. Ensures the assistant understands the critical nature of data integrity
3. Incorporates proper error handling and logging
4. Follows your organization's coding standards
5. Addresses the "hallucination" problem common in AI-generated code

---