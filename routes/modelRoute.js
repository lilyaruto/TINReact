const express = require('express');
const router = express.Router();

const modelController = require('../controllers/modelController');

router.get('/', modelController.showModel);

router.get('/add-model', modelController.showAddModelForm);
router.get('/modify/:modId', modelController.showModifyModelForm);
router.get('/details/:modId', modelController.showModelDetails);

router.post('/add-model', modelController.addModel);
router.post('/modify', modelController.modifyModel);
router.get('/delete/:modId', modelController.deleteModel);

module.exports = router;