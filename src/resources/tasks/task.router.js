const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    await res.json(tasks);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await taskService.get(req.params.boardId, req.params.id);
    res.status(200).send(task);
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const task = new Task(req.body);
    task.boardId = req.params.boardId;
    const newTask = await taskService.save(task);
    res.status(200).send(newTask);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const task = new Task(req.body);
    task.id = req.params.id;
    task.boardId = req.params.boardId;
    const newTask = await taskService.update(task);
    res.status(200).send(newTask);
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
