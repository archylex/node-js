const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await userService.getAll();
    Object.keys(users).forEach(key => delete users[key].password);
    await res.json(Object.keys(users).map(key => users[key]));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await userService.get(req.params.id);
    delete user.password;
    res.status(200).send(user);
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await userService.save(new User(req.body));
    delete user.password;
    res.status(200).send(user);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, new User(req.body));
    delete user.password;
    res.status(200).send(user);
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await userService.remove(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
