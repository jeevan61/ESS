const { getOrCreate } = require("../repository/dropdown.repository");

async function mapEmployees(rows){
    const employees = [];
    for(const row of rows){
        const employee = {
          source : {
            employee_code : row["EmployeeID"],
            emp_fname: row["First Name"],
            emp_lname: row["Last Name"],
            emp_name: `${row["First Name"]} ${row["Last Name"]}`.trim(),
            official_email_id: row["Email ID"],
            department : await getOrCreate("formdata_677bdcfb900481a5093dad07","department_name",row["Department"]),
            designation : await getOrCreate("formdata_677bdd44900481a5093dad79","designation", row["Title"]),
            date_of_joining: row["Date of joining"],
            email_id: row["Other Email"],
            reporting_manager: await getOrCreate("formdata_6952ae2f2c8840018031ce77","emp_name",row["Reporting To"]),
            date_birth: row["Birth Date"],
            mobile_number: row["Mobile Phone"],
            perm_add: row["Permanent Address"],
            marital_status: await getOrCreate("formdata_697791c3602e582ff4c2adb3","martial_status_name",row["Marital status"]),

            

        }
    };
    employees.push(employee);

    }
    return employees;
}

module.exports = {
   mapEmployees
};


