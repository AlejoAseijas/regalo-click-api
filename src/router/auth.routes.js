import { Router } from "express";
const router = Router();

import { postAuth } from "../controller/auth.controller";

router.post("/", postAuth);

export default router;
