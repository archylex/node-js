const DB = require('../../DB/DataBase');
const { UserNotFound } = require('../../errors/errors');
const TABLE_NAME = 'Users';

const getAll = async () => {
  const users = await DB.getAll(TABLE_NAME);
  return Object.values(users);
};

const get = async id => {
  const user = await DB.getData(TABLE_NAME, id);

  if (!user || Object.keys(user).length === 0) throw new UserNotFound(id);

  return user;
};

const save = async user => DB.saveData(TABLE_NAME, user);

const update = async (id, user) => {
  const data = await DB.updateData(TABLE_NAME, id, user);

  if (!data || Object.keys(user).length === 0) {
    throw new UserNotFound(id);
  }

  return data;
};

const remove = async id => {
  /* if (!(await DB.removeData(TABLE_NAME, id))) {
    throw new UserNotFound(id);
  }*/
  return await DB.removeData(TABLE_NAME, id);
};

module.exports = { getAll, get, save, update, remove };
