import * as vscode from "vscode";
import { existsSync, createWriteStream, writeFileSync, readFileSync } from "fs";
import * as path from "path";
import got from "got";
import { Stream } from "stream";
import { promisify } from "util";

import p5Libraries from "./libraries.json";

const pipeline = promisify(Stream.pipeline);
const Uri = vscode.Uri;
const vsfs = vscode.workspace.fs;

export async function activate(context: vscode.ExtensionContext) {
  updateJSConfig(context);

  let createStarterProject = vscode.commands.registerCommand(
    "p5-starter.createStarterProject",
    async () => {
      try {
        let filePath = await vscode.window.showOpenDialog({
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

  let installStarterLibrary = vscode.commands.registerCommand(
    "p5-starter.installStarterLibrary",
    async () => {
      const libraries = p5Libraries
        .filter((l) => l.install)
        .map((l) => {
          return {
            label: l.name,
            description: l.authors ? l.authors.map((a) => a.name).join(", ") : "",
            detail: l.desc,
            install: l.install,
            url: l.url,
          };
        });
      const result = await vscode.window.showQuickPick(libraries, {
        placeHolder: "Library name",
      });
      if (result) {
        const action = await vscode.window.showQuickPick(
          [
            {
              label: "Install " + result.label,
              action: "install",
            },
            {
              label: "Visit home page",
              action: "visit",
            },
          ],
          {
            placeHolder: "Select action",
          }
        );
        if (action) {
          if (action.action === "install" && result.install) {
            installP5Library(result.install);
          } else {
            vscode.env.openExternal(vscode.Uri.parse(result.url));
          }
        }
      }
    }
  );

  context.subscriptions.push(createStarterProject);
  context.subscriptions.push(installStarterLibrary);
}

async function installP5Library(url: string | string[]) {
  const workspacePath = vscode.workspace.rootPath;

  if (
    !workspacePath ||
    !existsSync(path.join(workspacePath, "index.html")) ||
    !existsSync(path.join(workspacePath, "libraries"))
  ) {
    vscode.window.showErrorMessage(
      "Make sure your workspace includes an index.html and a libraries folder."
    );
    return false;
  }

  const urls = typeof url === "string" ? [url] : url;

  for (const u of urls) {
    const basename = path.basename(u);
    const dest = path.join(workspacePath, "libraries", basename);
    const indexPath = path.join(workspacePath, "index.html");
    if (!existsSync(dest)) {
      try {
        await pipeline(got.stream(u), createWriteStream(dest));
      } catch (e) {
        vscode.window.showErrorMessage("Could not download library.");
      }
    }
    let indexFileContents = readFileSync(indexPath, "utf-8");
    const scriptTag = `<script src="libraries/${basename}"></script>`;
    if (!indexFileContents.includes(scriptTag)) {
      indexFileContents = indexFileContents.replace(
        "</head>",
        `  ${scriptTag}\n  </head>`
      );
      writeFileSync(indexPath, indexFileContents);
    }
    vscode.window.showInformationMessage("Library installed");
  }
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
    "assets/fonts/IBMPlexMono-Thin.ttf"
  ];

  const baseSrc = Uri.joinPath(Uri.file(__dirname), "../template");

  const baseDest = Uri.file(dest);
  vsfs.createDirectory(baseDest);

  // create the libraries directory
  const librariesPath = Uri.joinPath(baseDest, "libraries");
  vsfs.createDirectory(librariesPath);

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
    "compilerOptions": {
      "target": "es6",
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

// this method is called when your extension is deactivated
export function deactivate() {}
