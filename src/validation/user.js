import Joi from "joi";

export const signupValidator = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Tên người dùng không được để trống",
    "any.required": "Tên người dùng là bắt buộc",
  }),
  email: Joi.string().required().messages({
    "string.empty": "email không được để trống",
    "any.required": "email là bắt buộc",
    "string.email": "email không đúng định dạng",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "mật khẩu không được để trống",
    "any.required": "mật khẩu là bắt buộc",
    "string.min": "mật khẩu phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "mật khâủ nhập lại không được để trống",
    "any.required": "mật khẩu nhập lại là bắt buộc",
    "string.min": "mật khẩu nhập lại phải có ít nhất {#limit} ký tự",
    "any.only": "mật khẩu nhập lại không khớp",
  }),
});

export const signInValidator = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "tên đăng nhập không được để trống",
    "any.required": "tên đăng nhập là bắt buộc",
    "string.email": "tên đăng nhập không đúng định dạng",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "mật khẩu không được để trống",
    "any.required": "mật khẩu là bắt buộc",
    "string.min": "mật khẩu phải có ít nhất {#limit} ký tự",
  }),
});
