const mongoose = require('mongoose');

async function insertEmployees(employees){
    const collection = mongoose.connection.collection("formdata_697bc04f602e582ff4c436c0");
    const result = await collection.insertMany(employees);

    return result;
}

async function insertapplyLeave(applyLeaves){
    const collection = mongoose.connection.collection("formdata_6952b8312c8840018031d49d");
    const result = await collection.insertMany(applyLeaves);

    return result;
}



module.exports = {
    insertEmployees,
    insertapplyLeave
};