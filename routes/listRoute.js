const express = require("express");
const listController = require("../controller/listingController");
const validate = require("../middleware/validationMiddleware");
const reviewRoute = require("../routes/reviewRoute");
const { isLoggedIn, saveRedirectUrl, isOwner } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const router = express.Router();

router.route("/")
    .get(listController.listAllPost) // show all post
    .post(isLoggedIn, validate.postInfoValidator, upload.single("postInfo[img]"), listController.listCreatePost);  // create post


router.get("/new", isLoggedIn, listController.listNewPost);// create form

router.route("/:id")
    .get(listController.listPost) // show post by id
    .put(saveRedirectUrl, isLoggedIn, isOwner, validate.postInfoValidator, upload.single("postInfo[img]"), listController.listUpdatePost) // update post
    .delete(isLoggedIn, isOwner, listController.listDelete);

router.get("/:id/edit", saveRedirectUrl, isLoggedIn, isOwner, listController.listEdit); // edit form

router.use("/:id/review", reviewRoute);

module.exports = router;