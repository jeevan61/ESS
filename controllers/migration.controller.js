const {extractZip} = require('../services/zip.service');
const fs = require('fs');
const path = require('path');
const {parseCSV} = require('../services/csv.service');
const { routeParsedData } = require('../services/router.service');

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
        

        
        return res.status(200).json({
            success: true,
            message: "Zip proccessed successfully",
            fileParsed: Object.keys(routedData),
            datasets: Object.keys(routedData),
            sampleEmployees: routedData.employees?.slice(0,2)
        });
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
};