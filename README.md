# Code Diagnose

**Code Diagnose** is a CLI tool for detecting software antipatterns in your TypeScript projects. It helps identify code smells and improve code quality by analyzing your codebase for common design issues.

### Installation
To install Code Diagnose, run:

`npm install -g code-diagnose`

### Usage
To analyze your TypeScript project, use the following command:

`analyze-project --directory /path/to/your/project`

Replace /path/to/your/project with the path to the directory of your TypeScript project.

### Configuration

**.diagnoseignore**

You can exclude specific files or directories from being analyzed by creating a .diagnoseignore file in the root of your project. This file should list the files and directories to ignore, one per line. For example:

```
# Ignore all files in the node_modules directory
node_modules/

# Ignore specific files
src/ignore-this-file.ts
```

### Beta Version

Please note that Code Diagnose is currently in beta and still under development. Features and functionality may change as development progresses. Feedback and contributions are welcome!

### Contributing

If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on [GitHub](https://github.com/surenpoghosian/code-diagnose)

### License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/surenpoghosian/code-diagnose/blob/main/LICENSE) file for details.

Feel free to adjust any sections to better fit your project’s specifics or any additional details you’d like to include!