function routeParsedData(parsedData){
    const routed = {
        employees: [],
        departments: [],
        locations: [],
        leaves: [],
        formPermissions: [],
        designations: []
    };

    for(const fileName in parsedData ){
        const lower = fileName.toLowerCase();

        if(lower.includes("employee")){
            routed.employees = parsedData[fileName];

        }
        else if(lower.includes("department")){
            routed.departments = parsedData[fileName];
        }
        else if(lower.includes("designation")){
            routed.designations = parsedData[fileName];
        }
        else if(lower.includes("location")){
            routed.locations = parsedData[fileName];
        }
        else if(lower.includes("leave")){
            routed.leaves = parsedData[fileName];
        }
        else if(lower.includes("formpermissions")){
            routed.formPermissions = parsedData[fileName];
        }
    }
    return routed;
}

module.exports = {routeParsedData};
