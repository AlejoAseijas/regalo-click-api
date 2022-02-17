const { Router } = require("express");
const router = Router();
const { postAuth } = require("../controller/auth.controller");

router.post("/", postAuth);

module.exports.route = router;
