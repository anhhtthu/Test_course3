import { Router } from "express";
import { signIn, signUp } from "../controllers/user";

const routerAuth = Router();

routerAuth.post("/signup", signUp);
routerAuth.post("/signin", signIn);
export default routerAuth;
