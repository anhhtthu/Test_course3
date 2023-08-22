import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/Users";

dotenv.config();
const { SECRECT_CODE } = process.env;

export const checkPermission = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new Error("Bạn chưa đăng nhập!");
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token rỗng!");
    }

    jwt.verify(token, SECRECT_CODE, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Token của bạn đã hết hạn" || err.message,
          });
        }

        if (err.name === "JsonWebTokenError") {
          return res.status(401).json({
            message: "Token của bạn đã bị lỗi" || err.message,
          });
        }

        if (err.name === "NotBeforeError") {
          return res.status(401).json({
            message: "Token không hoạt động" || err.message,
          });
        }
      }
      const user = await Users.findById(decoded._id);

      if (!user || user.role !== "admin") {
        throw new Error("Bạn không có quyền làm việc này");
      }
    });

    //next
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Bạn không có quyền!",
    });
  }
};
