const { array } = require('joi');
const DepartmentRepository = require('../repository/mysql2/DepartmentRepository'); 
const AddressRepository = require('../repository/mysql2/AddressRepository');
const ManufacturerRepository = require('../repository/mysql2/ManufacturerRepository');

exports.showDepartment = (req, res, next) => {
    DepartmentRepository.getDepartments()
        .then(deps => {
            res.render('pages/department/department', {
                deps: deps,
                navLocation: 'dep'
            });
        });
}

exports.showAddDepartmentForm = (req, res, next) => {
    const depId = req.params.depId;
    AddressRepository.getAddresses()
    .then(adrs => {
        allAddresses = adrs;
        return ManufacturerRepository.getManufacturers();
    })
    .then(mans => {
        allManufacturers = mans;
        return DepartmentRepository.getDepartmentById(depId);
    }).then(() => {
        res.render('pages/department/add-department', {
            mainDep: {},
            allMans: allManufacturers,
            allAdrs: allAddresses,
            pageTitle: 'New department',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/department/add-department',
            navLocation: 'dep',
            validationErrors: []
        });
    });
}

exports.showModifyDepartmentForm = (req, res, next) => {
    let allManufacturers, allAddresses;
    const depId = req.params.depId;
    AddressRepository.getAddresses()
    .then(adrs => {
        allAddresses = adrs;
        return ManufacturerRepository.getManufacturers();
    })
    .then(mans => {
        allManufacturers = mans;
        return DepartmentRepository.getDepartmentById(depId);
    }).then(dep => {
        res.render('pages/department/modify', {
            mainDep: dep,
            allMans: allManufacturers,
            allAdrs: allAddresses,
            formMode: 'modify',
            pageTitle: 'Modify department',
            btnLabel: 'Modify',
            formAction: '/department/modify',
            navLocation: 'dep',
            validationErrors: []
        });
    });
}

exports.showDepartmentDetails = (req, res, next) => {
    let allManufacturers, allAddresses;
    const depId = req.params.depId;
    AddressRepository.getAddresses()
    .then(adrs => {
        allAddresses = adrs;
        return ManufacturerRepository.getManufacturers();
    })
    .then(mans => {
        allManufacturers = mans;
        return DepartmentRepository.getDepartmentById(depId);
    }).then(dep => {
        res.render('pages/department/details', {
            mainDep: dep,
            allMans: allManufacturers,
            allAdrs: allAddresses,
            formMode: 'details',
            pageTitle: 'Department details',
            formAction: '',
            navLocation: 'dep'
        });
    });
}

exports.addDepartment = (req, res, next) => {
    const depId = req.params.depId;
    const depData = { ...req.body};
    AddressRepository.getAddresses()
    .then(adrs => {
        allAddresses = adrs;
        return ManufacturerRepository.getManufacturers();
    })
    .then(mans => {
        allManufacturers = mans;
        return DepartmentRepository.createDepartment(depData);
    })
    .then(result => {
        res.redirect('/department');
    })
    .catch(err => {
        console.log(err.details);
        res.render('pages/department/add-department', {
            mainDep: depData,
            allMans: allManufacturers,
            allAdrs: allAddresses,
            pageTitle: 'New department',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/department/add-department',
            navLocation: 'dep',
            validationErrors: err.details
        });
    });
};

exports.modifyDepartment = (req, res, next) => {
    const depId = req.body._id;
    const depData = { ...req.body};
    AddressRepository.getAddresses()
    .then(adrs => {
        allAddresses = adrs;
        return ManufacturerRepository.getManufacturers();
    })
    .then(mans => {
        allManufacturers = mans;
        return DepartmentRepository.updateDepartment(depId, depData);
    })
    .then(result => {
        res.redirect('/department');
    })
    .catch(err => {
        res.render('pages/department/modify', {
            mainDep: depData,
            allMans: allManufacturers,
            allAdrs: allAddresses,
            formMode: 'modify',
            pageTitle: 'Modify department',
            btnLabel: 'Modify',
            formAction: '/department/modify',
            navLocation: 'dep',
            validationErrors: err.details
        });
    });
};

exports.deleteDepartment = (req, res, next) => {
    const depId = req.params.depId;
    DepartmentRepository.deleteDepartment(depId)
    .then(() => {
        res.redirect('/department');
    });
};