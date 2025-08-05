import jwt from  'jsonwebtoken'
import Admin from '../Models/admin.js'

const protectRoute = async (req , res , next) => {
    try {
        const token = req.cookies.jwt; 
        if(!token) return res.status(404).json({
            message : "Unathorized -No token provided"  , 
        })
            // jwt funtion return admin._id if token is valid
        const decode = jwt.verify(token , process.env.JWT_SECRET) ; 

        if(!decode) return res.status(404).json({
            message : "Unauthorized : Invalid token" ,
        })

        // find admin 
        const admin = await Admin.findOne({_id : decode.userId} , {password : 0}) ; 

        if(!admin) return res.status(404).json({
            message : "Unauthorized : No Admin found" ,
        })

        req.admin = admin ; 
         next() ; 
    }
      
     catch(error) {
       console.log("Error in protectRoute middleware" , error ) ; 
       return res.status(500).json({
        message : "Internal Server Errror "
       })
   }
}

export default protectRoute  ; 
  