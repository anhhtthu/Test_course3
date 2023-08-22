import Users from "../models/Users";
import { signInValidator, signupValidator } from "../validation/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { SECRECT_CODE } = process.env;

export const signUp = async (req, res) => {
  try {
    const { error } = signupValidator.validate(req.body, { abortEarly: true });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const userExist = await Users.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: "email đã được đăng ký",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await Users.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Đăng ký tài khoản thành công",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signInValidator.validate(req.body, { abortEarly: true });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      throw new error("email chưa được đăng ký");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng!" });
    }
    const accessToken = jwt.sign({ _id: user.id }, SECRECT_CODE, {
      expiresIn: "1d",
    });
    user.password = undefined;
    return res
      .status(200)
      .json({ message: "Bạn đã đăng nhập thành công", accessToken, user });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
