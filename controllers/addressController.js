const { array } = require('joi');
const AddressRepository = require('../repository/mysql2/AddressRepository');

exports.showAddress = (req, res, next) => {
    AddressRepository.getAddresses()
        .then(adrs => {
            res.render('pages/address/address', {
                adrs: adrs,
                navLocation: 'adrs'
            });
        });
}

exports.showAddAddressForm = (req, res, next) => {
    const adrId = req.params.adrId;
    AddressRepository.getAddressById(adrId)
    .then(() => {
        res.render('pages/address/add-address', {
            mainAdr: {},
            pageTitle: 'New address',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/address/add-address',
            navLocation: 'adrs',
            validationErrors: []
        });
    });
}

exports.showModifyAddressForm = (req, res, next) => {
    const adrId = req.params.adrId;
    AddressRepository.getAddressById(adrId)
    .then(adr => {
        res.render('pages/address/modify', {
            adr: adr,
            formMode: 'modify',
            pageTitle: 'Modify address',
            btnLabel: 'Modify',
            formAction: '/address/modify',
            navLocation: 'adrs',
            validationErrors: []
        });
    });
}

exports.showAddressDetails = (req, res, next) => {
    const adrId = req.params.adrId;
    AddressRepository.getAddressById(adrId)
    .then(adr => {
        res.render('pages/address/details', {
            adr: adr,
            formMode: 'details',
            pageTitle: 'Model address',
            formAction: '',
            navLocation: 'adrs'
        });
    });
}

exports.addAddress = (req, res, next) => {
    const adrData = { ...req.body};
    AddressRepository.createAddress(adrData)
    .then(result => {
        res.redirect('/address');
    })
    .catch(err => {
        res.render('pages/address/add-address', {
            mainAdr: adrData,
            pageTitle: 'New address',
            formMode: 'createNew',
            btnLabel: 'Add',
            formAction: '/address/add-address',
            navLocation: 'adrs',
            validationErrors: err.details
        });
    });
};

exports.modifyAddress = (req, res, next) => {
    const adrId = req.body._id;
    const adrData = { ...req.body};
    AddressRepository.updateAddress(adrId, adrData)
    .then(result => {
        res.redirect('/address');
    })
    .catch(err => {
        res.render('pages/address/modify', {
            adr: adrData,
            formMode: 'modify',
            pageTitle: 'Modify address',
            btnLabel: 'Modify',
            formAction: '/address/modify',
            navLocation: 'adrs',
            validationErrors: err.details
        });
    });
};

exports.deleteAddress = (req, res, next) => {
    const adrId = req.params.adrId;
    AddressRepository.deleteAddress(adrId)
    .then(() => {
        res.redirect('/address');
    });
};