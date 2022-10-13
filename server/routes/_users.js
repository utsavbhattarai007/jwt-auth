//Dependencies
import Router from "express";

//Models
import emailToken from "../models/emailToken.schema.js";
import User from "../models/user.schema.js";

//Middleware
import auth from "../middleware/auth.js";
import roleCheck from "../middleware/roleCheck.js";

//Instance
const router = Router();

//get all user route
router.get("/users", auth, roleCheck(["user"]), (req, res) => {
  res.status(200).json({ msg: "Hi user" });
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
