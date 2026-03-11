const mongoose = require('mongoose');

async function insertEmployees(employees){
    const collection = mongoose.connection.collection("formdata_6952ae2f2c8840018031ce77");
    const result = await collection.insertMany(employees);

    return result;
}

module.exports = {
    insertEmployees
};