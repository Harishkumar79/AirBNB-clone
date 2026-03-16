const express = require("express");
const listController = require("../controller/listingController");
const userController = require("../controller/userController");
const validate = require("../middleware/validationMiddleware");
const {isLoggedIn , saveRedirectUrl , isOwner , isAuthor} = require("../middleware/authMiddleware");
const passport = require("passport");

const router = express.Router();

router.get("/" , (req,res)=>{
    res.render("listingViews/home.ejs");
})

router.get("/signup" , userController.signUpFormController);
router.post("/signup" , userController.signUpController);

router.get("/login" , userController.logInFormController);
router.post("/login" , saveRedirectUrl , passport.authenticate('local', { failureRedirect: '/login' , failureFlash : true }) , userController.logInController);

router.get("/logout" , userController.logOutController );


router.get("/listing", listController.listAllPost); // show all post
router.get("/listing/new", isLoggedIn  ,listController.listNewPost);// create form
router.get("/listing/:id", listController.listPost); // show post by id

router.post("/listing" , isLoggedIn , validate.postInfoValidator , listController.listCreatePost);  // create post
router.post("/listing/:id/review" , saveRedirectUrl , isLoggedIn , validate.postReviewValidator ,  listController.postReview ); // create review

router.get("/listing/:id/edit" , saveRedirectUrl , isLoggedIn , isOwner ,listController.listEdit); // edit form
router.put("/listing/:id" , saveRedirectUrl , isLoggedIn , isOwner , validate.postInfoValidator , listController.listUpdatePost) // update post
router.delete("/listing/:id/review/:reviewId" , isLoggedIn , isAuthor , listController.postReviewDelete) // delete review
router.delete("/listing/:id", isLoggedIn , isOwner , listController.listDelete); // delete post

module.exports = router;