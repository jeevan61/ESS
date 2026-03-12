const mongoose = require('mongoose');

async function insertEmployees(employees){
    const collection = mongoose.connection.collection("formdata_697bc04f602e582ff4c436c0");
    const result = await collection.insertMany(employees);

    return result;
}

async function insertapplyLeaves(applyLeaves){
    const collection = mongoose.connection.collection("formdata_6952b8312c8840018031d49d");
    const result = await collection.insertMany(applyLeaves);

    return result;
}
async function insertLeavesHistory(leaveHistory){
    const collection = mongoose.connection.collection("formdata_6952b9a92c8840018031d51a");
    const result = await collection.insertMany(leaveHistory);

    return result;
}

async function insertDepartments(department){
    const collection = mongoose.connection.collection("formdata_677bdcfb900481a5093dad07");
    const result = await collection.insertMany(department);

    return result;
}

async function insertDesignations(designation){
    const collection = mongoose.connection.collection("formdata_677bdd44900481a5093dad79");
    const result = await collection.insertMany(designation);

    return result;
}

async function insertLocations(location){
    const collection = mongoose.connection.collection("formdata_677bdcae900481a5093dacb4");
    const result = await collection.insertMany(location);

    return result;
}

module.exports = {
    insertEmployees,
    insertapplyLeaves,
    insertLeavesHistory,
    insertDepartments,
    insertDesignations,
    insertLocations
};