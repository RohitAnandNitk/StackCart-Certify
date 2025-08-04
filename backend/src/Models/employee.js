import mongoose from 'mongoose' ; 

const employeeSchema = mongoose.Schema({
    certificateId : {
        type: String ,
        require : true ,
        unique : true , 
    }, 
    employeeId : {
        type: String ,
        required : true ,
        unique : true , 
    }, 
   fullName : {
       type : String , 
       require : true , 
    },
    email : {
        type : String , 
        required : true ,  
    } , 
    issueDate : {
         type : Date , 
         default : Date.now ,
    } , 
    endDate : {
         type : Date , 
         required : true , 
    } , 
    startDate : {
        type : Date , 
        required : true , 
    } , 
    issueBy : {
        type : String ,  
        default : "Anshu Raj" , 
    } , 
    program : {
        type : String , 
        required : true , 
    } , 

} , {timestamps : true }) ; 

const Employee = mongoose.model("Employee" , employeeSchema) ; 

export default Employee ; 
