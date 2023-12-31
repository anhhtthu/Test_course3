import { Router } from "express";
import routerProducts from "./product";
import routerAuth from "./user";

const router = Router();

router.use("/products", routerProducts);
router.use("/auth", routerAuth);

export default router;
