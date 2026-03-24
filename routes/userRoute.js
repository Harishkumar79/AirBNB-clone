const express = require("express");
const userController = require("../controller/userController");
const { saveRedirectUrl } = require("../middleware/authMiddleware");
const passport = require("passport");

const router = express.Router();

router.route("/login")
    .get( userController.logInFormController)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true }), userController.logInController);

router.route("/signup")
    .get( userController.signUpFormController)
    .post( userController.signUpController);

router.get("/logout", userController.logOutController);

module.exports = router;