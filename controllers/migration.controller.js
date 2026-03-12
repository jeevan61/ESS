const {extractZip} = require('../services/zip.service');
const fs = require('fs');
const path = require('path');
const {parseCSV} = require('../services/csv.service');
const { routeParsedData } = require('../services/router.service');
const { mapEmployees, mapApplyLeaves,mapLeavesHistory,mapDepartments,mapDesignations,mapLocations} = require('../services/mapping.service');
const { insertEmployees,insertapplyLeaves,insertLeavesHistory,insertDepartments,insertDesignations,insertLocations } = require("../repository/employee.repository");

function findCSVFiles(dir){
    let results = [];

    const items = fs.readdirSync(dir);

    for(const item of items){
        const fullPath = path.join(dir,item);
        const stat = fs.statSync(fullPath);

        if(stat.isDirectory()){
            results = results.concat(findCSVFiles(fullPath));
        }
        else if(path.extname(item).toLowerCase() === '.csv'){
            results.push(fullPath);
        }
    }
    return results;
}



exports.uploadEmployees = async(req,res) => {
    try{
        
        if(!req.file){
            return res.status(400).json({
                success : false,
                
                message : "No zip file uploaded"
            });
        }

        const zipPath = req.file.path;
        const extractedFolder = await extractZip(zipPath);
       
        const parsedData = {};
        const csvFiles = findCSVFiles(extractedFolder);
      

    

        for(const filePath of csvFiles){
           
               const fileName = path.basename(filePath);
               const data = await parseCSV(filePath);
               parsedData[fileName] = data;
           
        }
       
        const routedData = routeParsedData(parsedData);
        const mappedEmployees = await mapEmployees(routedData.employees);
        await insertEmployees(mappedEmployees);

        const mappedApplyLeaves = await mapApplyLeaves(routedData.leaves);
        await insertapplyLeaves(mappedApplyLeaves);

        const mappedLeavesHistory = await mapLeavesHistory(routedData.leaves,mappedApplyLeaves);
        await insertLeavesHistory(mappedLeavesHistory);

        const mappedDepartments = await mapDepartments(routedData.departments);
        await insertDepartments(mappedDepartments);
        
        const mappedDesignations = await mapDesignations(routedData.designations);
        await insertDesignations(mappedDesignations);

        const mappedLocations = await mapLocations(routedData.locations);
        await insertLocations(mappedLocations);

        
        return res.status(200).json({
            success: true,
            message: "Mapping over",
            fileParsed: Object.keys(routedData),
            totalEmployees: mappedEmployees.length,
            inserted: mappedEmployees.length,
            sample: mappedEmployees.slice(0,2)
        });
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
};

