const AddressRepository = require('../repository/mysql2/AddressRepository');

exports.getAddresses = (req, res, next) => {
    AddressRepository.getAddresses()
        .then(adrs => {
            res.status(200).json(adrs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAddressById = (req, res, next) => {
    const adrsId = req.params.adrsId;
    AddressRepository.getAddressById(adrsId)
        .then(adrs => {
            if (!adrs) {
                res.status(404).json({
                    message: 'Address with id: '+adrsId+' not found'
                })
            } else {
                res.status(200).json(adrs);
            }
        });
};

exports.createAddress = (req, res, next) => {
    AddressRepository.createAddress(req.body)
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

exports.updateAddress = (req, res, next) => {
    const adrsId = req.params.adrsId;
    AddressRepository.updateAddress(adrsId, req.body)
        .then(results => {
            res.status(200).json({
                message: 'Address updated!',
                adrsId: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAddress = (req, res, next) => {
    const adrsId = req.params.adrsId;
    AddressRepository.deleteAddress(adrsId)
        .then(results => {
            res.status(200).json({
                message: 'Removed address',
                adrs: results
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};