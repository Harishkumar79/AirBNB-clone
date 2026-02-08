const express = require("express");
const Listing = require("../model/listing");
const Review = require("../model/Review");
const wrapAsync = require("../utils/wrapAsync.js");

const listAllPost = wrapAsync(async (req,res) =>{
    const allPost = await Listing.find({});
    res.render("listingViews/listing.ejs" , {allPost});
})

const listPost = wrapAsync(async (req,res) =>{
    let {id} = req.params;
    let post = await Listing.findById(id).populate("reviews");
    res.render("listingViews/showPost.ejs",{post});
})

const listNewPost = (req , res) =>{
    res.render("listingViews/createPost.ejs");
}

const listCreatePost = wrapAsync(async (req, res) => {
    console.log(req.body);
    let newListing = new Listing(req.body.postInfo);
    await newListing.save();
    res.redirect("/listing");
});

// add review
const postReview = wrapAsync(async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);

    listing.reviews.push(review);

    await review.save();
    await listing.save();

    console.log("review added");

    res.redirect(`/listing/${listing._id}`);
})


// delete review

const postReviewDelete = wrapAsync( async(req,res)=>{
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id , { $pull : {reviews : reviewId}});

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
})


const listEdit = wrapAsync(async (req,res) =>{
    const {id} = req.params;
    let post = await Listing.findById(id);
    res.render("listingViews/editPost.ejs" , {post});
})

const listUpdatePost = wrapAsync(async (req ,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.postInfo});
    res.redirect(`/listing/${id}`);
})

const listDelete = wrapAsync(async (req , res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})


module.exports = {listAllPost , listPost , listNewPost , listCreatePost  , postReview , listEdit , listUpdatePost, postReviewDelete , listDelete};

