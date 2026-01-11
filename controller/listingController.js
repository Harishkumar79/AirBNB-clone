const express = require("express");
const Listing = require("../model/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");

const listAllPost = wrapAsync(async (req,res) =>{
    const allPost = await Listing.find({});
    res.render("listingViews/listing.ejs" , {allPost});
})

const listPost = wrapAsync(async (req,res) =>{
    let {id} = req.params;
    let post = await Listing.findById(id);
    res.render("listingViews/showPost.ejs",{post});
})

const listNewPost = (req , res) =>{
    res.render("listingViews/createPost.ejs");
}

const listCreatePost = wrapAsync(async (req, res) => {
    console.log('req.body.postInfo', req.body);
    if(!req.body){
        throw new ExpressError(400 , "Send valid data for listing!");
    }
    let newListing = new Listing(req.body.postInfo);
    await newListing.save();
    res.redirect("/listing");
});

const listEdit = wrapAsync(async (req,res) =>{
    const {id} = req.params;
    let post = await Listing.findById(id);
    res.render("listingViews/editPost.ejs" , {post});
})

const listUpdatePost = wrapAsync(async (req ,res) => {
    if(!req.body){
        throw new ExpressError(400 , "Send valid data to update!");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.postInfo});
    res.redirect(`/listing/${id}`);
})

const listDelete = wrapAsync(async (req , res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
})


module.exports = {listAllPost , listPost , listNewPost , listCreatePost , listEdit , listUpdatePost, listDelete};

