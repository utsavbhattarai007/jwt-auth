import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const signUpBodyValidation = (body) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("Password"),
    profilePic: Joi.string().required().label("Profile Picture"),
  });
  return schema.validate(body);
};

const loginBodyValidation = (body) => {
  const schema = Joi.object({
    email:Joi.string().email().required().label("Email"),
    password:passwordComplexity().required().label("Password")
  })
  return schema.validate(body);
}

const refreshTokenValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("Refresh Token")
  })
  return schema.validate(body);
}

const passwordValidation = (body) => {
  const schema = Joi.object({
    _id:Joi.string().required().label("User Id"),
    newPassword:passwordComplexity().required().label("New Password"),
    oldPassword:passwordComplexity().required().label("Old Password")
  })
  return schema.validate(body);
}

export {
  signUpBodyValidation,
  loginBodyValidation,
  refreshTokenValidation,
  passwordValidation,
};