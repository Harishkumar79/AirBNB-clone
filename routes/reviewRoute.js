const express = require("express");
const reviewController = require("../controller/reviewController");
const validate = require("../middleware/validationMiddleware");
const {isLoggedIn , saveRedirectUrl , isAuthor} = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

router.post("/" , saveRedirectUrl , isLoggedIn , validate.postReviewValidator ,  reviewController.postReview ); // create review
router.delete("/:reviewId" , isLoggedIn , isAuthor , reviewController.postReviewDelete) // delete review

module.exports = router;