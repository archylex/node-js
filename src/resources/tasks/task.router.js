const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await taskService.getAll(req.params.boardId);
    await res.json(boards);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await taskService.get(req.params.boardId, req.params.id);
    res.status(200).send(board);
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await taskService.save(
      new Task({
        ...req.body,
        boardId: req.params.boardId
      })
    );
    res.status(200).send(board);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await taskService.update(
      new Task({
        ...req.body,
        id: req.params.id,
        boardId: req.params.boardId
      })
    );
    res.status(200).send(board);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await taskService.remove(req.params.boardId, req.params.id);
    res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
