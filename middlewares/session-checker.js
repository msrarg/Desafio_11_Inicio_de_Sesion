const sessionChecker = (req, res, next) => {
    if(req.user && req.cookies.user_sid){
        res.redirect('/dashboard');
    }else{
        next();
    }
}

module.exports = {
    sessionChecker
}