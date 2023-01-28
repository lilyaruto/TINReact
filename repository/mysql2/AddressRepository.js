const db = require('../../config/mysql2/db');
const adrSchema = require('../../model/joi/Address');

exports.getAddresses = () => {
    const query = `SELECT *
                    FROM Address`
    return db.promise().query(query)
        .then((results, fields) => {
            const addresses = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const address = {
                    _id: row._id,
                    city: row.city,
                    street: row.street,
                    building: row.building,
                    index: row.index
                };
                addresses.push(address);
            }
            console.log(addresses);
            return addresses;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getAddressById = (adrsId) => {
    const query = `SELECT *
                    FROM Address
                    WHERE _id = ?`
    return db.promise().query(query, [adrsId])
        .then((results, fields) => {
        const row = results[0][0];
        if (!row) {
            return {};
        }
        const address = {
            _id: row._id,
            city: row.city,
            street: row.street,
            building: row.building,
            index: row.index
        };
        console.log(address);
        return address;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createAddress = (newAdrData) => {
    const vRes = adrSchema.validate(newAdrData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const city = newAdrData.city;
    const street = newAdrData.street;
    const building = newAdrData.building;
    const index = newAdrData.index;
    console.log('createAddress');
    const sql = 'INSERT INTO Address (city, street, building, `index`) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [city, street, building, index]);
};

exports.updateAddress = (adrsId, newAdrData) => {
    const vRes = adrSchema.validate(newAdrData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const city = newAdrData.city;
    const street = newAdrData.street;
    const building = newAdrData.building;
    const index = newAdrData.index;
    const sql = 'UPDATE Address SET city = ?, street = ?, building = ?, `index` = ? WHERE _id = ?';
    return db.promise().execute(sql, [city, street, building, index, adrsId]);
};

exports.deleteAddress = (adrsId) => {
    const sql = 'DELETE FROM Address WHERE _id = ?';
    return db.promise().execute(sql, [adrsId]);
};

exports.deleteManyAddresses = (adrsIds) => {
    const sql = 'DELETE FROM Address WHERE _id IN (?)';
    return db.promise().execute(sql, [adrsIds]);
};