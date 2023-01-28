const express = require('express');
const router = express.Router();

const adrsApiController = require('../../api/AddressAPI');

router.get('/', adrsApiController.getAddresses);
router.get('/:adrsId', adrsApiController.getAddressById);
router.post('/', adrsApiController.createAddress);
router.put('/:adrsId', adrsApiController.updateAddress);
router.delete('/:adrsId', adrsApiController.deleteAddress);

module.exports = router;