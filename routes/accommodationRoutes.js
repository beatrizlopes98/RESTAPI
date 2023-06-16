const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');
const userController = require('../controllers/userController');

router.get('/', accommodationController.getAccommodations);
router.get('/:id', accommodationController.getAccommodationById);
router.post('/', userController.verifyToken,accommodationController.createAccommodation);
router.patch('/:id', userController.verifyToken,accommodationController.updateAccommodation);
router.delete('/:id', userController.verifyToken,accommodationController.deleteAccommodation);

module.exports = router;
