# Antigravity Fix Webview Extension

<img src="./icon.png" style="width:128px; height:auto;" alt="Antigravity Fix Webview Extension">

This Antigravity IDE extension fixes an issue with webviews (like Markdown previews, and audio files) not rendering.

## Features

### Fix Webview Issues
If you encounter issues with webviews (such as Markdown preview, audio files, or other web-based views) failing to load or behaving incorrectly, this extension provides a utility to clear the underlying Service Worker cache.

**How to use:**
1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Type and select `Antigravity: Fix Webview Issues`.
3. Follow the prompt to reload the window.

This will delete the `.config/Antigravity/Service Worker/` directory, forcing a rebuild of the service worker cache on the next load.

Additionally, this extension will clear the service worker cache when on editor startup.
