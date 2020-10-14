const DB = require('../../DB/DataBase');
const { BoardNotFound, TaskNotFound } = require('../../errors/errors');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  const allTasks = DB.getAll(TABLE_NAME);
  const result = [];

  if (Object.keys(allTasks).length === 0) {
    throw new BoardNotFound(boardId);
  }

  for (const key of Object.keys(allTasks)) {
    if (allTasks[key].boardId === boardId) result.push(allTasks[key]);
  }

  return result;
};

const get = async (boardId, id) => {
  const task = await DB.getData(TABLE_NAME, id);

  if (!task || task.boardId !== boardId) {
    throw new TaskNotFound(task.id);
  }

  return task;
};

const save = async task => DB.saveData(TABLE_NAME, task);

const update = async task => {
  const data = await get(task.boardId, task.id);

  if (!data || Object.keys(task).length === 0) {
    throw new TaskNotFound(task.id);
  }

  return DB.updateData(TABLE_NAME, task.id, task);
};

const remove = async (boardId, id) => {
  /* if (!(await DB.removeData(TABLE_NAME, id))) {
    throw new TaskNotFound(id);
  }*/
  return await DB.removeData(TABLE_NAME, id);
};

module.exports = { getAll, get, save, update, remove };
