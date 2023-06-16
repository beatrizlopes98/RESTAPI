const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const userController = require('../controllers/userController');

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.post('/', userController.verifyToken,eventController.createEvent);
router.patch('/:id', userController.verifyToken,eventController.updateEvent);
router.delete('/:id', userController.verifyToken,eventController.deleteEvent);

module.exports = router;
