


const mongoose = require("mongoose");

async function getExistingZohoIds(collectionName){

   const collection = mongoose.connection.collection(collectionName);

   const docs = await collection.find(
      { "source.migration_reference": { $exists: true } },
      { projection: { "source.migration_reference": 1 } }
   ).toArray();

   return new Set(
      docs.map(d => d.source.migration_reference)
   );
}

// async function insertEmployees(employees){
//     const collection = mongoose.connection.collection("formdata_697bc04f602e582ff4c436c0");
//     const result = await collection.insertMany(employees);

//     return result;
// }

// async function insertapplyLeaves(applyLeaves){
//     const collection = mongoose.connection.collection("formdata_6952b8312c8840018031d49d");
//     const result = await collection.insertMany(applyLeaves);

//     return result;
// }
// async function insertLeavesHistory(leaveHistory){
//     const collection = mongoose.connection.collection("formdata_6952b9a92c8840018031d51a");
//     const result = await collection.insertMany(leaveHistory);

//     return result;
// }

// async function insertDepartments(department){
//     const collection = mongoose.connection.collection("formdata_677bdcfb900481a5093dad07");
//     const result = await collection.insertMany(department);

//     return result;
// }

// async function insertDesignations(designation){
//     const collection = mongoose.connection.collection("formdata_677bdd44900481a5093dad79");
//     const result = await collection.insertMany(designation);

//     return result;
// }

// async function insertLocations(location){
//     const collection = mongoose.connection.collection("formdata_677bdcae900481a5093dacb4");
//     const result = await collection.insertMany(location);

//     return result;
// }



const axios = require('axios');

const API_URL = process.env.APPVERSE_API_URL;
const API_KEY = process.env.APPVERSE_API_KEY;
const API_KEY_ID = process.env.APPVERSE_API_KEY_ID;



// async function insertEmployees(employees){

//     let inserted = 0;

//     for(const emp of employees){

//         try{

    //             const zohoId = emp.source.zoho_link_id;

    //             const exists = await alreadyExists(
    //                 "formdata_697bc04f602e582ff4c436c0",
    //                 zohoId
    //             );

    //             if(exists){
    //                 console.log("Skipping duplicate:", zohoId);
    //                 continue;
    //   }

//             const startTime = new Date();
//             const endTime = new Date(startTime.getTime() + 1000);

//             const startISO = startTime.toISOString();
//             const endISO = endTime.toISOString();

//             const payload = {

//                 formId: "formdata_697bc04f602e582ff4c436c0",

//                 _id: null,
//                 version: null,

//                 _deletedRepeatInstances: [],
//                 _choiceDataValueLabelMapping: {},
//                 _dynamicInputChoiceDataMapping: {},

//                 source: {

//                     Start: startISO,
//                     Today: endISO,
//                     End: endISO,

//                     Username: "ihsan",
//                     InstanceName: "encrypt in groups",
//                     Timespent: "00:00:01",

//                     Location: "13.0374246 80.2545272 0 13.424",
//                     AppVersion: "",

//                     ...emp.source,

//                     meta: {
//                         instanceID: null
//                     }

//                 }

//             };

//             await axios.post(API_URL, payload, {
//                 headers:{
//                     "x-api-key": API_KEY,
//                     "x-api-key-id": API_KEY_ID,
//                     "Content-Type": "application/json"
//                 }
//             });

//             inserted++;

//         }
//         catch(error){
//             console.error("Employee insertion API failed");
//         }
//     }

//     return inserted;
// }


// async function insertapplyLeaves(applyLeaves){

//     let inserted = 0;

//     for(const leave of applyLeaves){

//         try{

//             const startTime = new Date();
//             const endTime = new Date(startTime.getTime() + 1000);

//             const payload = {

//                 formId: "formdata_6952b8312c8840018031d49d",

//                 _id: null,
//                 version: null,

//                 _deletedRepeatInstances: [],
//                 _choiceDataValueLabelMapping: {},
//                 _dynamicInputChoiceDataMapping: {},

//                 source: {

//                     Start: startTime.toISOString(),
//                     Today: endTime.toISOString(),
//                     End: endTime.toISOString(),

//                     Username: "ihsan",
//                     InstanceName: "encrypt in groups",
//                     Timespent: "00:00:01",

//                     Location: "13.0374246 80.2545272 0 13.424",
//                     AppVersion: "",

//                     ...leave.source,

//                     meta: {
//                         instanceID: null
//                     }

//                 }

//             };

//             await axios.post(API_URL, payload,{
//                 headers:{
//                     "x-api-key":API_KEY,
//                     "x-api-key-id":API_KEY_ID,
//                     "Content-Type":"application/json"
//                 }
//             });

//             inserted++;

//         }
//         catch(error){
//             console.error("Apply leave API failed");
//         }

//     }

//     return inserted;
// }


// async function insertLeavesHistory(leaveHistory){

//     let inserted = 0;

//     for(const history of leaveHistory){

//         try{

//             const startTime = new Date();
//             const endTime = new Date(startTime.getTime() + 1000);

//             const payload = {

//                 formId: "formdata_6952b9a92c8840018031d51a",

//                 _id: null,
//                 version: null,

//                 _deletedRepeatInstances: [],
//                 _choiceDataValueLabelMapping: {},
//                 _dynamicInputChoiceDataMapping: {},

//                 source: {

//                     Start: startTime.toISOString(),
//                     Today: endTime.toISOString(),
//                     End: endTime.toISOString(),

//                     Username: "ihsan",
//                     InstanceName: "encrypt in groups",
//                     Timespent: "00:00:01",

//                     Location: "13.0374246 80.2545272 0 13.424",
//                     AppVersion: "",

//                     ...history.source,

//                     meta: {
//                         instanceID: null
//                     }

//                 }

//             };

//             await axios.post(API_URL, payload,{
//                 headers:{
//                     "x-api-key":API_KEY,
//                     "x-api-key-id":API_KEY_ID,
//                     "Content-Type":"application/json"
//                 }
//             });

//             inserted++;

//         }
//         catch(error){
//             console.error("Leave history API failed");
//         }

//     }

//     return inserted;
// }



async function insertDepartments(departments){

    let inserted = 0;
    const existingIds = await getExistingZohoIds(
       "formdata_677bdcfb900481a5093dad07"
    );
    for(const department of departments){
        const zohoId = department.source.zoho_link_id;
        if(existingIds.has(zohoId)){
            console.log("Duplicate detected in Departments");
            continue;
        }
        try{

            const startTime = new Date();
            const endTime = new Date(startTime.getTime() + 1000);

            const payload = {

                formId: "677bdcfb900481a5093dad07",

                _id: null,
                

                _deletedRepeatInstances: [],
                _choiceDataValueLabelMapping: {},
                _dynamicInputChoiceDataMapping: {},

                source: {
                    version: "1.0.0",
                    Start: startTime.toISOString(),
                    Today: endTime.toISOString(),
                    End: endTime.toISOString(),

                    Username: "ihsan",
                    InstanceName: "encrypt in groups",
                    Timespent: "00:00:01",

                    Location: "13.0374246 80.2545272 0 13.424",
                    AppVersion: "",

                    ...department.source,

                    meta: {
                        instanceID: null
                    }

                }

            };

            await axios.post(API_URL, [payload],{
                headers:{
                    "x-api-key":API_KEY,
                    "x-api-key-id":API_KEY_ID,
                    "Content-Type":"application/json"
                }
            });
            existingIds.add(zohoId);
            inserted++;

        }
        catch(error){
            console.error("Department API failed");
        }

    }

    return inserted;
}



async function insertDesignations(designations){

    let inserted = 0;
    const existingIds = await getExistingZohoIds(
       "formdata_677bdd44900481a5093dad79"
    );
    for(const designation of designations){

        


        const zohoId = designation.source.zoho_link_id;

                if(existingIds.has(zohoId)){
                    console.log("Duplicates detected in Designations");
                    continue;
                }

        try{


                


            const startTime = new Date();
            const endTime = new Date(startTime.getTime() + 1000);

            const payload = {

                formId: "677bdd44900481a5093dad79",

                _id: null,
                

                _deletedRepeatInstances: [],
                _choiceDataValueLabelMapping: {},
                _dynamicInputChoiceDataMapping: {},

                source: {
                    version: "1.0.0",
                    Start: startTime.toISOString(),
                    Today: endTime.toISOString(),
                    End: endTime.toISOString(),

                    Username: "ihsan",
                    InstanceName: "encrypt in groups",
                    Timespent: "00:00:01",

                    Location: "13.0374246 80.2545272 0 13.424",
                    AppVersion: "",

                    ...designation.source,

                    meta: {
                        instanceID: null
                    }

                }

            };

            await axios.post(API_URL, [payload],{
                headers:{
                    "x-api-key":API_KEY,
                    "x-api-key-id":API_KEY_ID,
                    "Content-Type":"application/json"
                }
            });
            existingIds.add(zohoId);
            inserted++;

        }
        catch(error){
            console.error("Designation API failed",error.response?.data || error.message);
        }

    }

    return inserted;
}



async function insertLocations(locations){

    let inserted = 0;

    const existingIds = await getExistingZohoIds("formdata_677bdcae900481a5093dacb4")

    for(const location of locations){
                const zohoId = location.source.zoho_link_id;

                if(existingIds.has(zohoId)){
                    console.log("Duplicate detected in Locations");
                    continue;
                }

        try{
                

                

            const startTime = new Date();
            const endTime = new Date(startTime.getTime() + 1000);

            const payload = {

                formId: "677bdcae900481a5093dacb4",

                _id: null,
                

                _deletedRepeatInstances: [],
                _choiceDataValueLabelMapping: {},
                _dynamicInputChoiceDataMapping: {},

                source: {
                    version: "1.0.0",
                    Start: startTime.toISOString(),
                    Today: endTime.toISOString(),
                    End: endTime.toISOString(),

                    Username: "ihsan",
                    InstanceName: "encrypt in groups",
                    Timespent: "00:00:01",

                    Location: "13.0374246 80.2545272 0 13.424",
                    AppVersion: "",

                    ...location.source,
                    migration_reference: location.source.zoho_link_id,

                    meta: {
                        instanceID: null
                    }

                }

            };

            await axios.post(API_URL, [payload],{
                headers:{
                    "x-api-key":API_KEY,
                    "x-api-key-id":API_KEY_ID,
                    "Content-Type":"application/json"
                }
            });
            existingIds.add(zohoId);
            inserted++;

        }
        catch(error){
            console.error("Location API failed",error.response?.data || error.message);
        }

    }

    return inserted;
}






module.exports = {
    // insertEmployees,
    // insertapplyLeaves,
    // insertLeavesHistory,
    insertDepartments,
    insertDesignations,
    insertLocations
};