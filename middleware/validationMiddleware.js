const joi = require("joi");
const ExpressError = require("../utils/expressError");

const postInfoSchema = joi.object({
    postInfo: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        img: joi.string().allow("", null),
        price: joi.number().required(),
        location: joi.string().required(),
        country: joi.string().required()
    }).required()
})

const postReviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required()
    }).required()
})

const postInfoValidator = (req, res, next) => {
    const { error } = postInfoSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

const postReviewValidator = (req, res, next) => {
    const { error } = postReviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports = { postInfoValidator , postReviewValidator }