const express = require("express");
const listController = require("../controller/listingController");
const userController = require("../controller/userController");
const validate = require("../middleware/validationMiddleware");
const passport = require("passport");

const router = express.Router();

router.get("/" , (req,res)=>{
    res.render("listingViews/home.ejs");
})

router.get("/signup" , userController.signUpFormController);
router.post("/signup" , userController.signUpController);

router.get("/login" , userController.logInFormController);
router.post("/login" , passport.authenticate('local', { failureRedirect: '/login' , failureFlash : true }) , userController.logInController);


router.get("/listing", listController.listAllPost); // show all post
router.get("/listing/new", listController.listNewPost);// create form
router.get("/listing/:id", listController.listPost); // show post by id

router.post("/listing", validate.postInfoValidator , listController.listCreatePost);  // create post
router.post("/listing/:id/review" , validate.postReviewValidator ,  listController.postReview ); // create review

router.get("/listing/:id/edit",listController.listEdit); // edit form
router.put("/listing/:id" , validate.postInfoValidator , listController.listUpdatePost) // update post
router.delete("/listing/:id/review/:reviewId" , listController.postReviewDelete) // delete review
router.delete("/listing/:id", listController.listDelete); // delete post

module.exports = router;