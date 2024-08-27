# Code Diagnose

**Code Diagnose** is a powerful command-line tool designed for developers who work with TypeScript. It helps you keep your code clean and efficient by finding common issues that can make your code messy over time. With **Code Diagnose**, you can easily find and fix problems like repeated code, large classes, and unnecessary code, making your project easier to maintain and scale.

## Why Use Code Diagnose?

As your project grows, your code can become hard to manage. Repeated code blocks, large classes, and bad design choices can slow down development and make it harder to add new features. **Code Diagnose** helps you find these problems automatically so you can focus on writing new code instead of fixing old issues.

### Key Benefits:
- **Improves Code Quality**: Detects common issues to help you write cleaner, easier-to-maintain code.
- **Saves Time**: Finds problems quickly that would take a lot of time to find manually.
- **Easy to Use**: Works smoothly with your TypeScript projects.

## Installation

Installing **Code Diagnose** is simple. Use npm to install it globally on your system:

```bash
npm install -g code-diagnose
```

This makes **Code Diagnose** available for use in any of your projects.

## How to Use Code Diagnose

After installation, analyzing your project is easy. Go to your project’s directory and run:

```bash
analyze-project --directory /path/to/your/project
```

Replace `/path/to/your/project` with the actual path to your project. **Code Diagnose** will scan your files and create a report showing areas that need attention.

### Example Usage:

```bash
analyze-project --directory ./my-typescript-project
```

After running this command, you’ll get a detailed report of any detected issues, along with suggestions on how to fix them.

## Patterns Detected by Code Diagnose

**Code Diagnose** can detect a wide range of common issues in TypeScript projects. Here are the patterns it currently supports:

- **Code Duplication**: Finds repeated code blocks in different files or within the same file. Reducing duplication makes your code easier to maintain.
- **Code Smells**: Detects general bad practices that could lead to bugs or make your code harder to understand.
- **God Object (AST)**: Identifies classes or objects that try to do too much. These should be broken down into smaller, more focused pieces.
- **God Object (Non-AST)**: Similar to the AST version but focuses on non-abstract syntax tree contexts for broader coverage.
- **Magic Numbers**: Finds hardcoded numbers that should be replaced with named constants to improve readability.
- **Shotgun Surgery**: Detects when one change requires you to update many parts of your codebase, a sign that your code might need refactoring.
- **Large Class**: Finds classes that have become too large and should be split into smaller, more manageable pieces.
- **Lazy Class**: Flags classes that don’t do enough to justify their existence, suggesting they could be merged with others or removed.
- **Long Parameter List**: Detects functions or methods with too many parameters, making them hard to use and understand.
- **Middle Man**: Identifies classes that only pass requests to other classes without adding value. These can often be removed to simplify your codebase.
- **Primitive Obsession**: Finds overuse of primitive types (like strings and numbers) where more specific types or classes would make the code clearer.
- **Speculative Generality**: Flags code that’s been over-engineered to handle unlikely cases, adding unnecessary complexity.
- **Switch Statement Overuse**: Detects overuse of switch statements, which can often be replaced with polymorphism for cleaner code.
- **Dead Code**: Finds variables, functions, or entire blocks of code that are declared but never used, which can be safely removed.

By detecting these patterns, **Code Diagnose** helps you refactor and improve your code, making your project cleaner and more efficient.

## Configuration Options

You can customize **Code Diagnose** to meet your needs. Create a `.diagnoseignore` file in your project’s root directory to exclude specific files or directories from analysis.

### Example .diagnoseignore File:

```
# Ignore all files in the node_modules directory
node_modules/

# Ignore a specific file
src/legacy-code.ts
```

Ignoring files or directories that aren’t relevant lets you focus on the most important parts of your codebase.

## Beta Version Disclaimer

**Code Diagnose** is currently in beta, which means it’s still being improved. As a beta user, your feedback is very valuable. If you find any issues or have suggestions for new features, please share them on our GitHub page.

## Contributing to Code Diagnose

We welcome contributions! If you’d like to help improve **Code Diagnose** by reporting bugs, suggesting features, or submitting code, visit our [GitHub repository](https://github.com/surenpoghosian/code-diagnose).

Your input helps us make **Code Diagnose** better, and we appreciate any contributions you can make.

## License

**Code Diagnose** is open-source software, licensed under the MIT License. You’re free to use, modify, and distribute it as you see fit. For more details, check out the [LICENSE](https://github.com/surenpoghosian/code-diagnose/blob/main/LICENSE) file in the GitHub repository.

---

Whether you're an experienced developer or just starting out, **Code Diagnose** is a great tool for keeping your TypeScript code in top shape. Try it out today and see how it can help you write better, cleaner code.