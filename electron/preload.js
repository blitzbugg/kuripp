/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveData: (filename, data) => ipcRenderer.invoke("save-data", { filename, data }),
  loadData: (filename) => ipcRenderer.invoke("load-data", filename),
});
