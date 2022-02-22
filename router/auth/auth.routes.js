import { Router } from "express";
const router = Router();

import { postAuth } from "../../controller/auth.controller.js";

router.post("/", postAuth);

export default routerAuth;
