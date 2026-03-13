const { getOrCreate } = require("../repository/dropdown.repository");


const processedEmployees = new Set();
const processedLeavesHistory = new Set();
const processedApplyLeaves = new Set();
const processedDepartments = new Set();
const processedDesignations = new Set();
const processedLocations = new Set();

async function mapEmployees(rows){
    const employees = [];
    for(const row of rows){
        const zohoId = row["ZOHO_LINK_ID"];

        if(!zohoId){
         continue;
        }

        if(processedEmployees.has(zohoId)){
          console.log("Duplicate detected");
          continue;
        }
        processedEmployees.add(zohoId);
        const employee = {
          source : {
               zoho_link_id:zohoId,
               new_employee_details_group :{ 
                    emp_fname: row["First Name"],
                    emp_lname: row["Last Name"],
                    emp_name: `${row["First Name"]} ${row["Last Name"]}`.trim(),
                    official_email_id: row["Email ID"],
               },
               employment_details_group : { 
                    employee_code : row["EmployeeID"],
                    department : await getOrCreate("formdata_677bdcfb900481a5093dad07","department_name",row["Department"]),
                    designation : await getOrCreate("formdata_677bdd44900481a5093dad79","designation", row["Title"]),
                    date_of_joining: row["Date of joining"],
                    reporting_manager: await getOrCreate("formdata_697bc04f602e582ff4c436c0","emp_name",row["Reporting To"]),
               }, 

                    // email_id: row["Other Email"],
                    // date_birth: row["Birth Date"],
                    // mobile_number: row["Mobile Phone"],
                    // perm_add: row["Permanent Address"],
                    // status: await getOrCreate(""),
                    // marital_status: await getOrCreate("formdata_697791c3602e582ff4c2adb3","martial_status_name",row["Marital status"]),
            
            

        }
    };
    employees.push(employee);

    }
    return employees;
}

async function mapLeavesHistory(rows,insertedApplyLeaves){
   const leavesHistory = [];
   let applyLeaveIndex = 0;

   for(let i=0; i<rows.length; i++){

      const row = rows[i];
      const zohoId = row["ZOHO_LINK_ID"];

        if(!zohoId){
         continue;
        }

        if(processedLeavesHistory.has(zohoId)){
          console.log("Duplicate detected");
          continue;
        }
        processedLeavesHistory.add(zohoId);

      const applyLeaveRecord = insertedApplyLeaves[applyLeaveIndex];
      applyLeaveIndex++;
      const leaveHistory = {
         source:{
            leave_taken: applyLeaveRecord._id,
         }
      };
      leavesHistory.push(leaveHistory);


   }
   return leavesHistory;
}

async function mapApplyLeaves(rows){
   const applyLeaves = [];
   for(const row of rows){

     const zohoId = row["ZOHO_LINK_ID"];

        if(!zohoId){
         continue;
        }

        if(processedApplyLeaves.has(zohoId)){
          console.log("Duplicate detected");
          continue;
        }
        processedApplyLeaves.add(zohoId);

     const applyLeave = {
        status : "Approved",
        source :{
           employee_name: row["Employee ID"]?.match(/[A-Za-z]+/)?.[0],
           //leave_type: await getOrCreate("","",row["Leave type"]) custom query
           //approver : custom query
           leave_details :{
              leave_start_date : row["From"],
              leave_end_date : row["To"],
              reason : row["Reason for leave"],
              //total_leave : calculate
             
           }
        }
     };
     applyLeaves.push(applyLeave);
   }
   return applyLeaves;
}

async function mapDepartments(rows){
   const departments = [];
   for(const row of rows){
      const zohoId = row["ZOHO_LINK_ID"];

        if(!zohoId){
         continue;
        }

        if(processedDepartments.has(zohoId)){
          console.log("Duplicate detected");
          continue;
        }
        processedDepartments.add(zohoId);
      const department ={
         source:{
            department_name: row["Department Name"],
         }
      };
      departments.push(department);
   }
   return departments;
}

async function mapDesignations(rows){
   const designations = [];
   for(const row of rows){
      const zohoId = row["ZOHO_LINK_ID"];

        if(!zohoId){
         continue;
        }

        if(processedDesignations.has(zohoId)){
          console.log("Duplicate detected");
          continue;
        }
        processedDesignations.add(zohoId);
      const designation ={
         source:{
            zoho_link_id: zohoId,
            designation: row["Designation Name"],
         }
      };
      designations.push(designation);
   }
   return designations;
}

async function mapLocations(rows){
   const locations = [];
   for(const row of rows){
      const zohoId = row["ZOHO_LINK_ID"];

        if(!zohoId){
         continue;
        }

        if(processedLocations.has(zohoId)){
          console.log("Duplicate detected");
          continue;
        }
        processedLocations.add(zohoId);
      const location ={
         source:{
            zoho_link_id: zohoId,

            location_name: row["Location Name"],
            location_dtls:{
               address_line_1: row["Description"]
            }

         }
      };
      locations.push(location);
   }
      
   return locations;
}



module.exports = {
   mapEmployees,
   mapApplyLeaves,
   mapLeavesHistory,
   mapDepartments,
   mapDesignations,
   mapLocations
};


