import Router from "express"
import auth from "../middleware/auth.js"
import roleCheck from "../middleware/roleCheck.js"
import User from "../models/user.schema.js";

const router = Router();

//get all user route
router.get("/users",auth,roleCheck(["user"]),(req,res)=>{
     res.status(200).json({msg:"Hi user"});
})

//getting specific user through access token
router.get("/user",auth, async(req,res) =>{  
     try {
          const user = await User.findById(req.user._id).select("-password-__v");
          if(!user)
          {
              return res.status(401).json({error:true,msg:"User not found!"});
          }
          res.status(200).json({error:false,user,msg:"User data extracted"})
     } catch (error) {
          res.status(500).json({error:true,msg:"Internal server error"})
     }

})



export default router;