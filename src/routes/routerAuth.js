const { Router } = require("express");
const router = new Router();
const passport = require("passport");
const controllerAuth = require("../controllers/controllerAuth");

const checkSessions = require("./utils");

router.get("/", controllerAuth.getLogin);
// Login
router.get("/login", controllerAuth.getLogin);
router.post("/login", passport.authenticate("local", {failureRedirect: "/failLogin",}), controllerAuth.postLogin);
router.get("/failLogin", controllerAuth.getFailLogin);

// Signup
router.get("/signup", controllerAuth.getSignup);
router.post("/signup", controllerAuth.postSignup);

router.get("/dashboard", checkSessions, controllerAuth.getDashBoard);

router.post("/logout", controllerAuth.getLogout);

module.exports = router;
