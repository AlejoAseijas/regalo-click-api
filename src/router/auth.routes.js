const { Router } = require("express");
const router = Router();
const { postAuth } = require("../controller/auth.controller");

router.post("/auth", postAuth);

module.exports.authRouter = router;
