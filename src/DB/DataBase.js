const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: {},
  Boards: {},
  Tasks: {},
  clearAfterUsers: user => {
    if (user) {
      for (const key of Object.keys(db.Tasks)) {
        if (db.Tasks[key].userId === user.id) {
          db.Tasks[key].userId = null;
        }
      }
    }
  },
  clearAfterBoards: board => {
    if (board) {
      for (const key of Object.keys(db.Tasks)) {
        if (db.Tasks[key].boardId === board.id) {
          delete db.Tasks[key];
        }
      }
    }
  }
};

(() => {
  const user = new User();
  user.name = 'admin';
  user.login = 'admin';
  user.password = 'admin';
  db.Users[user.id] = user;

  const board = new Board();
  db.Boards[board.id] = board;

  const task = new Task({ boardId: board.id });
  db.Tasks[task.id] = task;
})();

const getAll = tableName => Object.assign({}, db[tableName]);

const getData = (tableName, id) => Object.assign({}, db[tableName][id]);

const saveData = (tableName, data) => {
  db[tableName][data.id] = data;
  return getData(tableName, data.id);
};

const updateData = async (tableName, id, data) => {
  if (getData(tableName, id)) {
    db[tableName][id] = { ...data };
  }

  return getData(tableName, id);
};

const removeData = (tableName, id) => {
  const data = getData(tableName, id);
  if (data) {
    if (db[`clearAfter${tableName}`] !== undefined) {
      db[`clearAfter${tableName}`](data);
    }
    delete db[tableName][id];
  }

  return data;
};

module.exports = {
  getAll,
  getData,
  saveData,
  updateData,
  removeData
};
