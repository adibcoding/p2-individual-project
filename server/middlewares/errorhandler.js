const errorHandler = (err, req, res, next) => {
    console.log(err)
    let statusCode = 500

    switch (err.name) {
        case "InvalidInput":
            statusCode = 400
            res.status(statusCode).json({
                message: "Invalid input"
            })
            break
        case "SequelizeValidationError":
            statusCode = 400

            const errArr = err.errors.map(el => {
                return el.message
            })
            let message = errArr
            res.status(statusCode).json({
                message
            })


            break
        case "Unauthorized":
            statusCode = 401
            res.status(statusCode).json({
                message: "Invalid Email/Password"
            })
            break

        case "InvalidToken":
            statusCode = 401
            res.status(statusCode).json({
                message: "Invalid Token"
            })
            break
        case "JsonWebTokenError":
            statusCode = 401
            res.status(statusCode).json({
                message: "Invalid token"
            })
            
            break
        case "Forbidden":
            statusCode = 403
            res.status(statusCode).json({
                message: "Unauthorized"
            })
            break
        case "NotFound":
            statusCode = 404
            res.status(statusCode).json({
                message: "Not Found"
            })
            break
        case "SequelizeUniqueConstraintError":
            statusCode = 409
            res.status(statusCode).json({
                message : "Email in use"
            })
            break
        default:
            res.status(statusCode).json({
                message: "Internal Server Error"
            })
            break
    }
}

module.exports = errorHandler