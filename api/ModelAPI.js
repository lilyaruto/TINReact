const ModelRepository = require('../repository/mysql2/ModelRepository');

exports.getModels = (req, res, next) => {
    ModelRepository.getModels()
        .then(mods => {
            res.status(200).json(mods);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getModelById = (req, res, next) => {
    const modId = req.params.modId;
    ModelRepository.getModelById(modId)
        .then(mod => {
            if (!mod) {
                res.status(404).json({
                    message: 'Model with id: '+modId+' not found'
                })
            } else {
                res.status(200).json(mod);
            }
        });
};

exports.createModel = (req, res, next) => {
    ModelRepository.createModel(req.body)
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

exports.updateModel = (req, res, next) => {
    const modId = req.params.modId;
    ModelRepository.updateModel(modId, req.body)
        .then(results => {
            res.status(200).json({
                message: 'Model updated!',
                mod: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteModel = (req, res, next) => {
    const modId = req.params.modId;
    ModelRepository.deleteModel(modId)
        .then(results => {
            res.status(200).json({
                message: 'Removed model',
                mod: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};