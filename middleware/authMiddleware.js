const Listing = require("../model/listing");
const Review = require("../model/Review");

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You need to be logged-in!");
        return res.redirect("/user/login");
    }
    next();
}

const saveRedirectUrl = (req ,res , next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}

const isOwner = async (req ,res , next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" , "You have no access to this!");
        return res.redirect(`/listing/${id}`);
    }

    next();
}

const isAuthor = async (req , res , next) =>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error" , "You have no access to this!");
        return res.redirect(`/listing/${id}`);
    }

    next();
}

module.exports = {isLoggedIn , saveRedirectUrl , isOwner , isAuthor}