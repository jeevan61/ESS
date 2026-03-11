const { getOrCreate } = require("../repository/dropdown.repository");

async function mapEmployees(rows){
    const employees = [];
    for(const row of rows){
        const employee = {
          source : {
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

async function mapLeaveHistory(rows){
  
   
}

async function mapApplyLeave(rows){
   const applyLeaves = [];
   for(const row of rows){
     const applyLeave = {
        status : "approved",
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

module.exports = {
   mapEmployees,
   mapApplyLeave
};


