const express = require('express');
const router = express.Router();

const manufacturerController = require('../controllers/manufacturerController');

router.get('/', manufacturerController.showManufacturer);

router.get('/add-manufacturer', manufacturerController.showAddManufacturerForm);
router.get('/modify/:manId', manufacturerController.showModifyManufacturerForm);
router.get('/details/:manId', manufacturerController.showManufacturerDetails);

router.post('/add-manufacturer', manufacturerController.addManufacturer);
router.post('/modify', manufacturerController.modifyManufacturer);
router.get('/delete/:manId', manufacturerController.deleteManufacturer);

module.exports = router;