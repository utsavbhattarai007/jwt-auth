//Importing Dependencies
import { Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";

//Importing Schema
import User from "../models/user.schema.js";
import emailToken from "../models/emailToken.schema.js";

//Importing Utils
import {
  loginBodyValidation,
  signUpBodyValidation,
} from "../utils/validationSchema.js";
import generateTokens from "../utils/generateTokens.js";
import sendEmail from "../utils/SendEmail.js";

//Instance
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
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: true, msg: "User already exists" });
    }

    //Hashing password for security purposes
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Replacing original password with hashed password
    user = await new User({ ...req.body, password: hashPassword }).save();

    //Generating token for email verification
    const token = await new emailToken({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Email Verification", url);

    res
      .status(200)
      .json({ error: false, msg: "An email sent to your email Please verify" });
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
    const user = await User.findOne({ email: req.body.email });
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
    const { accessToken, refreshToken } = await generateTokens(user);

    //If user is not verified then
    if (!user.verified) {
      let token = await emailToken.findOne({ userId: user._id });
      if (!token) {
        token = await new emailToken({
          userId: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Email Verification", url);
      }
      return res.status(400).json({
        error: false,
        msg: "An email sent to your account please verify",
      });
    }

    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      msg: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});
export default router;
