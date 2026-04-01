const Listing = require("../model/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const axios = require("axios");

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
    let filename = req.file.filename;
    let url = req.file.path;
    let newListing = new Listing(req.body.postInfo);
    newListing.owner = req.user._id;
    newListing.image = { filename, url };
    let address = newListing.location;

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: address,
                format: "json"
            },
            headers: {
                "User-Agent": "airbnb-clone-app" // REQUIRED
            }
        }
    );

    if (!response.data.length) {
        res.flash("error", "Invalid location!");
        return res.render("listingViews/createPost.ejs");
    }

    let lat = response.data[0].lat;
    let lng = response.data[0].lon;

    newListing.geolocation.coordinates = [lng, lat];

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

    let originalImageUrl = post.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_300");
    res.render("listingViews/editPost.ejs", { post, originalImageUrl });
})

const listUpdatePost = wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.postInfo });

    if (typeof req.file !== "undefined") {
        let filename = req.file.filename;
        let url = req.file.path;

        listing.image = { filename, url };
        await listing.save();
    }
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

