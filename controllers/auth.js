
//const User = require('../models/User.js');

const login = (req, res) => {
    res.render("pages/login", {
        loggedIn: false,
    });
}

const loginPost = (req, res) => {
    res.status(200).json({
        message:'Acceso autorizado',
        authenticated: true
    })
}

const signup = (req, res) => {
    res.render("pages/signup", {
        loggedIn: false,
    });
}

const signupPost = (req, res) => {
    res.status(200).json({
        message:'Usuario registrado',
        registered: true
    })
}

const logout = (req, res) => {
    if (req.user != undefined) {
        const name = req.user.name;
        req.session.destroy(() => {
            req.session = null;
            res.render("pages/logout", {
                userName: name,
                loggedIn: false,
            });
        });
    }else{
        res.redirect('/login'); 
    }
}

const dashboard = (req, res) => {
    if(req.user && req.cookies.user_sid){
        res.render("pages/dashboard", {
            userName: req.user.name,
            userEmail: req.user.email,
            loggedIn: true,
        });
    }else{
        res.redirect('/login');
    }
}

const loginError = (req, res) => {
    res.status(400).json({
        message:'Acceso no autorizado',
        authenticated: false
    })
}

const signupError = (req, res) => {
    res.status(400).json({
        message:'No se pudo registrar el usuario',
        registered: false
    })
}

const failLoginDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Credenciales no válidas',
        backUrl: '/login'
    });
}

const failSignupDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Usuario ya registrado',
        backUrl: '/signup'
    });
}
module.exports = {
    login,
    loginPost,
    signup,
    signupPost,
    logout,
    dashboard,
    failLoginDisplay,
    failSignupDisplay, 
    loginError,
    signupError,
}

