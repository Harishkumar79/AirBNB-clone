const express = require("express");
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

// signup
const signUpFormController = wrapAsync( async (req, res) => {
    res.render("users/signup.ejs");
})

const signUpController = wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registerUser = await User.register(newUser, password);
        // console.log("new user ", registerUser);
        req.flash("success", "User created successfully!");
        res.redirect("/listing");
    } catch (err) {
        req.flash("error",err.message);
        res.redirect("/signup");
    }
})

// login
const logInFormController = wrapAsync( async (req, res) => {
    res.render("users/login.ejs");
})

const logInController = wrapAsync(async (req, res) => {
    try {
        req.flash("success", "Welcome back to AirBNB!");
        res.redirect("/listing");
    } catch (err) {
        req.flash("error",err.message);
        res.redirect("/");
    }
})

module.exports = { signUpFormController, signUpController , logInFormController , logInController }