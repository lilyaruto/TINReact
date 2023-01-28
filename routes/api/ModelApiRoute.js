const express = require('express');
const router = express.Router();

const modApiController = require('../../api/ModelAPI');

router.get('/', modApiController.getModels);
router.get('/:modId', modApiController.getModelById);
router.post('/', modApiController.createModel);
router.put('/:modId', modApiController.updateModel);
router.delete('/:modId', modApiController.deleteModel);

module.exports = router;