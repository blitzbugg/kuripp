import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { setupFileHandlers, ensureDataDir } from "./ipc/fileHandlers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 850,
    minWidth: 900,
    minHeight: 700,
    titleBarStyle: "hiddenInset",
    backgroundColor: "#0f172a",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL("http://localhost:5173");
    // win.webContents.openDevTools(); // Optional: remove for production
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(async () => {
  await ensureDataDir();
  setupFileHandlers();
  createWindow();
});

app.on("window-all-closed", () => {
  if (globalThis.process?.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});