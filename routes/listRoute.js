const express = require("express");
const listController = require("../controller/listingController");
const validate = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/" , (req,res)=>{
    res.render("listingViews/home.ejs");
})

router.get("/listing", listController.listAllPost); // show all post
router.get("/listing/new", listController.listNewPost);// create form
router.get("/listing/:id", listController.listPost); // show post by id

router.post("/listing", validate.postInfoValidator , listController.listCreatePost);  // create post
router.post("/listing/:id/review" , validate.postReviewValidator ,  listController.postReview );
router.get("/listing/:id/edit",listController.listEdit); // edit form
router.put("/listing/:id" , validate.postInfoValidator , listController.listUpdatePost) // update post
router.delete("/listing/:id", listController.listDelete); // delete post

module.exports = router;