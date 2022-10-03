import UserToken from "../models/userToken.schema.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc) {
        return reject({ error: true, msg: "Invalid Refresh Token" });
      }
      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err) {
          return reject({ error: true, msg: "Invalid Refresh Token" });
        }
        return resolve({
          tokenDetails,
          error: false,
          msg: "Valid Refresh Token",
        });
      });
    });
  });
};

export default verifyRefreshToken;
