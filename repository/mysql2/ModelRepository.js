const db = require('../../config/mysql2/db');
const modSchema = require('../../model/joi/Model');

exports.getModels = () => {
    const query = `SELECT model._id as _id, model.name, model.generation, man._id as man_id, man.name as man_name, man.parentCompany, man.logo
                    FROM Model model LEFT JOIN Manufacturer man ON model.man_id = man._id`
    return db.promise().query(query)
        .then((results, fields) => {
            const models = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                const model = {
                    _id: row._id,
                    name: row.name,
                    generation: row.generation,
                    manufacturer: {
                        _id: row.man_id,
                        name: row.man_name,
                        parentCompany: row.parentCompany,
                        logo: row.logo
                    }
                };
                models.push(model);
            }
            return models;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getModelById = (modId) => {
    const query = `SELECT model._id as _id, model.name, model.generation, man._id as man_id, man.name as man_name, man.parentCompany, man.logo
                    FROM Model model LEFT JOIN Manufacturer man ON model.man_id = man._id
                    WHERE model._id = ?`
    return db.promise().query(query, [modId])
        .then((results, fields) => {
        const row = results[0][0];
        if (!row) {
            return {};
        }
        const model = {
            _id: modId,
            name: row.name,
            generation: row.generation,
            manufacturer: {
                _id: row.man_id,
                name: row.man_name,
                parentCompany: row.parentCompany,
                logo: row.logo
            }
        };
        return model;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createModel = (newModData) => {
    const vRes = modSchema.validate(newModData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newModData.name;
    const man_id = newModData.man_id;
    const generation = newModData.generation;
    console.log('createModel');
    const sql = 'INSERT INTO Model (name, generation, man_id) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [name, generation, man_id]);
};

exports.updateModel = (modId, newModData) => {
    const vRes = modSchema.validate(newModData, { abortEarly: false} );
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const name = newModData.name;
    const man_id = newModData.man_id;
    const generation = newModData.generation;
    const sql = 'UPDATE Model SET name = ?, generation = ?, man_id = ? WHERE _id = ?';
    return db.promise().execute(sql, [name, generation, man_id, modId]);
};

exports.deleteModel = (modId) => {
    const sql = 'DELETE FROM Model WHERE _id = ?';
    return db.promise().execute(sql, [modId]);
};

exports.deleteManyModels = (modIds) => {
    const sql = 'DELETE FROM Model WHERE _id IN (?)';
    return db.promise().execute(sql, [modIds]);
};