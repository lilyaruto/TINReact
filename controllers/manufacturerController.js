const { array } = require('joi');
const ManufacturerRepository = require('../repository/mysql2/ManufacturerRepository');

exports.showManufacturer = (req, res, next) => {
    ManufacturerRepository.getManufacturers()
        .then(mans => {
            res.render('pages/manufacturer/manufacturer', {
                mans: mans,
                navLocation: 'man'
            });
        });
}

exports.showAddManufacturerForm = (req, res, next) => {
    const manId = req.params.manId;
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ManufacturerRepository.getManufacturers(manId);
    }).then(() => {
        res.render('pages/manufacturer/add-manufacturer', {
            mainMan: {},
            allMans: allManufacturers,
            pageTitle: 'New manufacturer',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/manufacturer/add-manufacturer',
            navLocation: 'man',
            validationErrors: []
        });
    });
}

exports.showModifyManufacturerForm = (req, res, next) => {
    let allManufacturers;
    const manId = req.params.manId;
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ManufacturerRepository.getManufacturerById(manId);
    })
    .then(man => {
        res.render('pages/manufacturer/modify', {
            mainMan: man,
            allMans: allManufacturers,
            formMode: 'modify',
            pageTitle: 'Modify manufacturer',
            btnLabel: 'Modify',
            formAction: '/manufacturer/modify',
            navLocation: 'man',
            validationErrors: []
        });
    });
}

exports.showManufacturerDetails = (req, res, next) => {
    const manId = req.params.manId;
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ManufacturerRepository.getManufacturerById(manId);
    })
    .then(man => {
        res.render('pages/manufacturer/details', {
            mainMan: man,
            allMans: allManufacturers,
            formMode: 'details',
            pageTitle: 'Manufacturer details',
            formAction: '',
            navLocation: 'man'
        });
    });
}

exports.addManufacturer = (req, res, next) => {
    const manData = { ...req.body};
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ManufacturerRepository.createManufacturer(manData);
    })
    .then(result => {
        res.redirect('/manufacturer');
    })
    .catch(err => {
        res.render('pages/manufacturer/add-manufacturer', {
            mainMan: manData,
            allMans: allManufacturers,
            pageTitle: "New manufacturer",
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/manufacturer/add-manufacturer',
            navLocation: 'man',
            validationErrors: err.details
        });
    });
};

exports.modifyManufacturer = (req, res, next) => {
    const manId = req.body._id;
    const manData = { ...req.body};
    ManufacturerRepository.getManufacturers()
    .then(mans => {
        allManufacturers = mans;
        return ManufacturerRepository.updateManufacturer(manId, manData);
    })
    .then(result => {
        res.redirect('/manufacturer');
    })
    .catch(err => {
        res.render('pages/manufacturer/modify', {
            mainMan: manData,
            allMans: allManufacturers,
            formMode: 'modify',
            pageTitle: 'Modify manufacturer',
            btnLabel: 'Modify',
            formAction: '/manufacturer/modify',
            navLocation: 'man',
            validationErrors: err.details
        });
    });
};

exports.deleteManufacturer = (req, res, next) => {
    const manId = req.params.manId;
    ManufacturerRepository.deleteManufacturer(manId)
    .then(() => {
        res.redirect('/manufacturer');
    });
};