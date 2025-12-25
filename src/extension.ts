import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export async function activate(context: vscode.ExtensionContext) {
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
	} catch (error: any) {
		console.error(`Failed to clear webview cache: ${error.message}`);
		vscode.window.showErrorMessage(`Failed to clear webview cache: ${error.message}`);
	}
}

export function deactivate() {}
