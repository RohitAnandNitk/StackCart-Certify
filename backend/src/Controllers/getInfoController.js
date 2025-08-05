import { response } from "express";
import Employee from "../Models/employee.js";

 const getInfo = async (req , res) => {
      try {
         const {certificateId} = req.body ; 
         // trim end spaces 
         const trimId = certificateId.trim() ; 

         if(!trimId) return res.status(400).json({
            message : "Certificate Id is required" , 
         })
         
         // serach it in database 
         const Available = await Employee.findOne({certificateId : trimId}) ; 
         if(!Available) {
             return res.status(404).json({
                message : "No record found", 
             })
         }
         else {
            return res.status(200).json(
                 Available , 
            )
         }

      } catch (error) {
         console.log("Error in getInfo Controller" ) ; 
         return res.status(500).json({
            message : "Internal Server Error" , 
         })
      }
}


export {getInfo} ; 