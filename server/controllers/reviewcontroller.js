const { Massage, Review, Order } = require("../models")
const axios = require('axios')


class ReviewController {
    static async getReviews(req, res, next) {
        try {
            const { massageId } = req.params
            const reviews = await Review.findAll({
                where: {
                    MassageId: massageId
                }
            })

            res.status(200).json({
                reviews
            })


        } catch (err) {
            next(err)
        }
    }

    static async addReviews(req, res, next) {
        try {
            const { massageId } = req.params
            const { review, name } = req.body
            const addedReview = await Review.create({
                comment: review, MassageId: massageId, name
            })

            res.status(200).json({
                addedReview
            })


        } catch (err) {
            next(err)
        }
    }

}

module.exports = ReviewController
