import Router from "express"
import auth from "../middleware/auth.js"
import roleCheck from "../middleware/roleCheck.js"

const router = Router();

router.get("/",auth,roleCheck(["user"]),(req,res)=>{
     res.status(200).json({msg:"Hi user"});
})

export default router;