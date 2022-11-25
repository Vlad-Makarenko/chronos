const { Router } = require('express');
const { body } = require('express-validator');
const calendarController = require('../controllers/calendar.controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

// router.post(
//   '/',
//   authMiddleware,
//   body('name').trim().isLength({ min: 3, max: 30 }),
//   calendarController.createCalendar
// );
// router.patch('/:id', authMiddleware, calendarController.updateCalendar);
// router.get('/', authMiddleware, calendarController.getAllCalendars);
// router.get('/:id', authMiddleware, calendarController.getCalendar);
// router.delete('/:id', authMiddleware, calendarController.deleteCalendar);

module.exports = router;
