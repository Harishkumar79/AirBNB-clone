const { ref } = require("joi");
const mongoose = require("mongoose");
const Review = require("./Review");

const { Schema } = mongoose;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        filename: {
            type: String
        },
        url: {
            type: String
        }
    },
    price: { type: Number },
    location: { type: String },
    country: { type: String },

    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ] ,

    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

listingSchema.post("findOneAndDelete" , async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;