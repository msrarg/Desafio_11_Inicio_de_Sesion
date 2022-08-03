const passport = require("passport");
const local = require("passport-local") 
const User = require("../models/User.js"); 
const { createHash, isValidPassword } = require("../utils/password.js") ;

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { 
                usernameField: 'email',
                passwordField: 'passwd',
                passReqToCallback: true 
            },
            async (req, username, password, done) => {
                try {
                    let user = await User.findOne({ email:username })
                    if (user) return done(null, false)
                    const newUser = {
                        name: req.body.username,
                        password : createHash(password),
                        email: username,
                    }

                    try {
                        let result = await User.create(newUser);
                        return done(null, result);
                    } catch (error) {
                        done(error);
                    }
                } catch(err) {
                    done(err);
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'passwd',
        },
            async (username,password,done) => {
                 try {
                    let user = await User.findOne({ email:username});
                    if (!user) return done(null, false,{message:'No existe'})
                    if (!isValidPassword(user,password)) return done(null, false,{message:'Invalid password'})

                    return done(null, user)
                } catch (error) {
                    done(error);
                }
            }
        )
    )
    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser((id,done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    })
}

module.exports = {
    initializePassport
}
