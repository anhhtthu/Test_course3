import { Router } from "express";
import { getAll } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const routerProducts = Router();

routerProducts.get("/", checkPermission, getAll);

export default routerProducts;
