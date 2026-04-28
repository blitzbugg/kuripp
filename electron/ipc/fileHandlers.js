import { app, ipcMain } from "electron";
import path from "path";
import fs from "fs/promises";

const DATA_PATH = path.join(app.getPath("userData"), "kuripp-data");

export const setupFileHandlers = () => {
  ipcMain.handle("save-data", async (event, { filename, data }) => {
    const filePath = path.join(DATA_PATH, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  });

  ipcMain.handle("load-data", async (event, filename) => {
    const filePath = path.join(DATA_PATH, filename);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  });
};

export const ensureDataDir = async () => {
  try {
    await fs.mkdir(DATA_PATH, { recursive: true });
  } catch {
    // Already exists or permission error
  }
};
