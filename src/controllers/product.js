import dotenv from "dotenv";
import Products from "../models/Products";

dotenv.config();
const { DB_URL } = process.env;

export const getAll = async (req, res) => {
  try {
    const data = await Products.find({});
    if (!data) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.status(200).json({ message: "products found", product: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
