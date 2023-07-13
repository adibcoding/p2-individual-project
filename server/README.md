## Endpoints

List of Available Endpoints:
- `POST /login`
- `POST /register`
- `POST /githubSign`
- `GET /massages`
- `GET /massages/:massageId`
- `GET /massages/:massageId/reviews`
- `POST /massages/:massageId/reviews`
- `GET /sendMail`
- `GET /orders`
- `POST /orders/:massageId`
- `POST /generateMToken`
- `PATCH /patchOrders`
- `DELETE /orders/:id`

All Errors are handled at a single place

### POST /login
#### Description
- Users loggin in

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
        {
          "email": "String",
          "password": "String",
        }
    ```
#### Response
_200 - login success_
- Body
    ```json
    {
      "access_token": "String",
      "id": "Integer",
    }
    ```


### POST /register
#### Description
- Users registering

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
        {
          "email": "String",
          "password": "String",
        }
    ```
#### Response
_201 - User registered successfully_
- Body
    ```json
    {
      "id": "Integer",
      "email": "String"
    }
    ```

### POST /githubSign
#### Description
- Sign in with github

#### Request
- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
- Body
    ```json
        {
          "email": "String"
        }
    ```
#### Response
_200 - User logged in with github_
- Body
    ```json
    {
      "access_token": "String",
      "email": "String"
    }
    ```




### GET /massages
#### Description
- Get all massages list

#### Request
- Params
    ```json
    {
      "search": "String"
    }

#### Response
_200 - OK_

- Body
    ```json
    {
      "massages": [
        {
          "id": "Integer",
          "title": "String",
          "duration": "String",
          "price": "String",
          "imgUrl": "String",
          "description": "Integer",
          "createdAt": "Date",
          "updatedAt": "Date"
        },
        ```
      ]
    }
    ```


### GET /massages/:massageId
#### Description
- Get massage detail by id

#### Response
_200 - OK_

- Body
    ```json
    {
      "massage": 
        {
          "id": "Integer",
          "title": "String",
          "duration": "String",
          "price": "String",
          "imgUrl": "String",
          "description": "Integer",
          "createdAt": "Date",
          "updatedAt": "Date"
        }
    }
    ```

### GET /massages/:massageId/reviews
#### Description
- Get all reviews belong to a specific massage

#### Response
_200 - OK_

- Body
    ```json
    {
      "reviews": [
        {
          "id": "Integer",
          "name": "String",
          "comment": "String",
          "MassageId": "String",
          "createdAt": "Date",
          "updatedAt": "Date"
        },
        ```
      ]
    }
    ```




### POST /massages/:massageId/reviews
#### Description
- Create reviews belonging to a specific massage

#### Request

- Body
    ```json
        {
          "name": "String",
          "review": "String",
        }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "addedReview": {
          "id": "Integer",
          "name": "String",
          "comment": "String",
          "MassageId": "Integer",
          "createdAt": "Date",
          "updatedAt": "Date",
        }
    }
    ```

### GET /sendMail
#### Description
- Send email notification upon successful payment

#### Request
- Headers
    ```json
    {
      "access_token": "String"
    }

#### Response
_200 - OK_

- Body
    ```json
    {
      "result": [
        {
          "email_outbound_id": "String",

        },
      ],
      "warning": "For development plan: Max 2 emails in arrays, no templates, no Gmail transport. Upgrade plan for these features."
    }
    ```


### GET /orders
#### Description
- Get all orders belonging to each user

#### Request
- Headers
    ```json
    {
      "access_token": "String"
    }


#### Response
_200 - OK_

- Body
    ```json
    {
      "orders": [
        {
          "id": "Integer",
          "UserId": "Integer",
          "MassageId": "Integer",
          "location": "String",
          "newPrice": "String",
          "status": "String",
          "bookingDate": "Date",
          "createdAt": "Date",
          "updatedAt": "Date"
        },
        ```
      ]
    }
    ```

### POST /orders/:massageId
#### Description
- Create order depending on massage chosen

#### Request
- Headers
    ```json
    {
      "access_token": "String"
    }

- Body
    ```json
    {
      "location": "String",
      "bookingDate": "Date"
    }

#### Response
_201 - Created_

- Body
    ```json
    {
      "addedOrder": 
        {
          "id": "Integer",
          "UserId": "Integer",
          "MassageId": "Integer",
          "location": "String",
          "newPrice": "Integer",
          "status": "String",
          "bookingDate": "Date",
          "createdAt": "Date",
          "updatedAt": "Date"
        },
 
    }
    ```

### POST /generateMToken
#### Description
- Create midtrans token for transaction and payment

#### Request
- Headers
    ```json
    {
      "access_token": "String"
    }


#### Response
_201 - Created_

- Body
    ```json
    {
      "token": "String" 
       
    }
    ```

### PATCH /patchOrders
#### Description
- Change status of orders to paid once payment is made

#### Request
- Headers
    ```json
    {
      "access_token": "String"
    }


#### Response
_200 - Updated_

- Body
    ```json
    {
      "orders": "String" 
       
    }
    ```


### DELETE /orders/:id
#### Description
- Delete an order

#### Request
- Headers
    ```json
    {
      "access_token": "String"
    }

#### Response
_200 - OK_
- Body
    ```json
    {
      "order": "String"

    }
    ```

### Error Handler

#### Response
_400_ - Invalid Input
- Body
    ```json
    {
      "message": "Invalid input"
    }
    ```


#### Response
_400_ - Sequelize Validation Error
- Body
    ```json
    {
      "message": "Errors in array"
    }
    ```



#### Response
_401_ - Unauthorized
- Body
    ```json
    {
      "message": "Invalid Email/Password"
    }
    ```



#### Response
_401_ - Invalid Token
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    ```




#### Response
_401_ - JSON Web Token Error
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    ```



#### Response
_403_ - Forbidden
- Body
    ```json
    {
      "message": "Unauthorized"
    }
    ```


#### Response
_404_ - Not Found
- Body
    ```json
    {
      "message": "Not Found"
    }
    ```



#### Response
_409_ - Sequelize Unique Constrain Error
- Body
    ```json
    {
      "message": "Email in use"
    }
    ```


#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

