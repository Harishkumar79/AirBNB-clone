const Listing = require("../model/listing");
const Review = require("../model/Review");
const wrapAsync = require("../utils/wrapAsync.js");

// add review
const postReview = wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listing");
    }
    let review = new Review(req.body.review);
    review.author = req.user._id;
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    req.flash("success", "Review Added Successfully!");
    res.redirect(`/listing/${listing._id}`);
})


// delete review

const postReviewDelete = wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully!");
    res.redirect(`/listing/${id}`);
})

module.exports = { postReview, postReviewDelete };
