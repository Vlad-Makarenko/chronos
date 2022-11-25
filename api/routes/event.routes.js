const { Router } = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.post(
  '/',
  authMiddleware,
  body('name').trim().isLength({ min: 3, max: 30 }),
  eventController.createEvent
);
router.patch('/:id', authMiddleware, eventController.updateEvent);
router.get('/', authMiddleware, eventController.getAllEvents);
router.get('/:id', authMiddleware, eventController.getEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

module.exports = router;
