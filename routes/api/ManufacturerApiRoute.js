const express = require('express');
const router = express.Router();

const manApiController = require('../../api/ManufacturerAPI');

router.get('/', manApiController.getManufacturers);
router.get('/:manId', manApiController.getManufacturerById);
router.post('/', manApiController.createManufacturer);
router.put('/:manId', manApiController.updateManufacturer);
router.delete('/:manId', manApiController.deleteManufacturer);

module.exports = router;