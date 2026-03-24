const Listing = require("../model/listing");
const wrapAsync = require("../utils/wrapAsync.js");

const listAllPost = wrapAsync(async (req, res) => {
    const allPost = await Listing.find({});
    res.render("listingViews/listing.ejs", { allPost });
})

const listPost = wrapAsync(async (req, res) => {
    let { id } = req.params;
    let post = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!post) {
        req.flash("error", "Listing that your are trying to access doesn't exits or deleted!");
        return res.redirect("/listing");
    }
    res.render("listingViews/showPost.ejs", { post });
})

const listNewPost = (req, res) => {
    res.render("listingViews/createPost.ejs");
}

const listCreatePost = wrapAsync(async (req, res) => {
    // console.log(req.body);
    let newListing = new Listing(req.body.postInfo);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing Add Successfully!");
    res.redirect("/listing");
});


const listEdit = wrapAsync(async (req, res) => {
    const { id } = req.params;
    let post = await Listing.findById(id);
    if (!post) {
        req.flash("error", "Listing that your are trying to edit doesn't exits or deleted!");
        return res.redirect("/listing");
    }
    res.render("listingViews/editPost.ejs", { post });
})

const listUpdatePost = wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.postInfo });
    req.flash("success", "listing Updated Successfully!");
    res.redirect(`/listing/${id}`);
})

const listDelete = wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listing");
})

module.exports = { listAllPost, listPost, listNewPost, listCreatePost, listEdit, listUpdatePost, listDelete };

