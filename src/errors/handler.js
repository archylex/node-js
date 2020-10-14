const { UserNotFound, BoardNotFound, TaskdNotFound } = require('./errors');

const handle = (err, req, res, next) => {
  if (
    err instanceof UserNotFound ||
    err instanceof BoardNotFound ||
    err instanceof TaskdNotFound
  ) {
    res.status(err.statusCode).send(err.message);
  } else if (err) {
    res.status(404).send('Not found');
  }
  next();
};

module.exports = handle;
