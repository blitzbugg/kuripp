export const saveData = async (filename, data) => {
  return await window.api.saveData(filename, data);
};

export const loadData = async (filename) => {
  return await window.api.loadData(filename);
};
