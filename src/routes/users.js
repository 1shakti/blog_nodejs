const { Router } = require("express");
const router = Router();
const { handlePostSignup, handlePostSignin, handleGetLogout } = require("../controllers/users");

router.get("/signup", (req, res) => res.render("signup"));
router.get("/signin", (req, res) => res.render("signin"));
router.post("/signup", handlePostSignup);
router.post("/signin", handlePostSignin);
router.get("/logout", handleGetLogout);

module.exports = router;
