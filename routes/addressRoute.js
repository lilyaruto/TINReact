const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController');

router.get('/', addressController.showAddress);

router.get('/add-address', addressController.showAddAddressForm);
router.get('/modify/:adrId', addressController.showModifyAddressForm);
router.get('/details/:adrId', addressController.showAddressDetails);

router.post('/add-address', addressController.addAddress);
router.post('/modify', addressController.modifyAddress);
router.get('/delete/:adrId', addressController.deleteAddress);

module.exports = router;