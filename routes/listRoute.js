const express = require("express");
const listController = require("../controller/listingController");

const router = express.Router();

router.get("/" , (req,res)=>{
    res.render("listingViews/home.ejs");
})

router.get("/listing", listController.listAllPost); // show all post
router.get("/listing/new", listController.listNewPost);// create form
router.get("/listing/:id", listController.listPost); // show post by id

router.post("/listing", listController.listCreatePost);  // create post
router.get("/listing/:id/edit",listController.listEdit); // edit form
router.put("/listing/:id" , listController.listUpdatePost) // update post
router.delete("/listing/:id", listController.listDelete); // delete post

module.exports = router;