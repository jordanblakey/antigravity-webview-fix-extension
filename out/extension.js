"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const os = require("os");
async function activate(context) {
    console.log('Congratulations, your extension "antigravity-extension" is now active!');
    // Clean up Service Worker cache on startup
    await cleanServiceWorkerCache();
    let disposable = vscode.commands.registerCommand('antigravity-extension.helloWorld', () => {
        console.log('hello extension world ');
        vscode.window.showInformationMessage('Hello World from Antigravity Extension!!!');
    });
    context.subscriptions.push(disposable);
    let fixWebviewDisposable = vscode.commands.registerCommand('antigravity-extension.fixWebview', async () => {
        await cleanServiceWorkerCache();
        vscode.window.showInformationMessage('Webview cache cleared successfully. Please reload the window.');
    });
    context.subscriptions.push(fixWebviewDisposable);
}
async function cleanServiceWorkerCache() {
    const serviceWorkerPath = path.join(os.homedir(), '.config', 'Antigravity', 'Service Worker');
    try {
        // Check if directory exists first to avoid unnecessary errors or messages if handled differently
        // fs.promises.rm with { recursive: true, force: true } handles non-existence gracefully essentially,
        // but explicit check can be nice for logging. However, 'rm -rf' equivalent is robust.
        await fs.promises.rm(serviceWorkerPath, { recursive: true, force: true });
        console.log(`Cleaned up Service Worker cache at: ${serviceWorkerPath}`);
    }
    catch (error) {
        console.error(`Failed to clear webview cache: ${error.message}`);
        vscode.window.showErrorMessage(`Failed to clear webview cache: ${error.message}`);
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map