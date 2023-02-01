const DepartmentRepository = require('../repository/mysql2/DepartmentRepository');

exports.getDepartments = (req, res, next) => {
    DepartmentRepository.getDepartments()
        .then(deps => {
            res.status(200).json(deps);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDepartmentById = (req, res, next) => {
    const depId = req.params.depId;
    DepartmentRepository.getDepartmentById(depId)
        .then(dep => {
            if (!dep) {
                res.status(404).json({
                    message: 'Department with id: '+depId+' not found'
                })
            } else {
                res.status(200).json(dep);
            }
        });
};

exports.createDepartment = (req, res, next) => {
    DepartmentRepository.createDepartment(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateDepartment = (req, res, next) => {
    const depId = req.params.depId;
    DepartmentRepository.updateDepartment(depId, req.body)
        .then(results => {
            res.status(200).json({
                message: 'Department updated!',
                dep: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteDepartment = (req, res, next) => {
    const depId = req.params.depId;
    DepartmentRepository.deleteDepartment(depId)
        .then(results => {
            res.status(200).json({
                message: 'Removed department',
                dep: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};