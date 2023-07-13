const { Massage, Review, Order } = require("../models")
const axios = require('axios')
const { Op } = require("sequelize")

class MassageController {
    static async allMassages(req, res, next) {
        try {
            let opt = {}
            const {search} = req.query
            if(search){
                opt.where = {
                    title:{
                        [Op.iLike] : `%${search}%`
                    }
                }
            }
            const massages = await Massage.findAll(opt)

            res.status(200).json({
                massages
            })


        } catch (err) {
            next(err)
        }
    }

    static async detailMassage(req, res, next) {
        try {
            const { massageId } = req.params
            const massage = await Massage.findByPk(massageId)

            res.status(200).json({
                massage
            })


        } catch (err) {
            next(err)
        }
    }
}

module.exports = MassageController
