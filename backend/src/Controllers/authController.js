import Admin from "../Models/admin.js";
import bcrypt from 'bcryptjs'
import { genrateToken } from "../lib/utils.js";


// SignUp controller
const signup = async (req, res) => {
    // HardCode email here that are allowed to signup 
    const hardCodeEmail = ["imprincestark45@gmail.com" , "ramanandimo457@gmail.com"];
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(404).json({
                message: "All field are required",
            })
        }
        // check password lenght 
        if (password.length < 6) {
            return res.status(404).json({
                message: "Password must contain atleast 6 character",
            });
        }

        // check email is hardCoded or not 
        const emailToSearch = email.trim().toLowerCase();
        const isHardCoded = hardCodeEmail.some(emailId => emailId === emailToSearch);
        if (!isHardCoded) {
            return res.status(404).json({
                message: "Cannot be SignUp with this email",
            });
        };

        // check email is exit or not 
        const isAdminExit = await Admin.findOne({ email });
        if (isAdminExit) return res.status(404).json({ message: "Email already exit" });

        // next step hash the password for saftey 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new admin and store in db
        const newAdmin = new Admin({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newAdmin) {
            // genrate  jwt token and this also save token in cookie
            genrateToken(newAdmin._id, res);
            // save newAdmin databse
            await newAdmin.save();

            return res.status(201).json({
                _id: newAdmin._id,
                email: newAdmin.email,
                fullName: newAdmin.fullName,
            });

        }

        else {
            return res.status(400).json({
                message: "Invalid Admin data",
            })
        }

    }

    catch(error) {
        console.log(`Error in signup controller` , error) ; 
        return res.status(500).json({
            message : "Internal Server Error" , 
        })
    }
}



// login controller 

const login = async (req , res) => {
    const{email , password} = req.body ; 

    try {
        const admin = await Admin.findOne({email}) ; 
        if(!admin) return res.status(404).json({
            message : "Invalid Credientials"
        })

        // check for password 
        const isPasswordCorrect = await bcrypt.compare(password , admin.password ) ; 

        if(!isPasswordCorrect) return res.status(400).json({
            message : "Invalid Credientials" ,
        }) 
        
          genrateToken(admin._id , res ); 

        return res.status(200).json({
            _id : admin._id , 
            fullName : admin.fullName ,
            email : admin.email ,
        })
    }
    catch(error) {
        console.log(`Eroor in login controller` , error) ; 
        return res.status(500).json({
            message : "Internal Server Error" , 
        })
    }
}


// logout controller 

const logout = async (req , res) => {
        try{
            res.cookie("jwt" , "" , {maxAge : '0'}) ;
            return res.status(200).json({
                message : "Logout Successfully" ,
            })
        }
        catch {
            console.log("Error in logout controller") ; 
            return res.status(500).json({
                message : "Internal Server Error" , 
            })
        }
}  ; 

// authCheck

const checkAuth = (req , res) => {
    try {
        res.status(200).json(req.admin) ; 
    } catch (error) {
        console.log("Error in checkAuth controller" , error.message) ; 

        res.status(500).json({message : "Internal Server error"}) ; 
    }
}



export{signup , login , logout ,checkAuth} ;