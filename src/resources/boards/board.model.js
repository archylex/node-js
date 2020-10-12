const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = '',
    columns = [
      {
        id: '',
        title: '',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
