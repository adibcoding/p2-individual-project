const { verifyHash, getHash } = require("../helpers/bcrypt")
const { generateToken, verifyToken } = require("../helpers/jsonwebtoken")
const midtransClient = require('midtrans-client')
const { User, Order } = require("../models")
const axios = require('axios')


class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) throw { name: "InvalidInput" }
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) throw { name: "Unauthorized" }

            const passChecked = verifyHash(password, user.password)
            if (!passChecked) throw { name: "Unauthorized" }

            const token = generateToken({
                id: user.id,
                email: user.email
            })

            res.status(200).json({
                access_token: token,
                id: user.id
            })

        } catch (err) {
            next(err)
        }
    }

    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) throw { name: "InvalidInput" }
            const hashedPass = getHash(password)

            const user = await User.create({ email, password: hashedPass })

            res.status(201).json({
                id: user.id,
                email: user.email
            })


        } catch (err) {
            next(err)
        }
    }

    static async githubSign(req, res, next) {
        try {
            const {email} = req.body
            const [user, created] = await User.findOrCreate({
                where: { email},
                defaults: {
                    email: email,
                    password: "12345678"
                },
                hooks: false
            })

            const token = generateToken({
                id: user.id,
                email: user.email
            })

            res.status(200).json({
                access_token: token,
                email: user.email
            })
        } catch (err) {
            next(err)
        }
    }

    static async midtransToken(req, res, next) {
        try {

            const user = await User.findByPk(req.extra.userId)
            const orders = await Order.findAll({
                where: {
                    UserId: req.extra.userId,
                    status: 'Unpaid'
                }
            })
            // add error handling
            if(orders.length == 0) throw {name: "NotFound"}
            console.log(orders)
            let totalPrice = 0
            orders.forEach(el => {
                totalPrice += el.newPrice
            })
            // console.log(totalPrice)
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION" + Math.floor(1_000_000 + Math.random() * 9_000_000),
                    "gross_amount": totalPrice
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": user.email,
                }
            }

            const midtransToken = await snap.createTransaction(parameter)
            console.log(midtransToken, "<<<<<<<<<<")
            res.status(201).json(midtransToken)

        } catch (err) {
            next(err)
        }
    }

    static async sendMail(req, res, next) {
        try {
            const {userId, email} = req.extra

            const {data} = await axios({
                url: `https://pijetyok-91e3.restdb.io/mail`,
                method: 'post',
                headers: {
                    "x-apikey": '903f374df2ee50f12013c1adfd2c94870a4bb',
                    "Cache-Control": "no-cache",
                    Host: 'pijetyok-91e3.restdb.io'
                },
                data: {
                    to: email,
                    subject: 'Massage Payment',
                    html: '<p> Thank you very much for purchasing the best massage in this universe has ever known, please never stop coming here',
                    company: 'Pijetyok',
                    sendername: 'Muhammad Adib Hasany - CEO/Founder of PijetYok'
                }
            })

            res.status(200).json(data)

            console.log(data)


        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController

