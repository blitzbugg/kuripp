export const storageService = {
  async saveTodos(todos) {
    return await window.api.saveData("todos.json", todos);
  },

  async loadTodos() {
    return await window.api.loadData("todos.json");
  },

  async saveNotes(notes) {
    return await window.api.saveData("notes.json", notes);
  },

  async loadNotes() {
    return await window.api.loadData("notes.json");
  },

  async saveSettings(settings) {
    return await window.api.saveData("settings.json", settings);
  },

  async loadSettings() {
    return await window.api.loadData("settings.json");
  },
};
