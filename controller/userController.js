const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

// signup
const signUpFormController = wrapAsync(async (req, res) => {
    res.render("users/signup.ejs");
})

const signUpController = wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser , (err) => {
            if (err) {
               return next(err);
            }
            req.flash("success", "Welcome to AirBNB!");
            res.redirect("/listing");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/user/signup");
    }
})

// login
const logInFormController = wrapAsync(async (req, res) => {
    res.render("users/login.ejs");
})

const logInController = wrapAsync(async (req, res) => {
    try {
        req.flash("success", "Welcome back to AirBNB!");
        let redirectUrl = res.locals.redirectUrl || "/listing"
        res.redirect( redirectUrl );
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/");
    }
})

//logout
const logOutController = wrapAsync(async (req, res, next) => {
    try {
        if(req.user){
           req.logout((err) => {
            if (err) {
               return next(err);
            }
            req.flash("success", "Logout successfully!");
            res.redirect("/listing");
        }) 
        }else{
            throw new Error("User already logout");
        }
        
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/");
    }
})

module.exports = { signUpFormController, signUpController, logInFormController, logInController, logOutController }