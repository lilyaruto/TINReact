const db = require('../../config/mysql2/db');
const manSchema = require('../../model/joi/Manufacturer');

exports.getManufacturers = () => {
    return db.promise().query('SELECT * FROM Manufacturer')
        .then((results, fields) => {
            const manufacturers = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.parentCompany == null) {
                    row.parentCompany = "NULL";
                }
                const manufacturer = {
                    _id: row._id,
                    name: row.name,
                    parentCompany: row.parentCompany,
                    logo: row.logo
                };
                manufacturers.push(manufacturer);
            }
            return manufacturers;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getManufacturerById = (manId) => {
    return db.promise().query('SELECT * FROM Manufacturer WHERE _id = ?', [manId])
        .then((results, fields) => {
        const row = results[0][0];
        if (!row) {
            return {};
        }
        const manufacturer = {
            _id: manId,
            name: row.name,
            parentCompany: row.parentCompany,
            logo: row.logo
        };
        return manufacturer;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createManufacturer = (newManData) => {
    const vRes = manSchema.validate(newManData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newManData.name;
    const parentCompany = newManData.parentCompany;
    const logo = newManData.logo;
    console.log('createManufacturer');
    const sql = 'INSERT INTO Manufacturer (name, parentCompany, logo) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [name, parentCompany == 0 ? null : parentCompany , logo]);
};

exports.updateManufacturer = (manId, newManData) => {
    const vRes = manSchema.validate(newManData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newManData.name;
    const parentCompany = newManData.parentCompany;
    const logo = newManData.logo;
    const sql = 'UPDATE Manufacturer SET name = ?, parentCompany = ?, logo = ? WHERE _id = ?';
    return db.promise().execute(sql, [name, parentCompany, logo, manId]);
};

exports.deleteManufacturer = (manId) => {
    const sql = 'DELETE FROM Manufacturer WHERE _id = ?';
    return db.promise().execute(sql, [manId]);
};

exports.deleteManyManufacturers = (manIds) => {
    const sql = 'DELETE FROM Manufacturer WHERE _id IN (?)';
    return db.promise().execute(sql, [manIds]);
};