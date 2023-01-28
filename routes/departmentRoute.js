const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.showDepartment);

router.get('/add-department', departmentController.showAddDepartmentForm);
router.get('/modify/:depId', departmentController.showModifyDepartmentForm);
router.get('/details/:depId', departmentController.showDepartmentDetails);

router.post('/add-department', departmentController.addDepartment);
router.post('/modify', departmentController.modifyDepartment);
router.get('/delete/:depId', departmentController.deleteDepartment);

module.exports = router;