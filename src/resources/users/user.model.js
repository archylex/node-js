const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'Noname',
    login = 'user',
    password = 'myP4ssw0rd!'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

module.exports = User;
