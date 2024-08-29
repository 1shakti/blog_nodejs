const { Router } = require("express");
const router = Router();
const { handlePostSignup, handlePostSignin } = require("../controllers/users");

router.get("/signup", (req, res) => res.render("signup"));
router.get("/signin", (req, res) => res.render("signin"));
router.post("/signup", handlePostSignup);
router.post("/signin", handlePostSignin);

module.exports = router;
