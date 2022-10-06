import {Router} from "express"
import UserToken from "../models/userToken.schema.js"
import jwt from "jsonwebtoken"
import verifyRefreshToken from "../utils/verifyRefreshToken.js"
import {refreshTokenValidation} from "../utils/validationSchema.js"

const router = Router();

//get new access token
router.post("/refresh", async(req, res) => {
    const {error} = refreshTokenValidation(req.body);
    if(error) return res.status(400).send({error:true,msg:error.details[0].message});
    verifyRefreshToken(req.body.refreshToken)
      .then(({ tokenDetails }) => {
        const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
        const accessToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_PRIVATE_KEY,
          { expiresIn: "15m" }
        );
        res
          .status(200)
          .json({
            error: false,
            accessToken,
            msg: "Access Token created successfully",
          });
      })
      .catch(({ error, msg }) => {
        res.status(400).json({ error, msg });
      });
})

//logout
router.delete("/logout", async(req, res) => {
    try {
        const {error} = refreshTokenValidation(req.body);
        if(error) return res.status(400).send({error:true,msg:error.details[0].message});
        await UserToken.findOneAndDelete({token:req.body.refreshToken});
        res.status(200).json({error:false,msg:"Logged out successfully"});
    } catch (error) {
        res.status(500).json({error:true,msg:"Internal Server Error"});
    }
})

export default router;