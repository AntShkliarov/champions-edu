## Module 1: Introduction to Coding Assistants

### What are Coding Assistants?

**Topics in Curriculum:**

**Article 1:** [Introduction to Code Assistants and Code Agents](https://medium.com/@anuragkedia19/an-introduction-to-code-assistants-and-code-agents-1e8bd8d1dc37)  
**Article 2:** [Comparing Modern AI Coding Assistants](https://medium.com/@roberto.g.infante/comparing-modern-ai-coding-assistants-github-copilot-cursor-windsurf-google-ai-studio-c9a888551ff2)  

Take a quick look at some of the most notable tools in the market.

### Quick Look at Noteworthy Tools

- [GitHub Copilot](https://github.com/features/copilot) - Industry-leading AI pair programmer
- [Cursor](https://www.cursor.com/features) - AI-first code editor
- [RooCode](https://github.com/RooCodeInc/Roo-Code) - Agent-based coding assistant
- [Cline](https://cline.bot/) - Autonomous coding agent
- [Windsurf Cascade](https://windsurf.com/cascade) - Multi-file editing capabilities

### 🤖 Models

1. **Understanding Model Options**

Coding Assistant provides flexibility in AI model selection, allowing you to match the complexity of your chosen model with the requirements of your specific development tasks. This strategic approach to model selection can significantly impact both the quality and efficiency of your coding assistance.

While there's space for usage of the models straight out of the box, it's recommended to use the models in a strategic way, based on the task complexity and the requirements.

**GPT-4o and GPT-4.1**
GPT-4o and GPT-4.1 are excellent for straightforward implementations

**⚠️ What to watch out for:**
* GPT-4o and GPT-4.1 are prone to oversimplifying the implementation.
    * ✅ For more complex tasks, consider using Claude 3.7 or Claude 4
    * ✅ Context Window tends to fill up quickly, so for the long chats consider summarizing the intermid results into some kind of a file and start a new chat with it.


**Claude 3.7 and Claude 4**

These models excel in understanding complex requirements and generating comprehensive solutions.

**⚠️ What to watch out for:**

**The Over-Engineering Challenge**
* Claude models are prone to over-complication.
    * ✅ For simple tasks, that are straightforward to implement, consider using GPT-4o GPT-4.1, Gemini 2.5 Pro, or Claude 3.5 models
    * ✅ Context Window tends to fill up quickly, so for the long chats consider summarizing the intermid results into some kind of a file and start a new chat with it.

2. **Thinking vs. Non-Thinking Models**

**What Are "Thinking" Models?**

Thinking models incorporate an additional reasoning layer that processes your request through structured, step-by-step analysis before generating code. This internal reasoning process:

Breaks down complex problems into manageable components
Considers multiple approaches before settling on a solution
Results in more thoughtful, well-reasoned implementations

The Benefit of Reasoning
By taking time to "think through" problems systematically, these models typically deliver more robust solutions that account for edge cases and long-term maintainability.

**Strategic Model Selection**

Choose your model based on task complexity: use thinking models with cursor for complex features, and simpler models for straightforward implementations.


### 🤖 Agent Mode

**❓ What is Agent Mode?**

```markdown
TL;DR: Agent mode is a powerful feature that allows Coding Assistant to execute complex, multi-step workflows autonomously while keeping you informed and in control of critical decisions. Helps with hallucinations reduction and codebase consistency.
```

Agent mode represents one of Coding Assistant's most powerful features for daily development work. Unlike traditional code assistance that responds to single requests, agent mode enables Coding Assistant to execute complex, multi-step workflows autonomously while keeping you informed and in control of critical decisions.

**⚙️ How Agent Mode Works**

When you activate agent mode, Coding Assistant operates as an intelligent assistant that can:

_Execute Sequential Actions:_ Perform multiple related tasks in a logical sequence without requiring constant user input
_Make Informed Decisions:_ Analyze your codebase and determine the best approach for implementing changes across multiple files
_Seek Authorization:_ Pause for your approval before applying significant edits, using MCP tools, or performing searches that could impact your project

**🎯 Ideal Use Cases for Agent Mode**

Agent mode excels in scenarios that involve systematic, repetitive work across multiple files, such as:

* _Test Creation:_ Generating comprehensive test suites that follow your project's testing patterns and conventions
* _Test Data Generation:_ Creating mock data or fixtures that conform to predefined formats and type definitions
* _Multi-File Refactoring:_ Implementing changes that need to be applied consistently across several related files
* _Format Standardization:_ Applying predefined formats or coding standards throughout your codebase
* _Creating Templates:_ Creating templates for common tasks and patterns
* _Creating Documentation:_ Creating documentation for your project

**The Power of Combined Operations**

The key advantage of agent mode lies in its ability to consolidate what would normally require multiple separate prompts into a single, comprehensive request. This approach ensures consistency across all changes and maintains the logical flow of your development workflow.

**⚠️ What to watch out for:**
* Zero-Shot prompting in Coding Assistant Agent Mode can generate code that is not aligned with your project's coding standards. Models are prone to hallucinate creating duplicates in the codebase. 
    * ✅ Leverage One-Shot or Few-Shot Prompts to guide the Agent Mode 
    * ✅ Use Coding Assistant Context Enhancement features - Rules in Cursor, Instructions in Github Copilot

**🔗 Further Reading:**

* [Cursor Agent Mode](https://www.cursor.com/docs/agent)


**How Coding Assistant Indexes Your Project**

When you initialize a project with Coding Assistant, it automatically performs a comprehensive indexing process across your entire codebase. This creates a foundational awareness of your project's structure, allowing Coding Assistant's AI models to understand which files exist and how they relate to each other within your project hierarchy.

**Understanding the Limitations of Indexing**

It's important to have realistic expectations about this indexing process. Coding Assistant's initial analysis focuses primarily on:

* _File Discovery:_ Cataloging all files and their locations within your project
* _Basic Structure Recognition:_ Understanding folder organization and file relationships
* _Surface-Level Awareness:_ Recognizing file types and general content patterns

However, this process doesn't constitute deep semantic analysis of your code's logic or complex architectural relationships.


**Leveraging Context Through `@` Tagging in the Chat**

```markdown
-- Prompt Example 1: --

"@test/test_utils.ts" is being used everywhere in the "@src/pom" files.
Apply DRY principle to the "@src/pom" files to reduce code duplication.

-- Prompt Example 2: --

@test/Login.spec.ts leverages @src/pom/Login.fixture.ts and @src/pom/Login.page.ts to perform the login.

Analyse the code and apply the same logic to implement the same pattern in the "@test/Logout.spec.ts" file. Don't forget to use the fixture docs @https://playwright.dev/docs/test-fixtures#creating-a-fixture to replicate the fixture.

-- Prompt Example 3: --

Reference the @Playwright Best-Practices documentation to refactor the @test/LoginAsAdminAndLogout.spec.ts and reduce the code duplication and complexity.

```

**Design Pattern Implementation**

When implementing or extending established design patterns (GoF), explicitly reference:

* Interface definitions that establish the pattern's contract
* Abstract classes that provide base functionality
* Concrete implementations that demonstrate the pattern in action
* Related utility classes that support the pattern


### 📋 Coding Assistant Rules

```bash
TL;DR: Coding Assistant rules serve as a guide that teaches Coding Assistant how to work within your specific project environment / codebase.

By implementing Coding Assistant Rules, you transform Coding Assistant from a general-purpose coding assistant into a project-specific expert that understands your unique requirements and can maintain consistency across all its contributions to your codebase.
```

**🧠 Understanding Coding Assistant Rules**
Think of Coding Assistant Rules as a detailed instruction manual that outlines your coding practices, architectural principles, and project-specific conventions. These rules ensure that Coding Assistant's suggestions and modifications align perfectly with your established development standards.

**⚙️ Core Functions of Coding Assistant Rules**

* _Defining Project-Specific Conventions:_ Coding Assistant rules allow you to define the fundamental principles that govern your codebase. This includes formatting preferences, naming conventions, architectural patterns, and code organization strategies that keep your project maintainable and consistent.

* _Establishing Coding Standards:_ Coding Assistant rules allow you to define the fundamental principles that govern your codebase. This includes formatting preferences, naming conventions, architectural patterns, and code organization strategies that keep your project maintainable and consistent.

* _Documenting Complex Areas:_ Every codebase has its challenging or unique sections. Coding Assistant rules provide a space to document these complexities, explaining the reasoning behind unconventional approaches or highlighting areas that require special handling during modifications or migrations.

* _Framework and Tool Integration:_ Different projects rely on various testing frameworks and development tools. Through Coding Assistant Rules, you can specify how Coding Assistant should interact with your chosen technologies and adopting the best practices for your project.

* _Workflow Documentation:_ Coding Assistant rules excel at describing standardized processes within your project. You can outline step-by-step procedures for common tasks such as:

    * _Creating new test files with proper structure and imports_
    * _Generating data entities that follow your project's patterns_
    * _Setting up new features according to your architectural guidelines_

**⚠️ What to watch out for:**
* Coding Assistant Rules are not a replacement for your own knowledge and understanding of the project.
    * ✅ As much as possible, try to use Coding Assistant Rules to automate the repetitive tasks, and use your own knowledge to handle review and decision-making on the more complex tasks.



### 🔌 MCP Support

**What is MCP?**

[Model Context Protocol (MCP)](https://docs.cursor.com/context/model-context-protocol#what-is-mcp) enables Coding Assistant to interact directly with your development environment and external tools. Rather than being limited to code generation and analysis, MCP transforms Coding Assistant into a comprehensive development partner that can actively engage with the systems and tools you use daily.

```markdown
TL;DR: MCP is a protocol that allows Coding Assistant to interact directly with your development environment and external tools.
```

**MCP for Testing and Validation**

***Browser Automation and Testing***

MCP's integration with testing frameworks like Playwright opens powerful possibilities for test development and validation:
* _Live Locator Verification:_ Instead of writing tests blindly, you can prompt Coding Assistant to open a browser session and verify that your element locators correctly target the intended page elements
* _Interactive Test Development:_ Create prompts that instruct Coding Assistant to navigate through your application, test user flows, and confirm that all referenced elements are accessible and functional
* _Real-Time Debugging:_ When tests fail, use MCP to have Coding Assistant investigate the actual page state and identify why locators or interactions aren't working as expected

***Auxiliary Tool Integration***  

MCP serves as a bridge between Coding Assistant and your broader development ecosystem:

_Documentation Access_

* Enable Coding Assistant to directly query and reference project-specific documentation
* Allow real-time lookup of API specifications, coding standards, or architectural guidelines
* Integrate with knowledge bases and wiki systems used by your team

_Database Interaction_

Connect Coding Assistant to your development databases for schema verification
Enable direct data queries to understand existing data structures
Allow Coding Assistant to validate data migration scripts or database changes

_Development Tool Integration_

Connect with project management tools, CI/CD systems, and monitoring platforms
Enable Coding Assistant to check build statuses, deployment logs, or performance metrics
Integrate with version control systems for advanced code analysis

**Further Exploration**
* [Playwright MCP Server - Demo](https://www.youtube.com/live/CNzg1aPwrKI)
* [Cursor MCP Documentation](https://docs.cursor.com/context/model-context-protocol)
* [Curated MCP Servers List](https://github.com/punkpeye/awesome-mcp-servers?tab=readme-ov-file)


### Next Lesson

[Module 2: GitHub Copilot](02_Github_Copilot_Intro.md)

---