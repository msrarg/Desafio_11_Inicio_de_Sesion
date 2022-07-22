const User = require("../models/user");

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else res.render("login");
};

const getFailLogin = (req, res) => {
  res.render("errorLogin");
};

const postLogin = (req, res) => {
  //res.render("dashboard", { userName: req.user.nombre, email: req.user.email });
  res.redirect("/dashboard");
};

const getSignup = (req, res) => {
  res.render("signup");
};

const postSignup = async (req, res) => {
  const { nombre, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.render("errorSignup", { message: "Usuario ya registrado" });
  }
  let newUser = new User({
    nombre,
    email,
    password,
  });
  newUser.save((err, doc) => {
    if (err) {
      return res.render("errorSignup", {
        message: "Ocurrió un error interno, por favor intente más tarde",
      });
    }
    res.render("successSignup");
  });
};

const getDashBoard = (req, res) => {
  res.render("dashboard", {
    userName: req.user.nombre,
    email: req.user.email,
  });
};

const getLogout = (req, res) => {
  const userName = req.user.nombre;
  req.logout((err) => {
    if (!err) return res.render("logout", { userName });
  });
};

module.exports = {
  getLogin,
  getFailLogin,
  postLogin,
  getSignup,
  postSignup,
  getDashBoard,
  getLogout,
};
