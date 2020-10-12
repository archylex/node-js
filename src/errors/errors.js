class UserNotFound extends Error {
  constructor(id) {
    super(`User not found. [ID: ${id}]`);
    this.statusCode = '404';
  }
}

class BoardNotFound extends Error {
  constructor(id) {
    super(`Board not found. [ID: ${id}]`);
    this.statusCode = '404';
  }
}

class TaskdNotFound extends Error {
  constructor(id) {
    super(`Task not found. [ID: ${id}]`);
    this.statusCode = '404';
  }
}

module.exports = { UserNotFound, BoardNotFound, TaskdNotFound };
