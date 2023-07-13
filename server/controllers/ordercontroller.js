const { Massage, Review, Order } = require("../models")
const axios = require('axios')

class OrderController {
    static async addOrder(req, res, next) {
        try {
            const massagePlaceId = 'ChIJM0UM1tP7aS4RPnXE-w_JPW0'
            const { massageId } = req.params
            const { userId } = req.extra
            const { location, bookingDate } = req.body
            const { data } = await axios({
                url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBKvc3oQF8Ef0yLOGXbL9-hHyvLc-LVfyc`,
                method: 'GET'
            })
            console.log(data)
            if(!data.results[0].place_id) throw {name: "NotFound"}

            const { data: distance } = await axios({
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${massagePlaceId}&destinations=place_id:${data.results[0].place_id}&key=AIzaSyBKvc3oQF8Ef0yLOGXbL9-hHyvLc-LVfyc`
            })
            console.log(distance.rows[0].elements[0].distance.value) //this is the distance
            console.log(data)
            console.log(data.results[0].geometry)

            const massage = await Massage.findByPk(massageId)
            let totalDist = distance.rows[0].elements[0].distance.value
            let newPrice = massage.price + (Math.ceil(totalDist / 1000) * 2000)


            const addedOrder = await Order.create({
                UserId: userId, MassageId: massageId, status: 'Unpaid', newPrice, location, bookingDate
            })
            console.log(addedOrder)
            res.status(200).json({
                addedOrder
            })


        } catch (err) {
            next(err)
        }
    }

    static async getOrders(req, res, next) {
        try {
            const { userId } = req.extra
            const orders = await Order.findAll({
                where: {
                    UserId: userId
                },
                include: {
                    model: Massage
                }
            })


            res.status(200).json({
                orders
            })


        } catch (err) {
            next(err)
        }
    }

    static async patchOrders(req, res, next) {
        try {
            const { userId } = req.extra
            console.log("update", "<<<<<<<<<<<<<<<<<<<");
            const orders = await Order.update({ status: "Paid" }, {
                where: {
                    UserId: userId,
                    status: 'Unpaid'
                }
            })

            console.log("setelah update", "<<<<<<<<<<<<<<<");

            res.status(200).json({
                orders
            })


        } catch (err) {
            next(err)
        }
    }

    static async deleteOrders(req, res, next) {
        try {
            const { userId } = req.extra
            const {id} = req.params
            
            const order = await Order.findByPk(id)
            if(!order) throw {name: 'NotFound'} 

            if (order.UserId != userId) throw {name: 'Forbidden'}

            await Order.destroy({
                where:{
                    id
                }
            })
            res.status(200).json({
                order
            })


        } catch (err) {
            next(err)
        }
    }




}

module.exports = OrderController
