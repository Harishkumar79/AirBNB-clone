const { ref } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=60"
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
    ]
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;