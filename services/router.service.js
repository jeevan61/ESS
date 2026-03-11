function routeParsedData(parsedData){

    const routed = {

        employees: [],
        departments: [],
        designations: [],
        locations: [],
        leaves: [],
        formPermissions: [],

        education: [],
        workExperience: [],
        familyMembers: [],
        references: [],
        certifications: []

    };

    for(const fileName in parsedData){

        const lower = fileName.toLowerCase();

        if(lower.includes("employee1")){
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

        else if(lower.includes("educational_qualifications")){
            routed.education = parsedData[fileName];
        }

        else if(lower.includes("work_experience")){
            routed.workExperience = parsedData[fileName];
        }

        else if(lower.includes("family_member_details")){
            routed.familyMembers = parsedData[fileName];
        }

        else if(lower.includes("references_last_two_employments")){
            routed.references = parsedData[fileName];
        }

        else if(lower.includes("professional_certifications")){
            routed.certifications = parsedData[fileName];
        }

    }

    return routed;
}

module.exports = { routeParsedData };