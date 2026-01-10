const express = require("express");
const Listing = require("../model/listing");

const listAllPost = async (req,res) =>{
    const allPost = await Listing.find({});
    res.render("listingViews/listing.ejs" , {allPost});
}

const listPost = async (req,res) =>{
    let {id} = req.params;
    let post = await Listing.findById(id);
    res.render("listingViews/showPost.ejs",{post});
}

const listNewPost = (req , res) =>{
    res.render("listingViews/createPost.ejs");
}

const listCreatePost = async (req, res) => {
    let newListing = new Listing(req.body.postInfo);
    await newListing.save();
    res.redirect("/listing");
}

const listEdit = async (req,res) =>{
    const {id} = req.params;
    let post = await Listing.findById(id);
    res.render("listingViews/editPost.ejs" , {post});
}

const listUpdatePost = async (req ,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.postInfo});
    res.redirect(`/listing/${id}`);
}

const listDelete = async (req , res) => {
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);

    console.log("deleted" , deletedListing);

    res.redirect("/listing");

}


module.exports = {listAllPost , listPost , listNewPost , listCreatePost , listEdit , listUpdatePost, listDelete};

