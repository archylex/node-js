const DB = require('../../DB/DataBase');
const { BoardNotFound } = require('../../errors/errors');
const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAll(TABLE_NAME);

const get = async id => {
  const board = await DB.getData(TABLE_NAME, id);

  if (!board || Object.keys(board).length === 0) {
    throw new BoardNotFound(id);
  }

  return board;
};

const save = async board => DB.saveData(TABLE_NAME, board);

const update = async (id, board) => {
  const data = await DB.updateData(TABLE_NAME, id, board);

  if (!data || Object.keys(board).length === 0) {
    throw new BoardNotFound(id);
  }

  return data;
};

const remove = async id => {
  if (!(await DB.removeData(TABLE_NAME, id))) {
    throw new BoardNotFound(id);
  }
};

module.exports = { getAll, get, save, update, remove };
