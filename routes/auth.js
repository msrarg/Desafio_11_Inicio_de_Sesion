const passport = require('passport');
const { Router } = require('express');
const { sessionChecker } = require('../middlewares/session-checker');
const { 
    login,signup,logout,dashboard, signupPost, 
    loginPost, failLoginDisplay, failSignupDisplay, 
    signupError, loginError 
} = require('../controllers/auth');
const router = Router();

router.get('/', sessionChecker, (req, res) => {
    res.redirect("/login");
  })
router.get('/login',sessionChecker,login)
router.post('/login',passport.authenticate('login', {failureRedirect:'/fLogin'}),loginPost)
router.get('/logout',logout)
router.get('/dashboard',dashboard)
router.get('/signup',signup);
router.post('/signup',passport.authenticate('register', {failureRedirect:'/fRegister'}),signupPost)
router.get('/fRegister', signupError)
router.get('/fLogin', loginError)
router.get('/failLogin', failLoginDisplay)
router.get('/failSignup', failSignupDisplay)
  
module.exports = router;  