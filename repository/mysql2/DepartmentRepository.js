const db = require('../../config/mysql2/db');
const depSchema = require('../../model/joi/Department');

exports.getDepartments = () => {
    const query = `SELECT dep._id as _id, dep.employeesNumber, dep.managerName, dep.foundationDate, dep.info, man._id as man_id, man.name, man.parentCompany, man.logo, adrs._id as adrs_id, adrs.city, adrs.street, adrs.building, adrs.index
                    FROM Department dep LEFT JOIN Manufacturer man ON dep.man_id = man._id LEFT JOIN Address adrs ON dep.adrs_id = adrs._id`
    return db.promise().query(query)
        .then((results, fields) => {
            const departments = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                var year = row.foundationDate.getFullYear();
                var month = (row.foundationDate.getMonth()+1+"").length != 2 ? ("0" + (row.foundationDate.getMonth() + 1)) : (row.foundationDate.getMonth()+1);
                var day = (row.foundationDate.getDate()+"").length != 2 ? "0" + row.foundationDate.getDate() : row.foundationDate.getDate();
                row.foundationDate = year + "-" + month + "-" + day;
                //row.foundationDate = row.foundationDate.toLocaleDateString();

                const department = {
                    _id: row._id,
                    employeesNumber: row.employeesNumber,
                    managerName: row.managerName,
                    foundationDate: row.foundationDate,
                    info: row.info,
                    manufacturer: {
                        _id: row.man_id,
                        name: row.name,
                        parentCompany: row.parentCompany,
                        logo: row.logo
                    },
                    address: {
                        _id: row.adrs_id,
                        city: row.city,
                        street: row.street,
                        building: row.building,
                        index: row.index
                    }
                };
                departments.push(department);
            }
            return departments;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getDepartmentById = (depId) => {
    const query = `SELECT dep._id as _id, dep.employeesNumber, dep.managerName, dep.foundationDate, dep.info, man._id as man_id, man.name, man.parentCompany, man.logo, adrs._id as adrs_id, adrs.city, adrs.street, adrs.building, adrs.index
                    FROM Department dep LEFT JOIN Manufacturer man ON dep.man_id = man._id LEFT JOIN Address adrs ON dep.adrs_id = adrs._id
                    WHERE dep._id = ?`
    return db.promise().query(query, [depId])
        .then((results, fields) => {
        const row = results[0][0];
        if (!row) {
            return {};
        }
        var year = row.foundationDate.getFullYear();
        var month = (row.foundationDate.getMonth()+1+"").length != 2 ? ("0" + (row.foundationDate.getMonth() + 1)) : (row.foundationDate.getMonth()+1);
        var day = (row.foundationDate.getDate()+"").length != 2 ? "0" + row.foundationDate.getDate() : row.foundationDate.getDate();
        row.foundationDate = year + "-" + month + "-" + day;
        const department = {
            _id: row._id,
            employeesNumber: row.employeesNumber,
            managerName: row.managerName,
            foundationDate: row.foundationDate,
            info: row.info,
            manufacturer: {
                _id: row.man_id,
                name: row.name,
                parentCompany: row.parentCompany,
                logo: row.logo
            },
            address: {
                _id: row.adrs_id,
                city: row.city,
                street: row.street,
                building: row.building,
                index: row.index
            }
        };
        return department;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createDepartment = (newDepData) => {
    const vRes = depSchema.validate(newDepData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const man_id = newDepData.man_id;
    const adrs_id = newDepData.adrs_id;
    const employeesNumber = newDepData.employeesNumber;
    const managerName = newDepData.managerName;
    const foundationDate = newDepData.foundationDate;
    const info = newDepData.info;
    console.log('createDepartment');
    const sql = 'INSERT INTO Department (employeesNumber, managerName, foundationDate, info, man_id, adrs_id) VALUES (?, ?, ?, ?, ?, ?)';
    return db.promise().execute(sql, [employeesNumber, managerName, foundationDate, info, man_id, adrs_id]);
};

exports.updateDepartment = (depId, newDepData) => {
    const vRes = depSchema.validate(newDepData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const man_id = newDepData.man_id;
    const adrs_id = newDepData.adrs_id;
    const employeesNumber = newDepData.employeesNumber;
    const managerName = newDepData.managerName;
    const foundationDate = newDepData.foundationDate;
    const info = newDepData.info;
    const sql = 'UPDATE Department SET employeesNumber = ?, managerName = ?, foundationDate = ?, info = ?, man_id = ?, adrs_id = ? WHERE _id = ?';
    return db.promise().execute(sql, [employeesNumber, managerName, foundationDate, info, man_id, adrs_id, depId]);
};

exports.deleteDepartment = (depId) => {
    const sql = 'DELETE FROM Department WHERE _id = ?';
    return db.promise().execute(sql, [depId]);
};

exports.deleteManyDepartments = (depIds) => {
    const sql = 'DELETE FROM Department WHERE _id IN (?)';
    return db.promise().execute(sql, [depIds]);
};