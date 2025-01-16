// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { existsSync, writeFileSync, readFileSync } from "fs";
import * as path from "path";

const Uri = vscode.Uri;
const vsfs = vscode.workspace.fs;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  updateJSConfig(context);
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "p5-starter" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "p5-starter.createStarterProject",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from p5.init!");

      console.log("my command");
      try {
        const filePath = await vscode.window.showOpenDialog({
          canSelectFiles: false,
          canSelectFolders: true,
          canSelectMany: false,
        });
        if (filePath) {
          const dest = filePath[0].path;
          await copyTemplate(dest);
          const destUri = Uri.file(dest);

          // open a workspace folder in a new window
          await vscode.commands.executeCommand("vscode.openFolder", destUri, true);

          // hacky way to actually open the sketch file...
          if (process.platform !== "win32") {
            const sketchFile = Uri.parse(
              `vscode://file${Uri.joinPath(destUri, "sketch.js").path}`
            );
            await vscode.env.openExternal(sketchFile);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  );

  context.subscriptions.push(disposable);
}

async function copyTemplate(dest: string) {
  const paths: string[] = [
    "index.html",
    "style.css",
    "sketch.js",
    "functions.js",
    "libraries/p5.min.js",
    "libraries/p5.sound.min.js",
    "libraries/p5.capture.umd.min.js",
    "assets/fonts/IBMPlexMono-Bold.ttf",
    "assets/fonts/IBMPlexMono-Bolditalic.ttf",
    "assets/fonts/IBMPlexMono-Italic.ttf",
    "assets/fonts/IBMPlexMono-Medium.ttf",
    "assets/fonts/IBMPlexMono-Regular.ttf",
    "assets/fonts/IBMPlexMono-Thin.ttf",
  ];

  const baseSrc = Uri.joinPath(Uri.file(__dirname), "../template");

  const baseDest = Uri.file(dest);
  vsfs.createDirectory(baseDest);

  // create the libraries directory
  const librariesPath = Uri.joinPath(baseDest, "libraries");
  vsfs.createDirectory(librariesPath);

  const assetsPath = Uri.joinPath(baseDest, "assets/fonts");
  vsfs.createDirectory(assetsPath);

  // copy over all the files
  for (const p of paths) {
    const src = Uri.joinPath(baseSrc, p);
    const dest = Uri.joinPath(baseDest, p);

    if (existsSync(dest.path)) {
      continue;
    }

    try {
      await vsfs.copy(src, dest, { overwrite: false });
    } catch (e) {
      console.error(e);
    }
  }

  // creates a jsonconfig that tells vscode where to find the types file
  const jsconfig = {
    compilerOptions: {
      target: "es6",
    },
    include: [
      "*.js",
      "**/*.js",
      Uri.joinPath(Uri.file(__dirname), "../p5types", "global.d.ts").fsPath,
    ],
  };
  const jsconfigPath = Uri.joinPath(baseDest, "jsconfig.json");
  writeFileSync(jsconfigPath.fsPath, JSON.stringify(jsconfig, null, 2));
}

async function updateJSConfig(context: vscode.ExtensionContext) {
  const workspacePath = vscode.workspace.rootPath;
  if (!workspacePath) {
    return false;
  }
  const jsconfigPath = path.join(workspacePath, "jsconfig.json");
  if (!existsSync(jsconfigPath)) {
    return false;
  }
  let jsconfigContents = readFileSync(jsconfigPath, "utf-8");
  const extensionName = context.extension.id;
  const currentName = extensionName + "-" + context.extension.packageJSON.version;
  const regex = new RegExp(extensionName + "-[0-9.]+", "m");
  if (regex.test(jsconfigContents)) {
    jsconfigContents = jsconfigContents.replace(regex, currentName);
    writeFileSync(jsconfigPath, jsconfigContents);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
