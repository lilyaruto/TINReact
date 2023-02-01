const { array } = require('joi');
const ModelRepository = require('../repository/mysql2/ModelRepository');
const ManufacturerRepository = require('../repository/mysql2/ManufacturerRepository');

exports.showModel = (req, res, next) => {
    ModelRepository.getModels()
        .then(mods => {
            res.render('pages/model/model', {
                mods: mods,
                navLocation: 'mod'
            });
        });
}

exports.showAddModelForm = (req, res, next) => {
    const modId = req.params.modId;
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ManufacturerRepository.getManufacturers(modId);
    }).then(() => {
        res.render('pages/model/add-model', {
            mainMod: {},
            allMans: allManufacturers,
            pageTitle: 'New model',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/model/add-model',
            navLocation: 'mod',
            validationErrors: []
        });
    });
}

exports.showModifyModelForm = (req, res, next) => {
    const modId = req.params.modId;
    let allManufacturers;
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ModelRepository.getModelById(modId);
    })
    .then(mod => {
        res.render('pages/model/modify', {
            mainMod: mod,
            allMans: allManufacturers,
            formMode: 'modify',
            pageTitle: 'Modify model',
            btnLabel: 'Modify',
            formAction: '/model/modify',
            navLocation: 'mod',
            validationErrors: []
        });
    });
}

exports.showModelDetails = (req, res, next) => {
    const modId = req.params.modId;
    let allManufacturers;
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ModelRepository.getModelById(modId);
    })
    .then(mod => {
        res.render('pages/model/details', {
            mainMod: mod,
            allMans: allManufacturers,
            formMode: 'details',
            pageTitle: 'Model details',
            formAction: '',
            navLocation: 'mod'
        });
    });
}

exports.addModel = (req, res, next) => {
    const modData = { ...req.body};
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ModelRepository.createModel(modData);
    })
    .then(result => {
        res.redirect('/model');
    })
    .catch(err => {
        console.log(err.details);
        res.render('pages/model/add-model', {
            mainMod: modData,
            allMans: allManufacturers,
            pageTitle: 'New model',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/model/add-model',
            navLocation: 'mod',
            validationErrors: err.details
        });
    });
};

exports.modifyModel = (req, res, next) => {
    const modId = req.body._id;
    const modData = { ...req.body};
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ModelRepository.updateModel(modId, modData);
    })
    .then(result => {
        res.redirect('/model');
    })
    .catch(err => {
        res.render('pages/model/modify', {
            mainMod: modData,
            allMans: allManufacturers,
            formMode: 'modify',
            pageTitle: 'Modify model',
            btnLabel: 'Modify',
            formAction: '/model/modify',
            navLocation: 'mod',
            validationErrors: err.details
        });
    });
};

exports.deleteModel = (req, res, next) => {
    const modId = req.params.modId;
    ModelRepository.deleteModel(modId)
    .then(() => {
        res.redirect('/model');
    });
};