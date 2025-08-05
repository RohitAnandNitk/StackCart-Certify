import Employee from "../Models/employee.js";
import { nanoid } from "nanoid";
import { customAlphabet } from 'nanoid';

const createId = async (req, res) => {
    const { employeeId, fullName, email, endDate, startDate, issueBy, program } = req.body;
   
    try {
        // trim outspace and check again 
        if (!employeeId.trim() || !fullName.trim() || !email.trim() || !endDate.trim() || !startDate.trim() || !issueBy.trim() || !program.trim()) {
            return res.status(400).json({
                message: "All field are required",
            })
        }

        

        // Search if emloyee is already avalilable 
        const isExitWithEmployeeId = await Employee.findOne({ employeeId: employeeId });
        if (isExitWithEmployeeId) {
            return res.status(404).json({
                message: `EmployeeId ${employeeId.trim()} already exit with certificateId ${isExitWithEmployeeId.certificateId}`,
            })
        }
        // Genrate Certificate id 
        let newCertificateId = "";
        try {
            let limit = 1e10;
            // Define allowed characters: A-Z (uppercase letters) and 0-9 (numbers)
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            // Create a custom nanoid generator
            const nanoid = customAlphabet(alphabet, 10);
            while (limit--) {
                let genrateId = nanoid();
                genrateId = "ST-" + genrateId;

                // check if it available in database or not 
                if (await Employee.findOne({ certificateId: genrateId })) continue;

                else {
                    newCertificateId = genrateId;
                    break;
                }

            }
        } catch (error) {
            console.log("Employee limit exceed");
            return res.status(400).json({
                message: "No Unique Id remaining",
            })
        }
        // check for newcertificate id 
        if (!newCertificateId) {
            return res.status(500).json({
                message: "Internal Server Error1",
            })
        }

        // create empoyee 
        const newEmployee = new Employee({
            employeeId,
            fullName,
            email,
            endDate: new Date(endDate),
            startDate: new Date(startDate),
            issueBy,
            program,
            certificateId: newCertificateId,
            issueDate: new Date(Date.now()),
        })

        if (newEmployee) {
            await newEmployee.save();
            return res.status(201).json({
                certificateId : newEmployee.certificateId,
            })
        }

        else {
            return res.status(400).json({ message: "Invalid Data" });

        }

    }
    catch (error) {
        console.log("Eroor in adminController", error);
        return res.status(500).json({
            message: "Internal Server Error ",
        })
    }

}

export { createId };

