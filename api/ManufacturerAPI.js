const ManufacturerRepository = require('../repository/mysql2/ManufacturerRepository');

exports.getManufacturers = (req, res, next) => {
    ManufacturerRepository.getManufacturers()
        .then(mans => {
            res.status(200).json(mans);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getManufacturerById = (req, res, next) => {
    const manId = req.params.manId;
    ManufacturerRepository.getManufacturerById(manId)
        .then(man => {
            if (!man) {
                res.status(404).json({
                    message: 'Manufacturer with id: '+manId+' not found'
                })
            } else {
                res.status(200).json(man);
            }
        });
};

exports.createManufacturer = (req, res, next) => {
    ManufacturerRepository.createManufacturer(req.body)
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

exports.updateManufacturer = (req, res, next) => {
    const manId = req.params.manId;
    ManufacturerRepository.updateManufacturer(manId, req.body)
        .then(results => {
            res.status(200).json({
                message: 'Manufacturer updated!',
                man: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteManufacturer = (req, res, next) => {
    const manId = req.params.manId;
    ManufacturerRepository.deleteManufacturer(manId)
        .then(results => {
            res.status(200).json({
                message: 'Removed manufacturer',
                man: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};