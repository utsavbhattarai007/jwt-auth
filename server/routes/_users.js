//Dependencies
import Router from "express";
import bcrypt from "bcrypt";

//Models
import emailToken from "../models/emailToken.schema.js";
import User from "../models/user.schema.js";

//Middleware
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";
import { passwordValidation } from "../utils/validationSchema.js";

//Instance
const router = Router();

//get all user route
router.get("/users", auth, roleCheck(["admin"]), async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//getting specific user through access token
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password-__v");
    if (!user) {
      return res.status(401).json({ error: true, msg: "User not found!" });
    }
    res.status(200).json({ error: false, user, msg: "User data extracted" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

//Delete the user by id
router.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ error: false, msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

//updating user data
router.patch("/user", async (req, res) => {
  try {
    const { _id, username, profilePic } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: _id },
      { $set: { username: username, profilePic: profilePic } },
      { new: true }
    );
    res.status(200).json({ error: false, user, msg: "User data updated" });
    console.log(user);
  } catch (error) {
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

//Changing user's password
router.patch("/user/password", async (req, res) => {
  try {
    const { error } = passwordValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, msg: error.details[0].message });
    }

    // Finding the specific user through id
    const user = await User.findById(req.body._id);

    // Validating the old password given by user
    const validate = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!validate) {
      return res
        .status(400)
        .json({ error: true, msg: "Old password is incorrect" });
    }

    // Validating the new password is same as old password or not
    const samePassword = await bcrypt.compare(
      req.body.newPassword,
      user.password
    );
    if (samePassword) {
      return res
        .status(400)
        .json({
          error: true,
          msg: "New password cannot be same as old password",
        });
    }
    //Hashing password for security purposes
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    //Replacing original old password with hashed new password in the database
    await user.updateOne({ $set: { password: hashPassword } });
    res
      .status(200)
      .json({ error: false, msg: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

//verifing email route
router.get("/user/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(401).json({ error: true, msg: "Invalid Link!" });
    }

    const token = await emailToken.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(401).json({ error: true, msg: "Invalid Link!" });
    }

    //update the verified status to true in mongodb using updateOne method
    await User.updateOne({ _id: user._id }, { $set: { verified: true } });

    //delete the token from mongodb using deleteOne method
    await emailToken.deleteOne({ userId: user._id });
    res.status(200).json({ error: false, msg: "Email verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
});

export default router;
