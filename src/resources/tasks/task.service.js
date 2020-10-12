const taskMemory = require('./task.memory.repository');

const getAll = boardId => taskMemory.getAll(boardId);
const get = (boardId, id) => taskMemory.get(boardId, id);
const save = task => taskMemory.save(task);
const update = task => taskMemory.update(task);
const remove = (boardId, id) => taskMemory.remove(boardId, id);

module.exports = { getAll, get, save, update, remove };
