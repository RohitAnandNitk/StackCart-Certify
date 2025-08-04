import mongoose from 'mongoose' ; 

const employeeSchema = mongoose.Schema({
    certificateId : {
        type: string ,
        require : true ,
    }, 
    employeeId : {
        type: string ,
        require : true ,
    }, 
   fullName : {
       type : string , 
       require : true , 
    },
    email : {
        type : string , 
        require : true , 
    } , 
    issueDate : {
         type : Date , 
         default : Date.now ,

    } , 
    endDate : {
         type : Date , 
         require : true , 

    } , 
    startDate : {
        type : Date , 
        require : true , 
    } , 
    issueBy : {
        type : string ,  
        default : "Anshu Raj" , 
    } , 
    program : {
        type : string , 
        require : true , 
    } , 

} , {timestamps : true }) ; 

const Employee = mongoose.Schema("Employee" , employeeSchema) ; 

export default Employee ; ;
