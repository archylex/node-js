const userMemory = require('./user.memory.repository');

const getAll = () => userMemory.getAll();
const get = id => userMemory.get(id);
const save = user => userMemory.save(user);
const update = (id, user) => userMemory.update(id, user);
const remove = id => userMemory.remove(id);

module.exports = { getAll, get, remove, save, update };
