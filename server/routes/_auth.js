import { Router } from "express";
import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import {
  loginBodyValidation,
  signUpBodyValidation,
} from "../utils/validationSchema.js";
import generateTokens from "../utils/generateTokens.js";
const router = Router();

//sign up route
router.post("/signup", async (req, res) => {
  try {
    //Validate the body
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, msg: error.details[0].message });
    }

    //Check whether the user exists or not while signuping
    const user = await User.findOne({email:req.body.email });
    if (user) {
      return res.status(400).json({ error: true, msg: "User already exists" });
    }

    //Hashing password for security purposes
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Replacing original password with hashed password
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(200).json({ error: false, msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { error } = loginBodyValidation(req.body);

    //Validate the body
    if (error) {
      return res
        .status(400)
        .send({ error: true, msg: error.details[0].message });
    }

    //Check whether the user's email exist in the database
    const user = await User.findOne({email:req.body.email});
    if (!user) {
      return res.status(401).json({ error: true, msg: "Invalid credentials" });
    }
    
    //Check whether the request password matches with the hased password in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //If doesn't match return error
    if (!validPassword) {
      return res.status(401).json({ error: true, msg: "Invalid credentials" });
    }

    //Generate access and refresh token
    const {accessToken,refreshToken} = await generateTokens(user);

    res.status(200).json({error:false,accessToken,refreshToken,msg:"Login Successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});
export default router;
