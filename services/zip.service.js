const admzip = require('adm-zip');
const path = require('path');
const fs = require('fs');
const { randomUUID} = require('crypto');


const extractZip = (zipFilePath) => {
  try { 
    const zip = new admzip(zipFilePath);
    const extractFolder = path.join(__dirname,'../uploads/extracted', randomUUID());
    fs.mkdirSync(extractFolder, { recursive: true });
    zip.extractAllTo(extractFolder, true);
    return extractFolder;   
    } catch (err) {
        console.log('Error extracting zip file:', err);
    }
}

module.exports = {
    extractZip
};