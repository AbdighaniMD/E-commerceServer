# **E-commerce API Application**

## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, JWT

# API FEATURES

- Implementing user authentication and authorization
- Implementing Brand, Order, Categories, Review and Product management
- Admin process for managing orders
- Order statistics and analysis
- Pagination and Filtering techniques
- Payment integration using Stripe
- Payment webHook handling
- API Documentation

# ENDPOINTS

- [API Authentication](#API-Authentication)
  - [ Register a new API client](#Register-a-new-API-client)
  - [Login](#User-Login)

- [User](#api)
  - [Profile](#User-Profile)
  - [Update user](#Update-User)
  - [Update shipping addres](#Update-Shipping-Addres)

- [Brand](#Brand-API-Refeference)
  - [Create Brand](#Create-Brand)
  - [Get All brand](#Get-All-Brand)
  - [Get Single brand](#Get-A-Brand)
  - [Update brand](#Update-Brand)
  - [Delete brand](#Delete-Brand)

- [Category](#Category-API-Refeference)
  - [Create category](#Create-Category)
  - [Get all categories](#Get-All-Categories)
  - [Get single category ](#Get-A-Category)
  - [Update category](#Update-Category)
  - [Delete category](#Delete-Category)

- [Product](#Product-API-Refeference)
  - [Create Product](#Create-Product)
  - [Get all Products](#Get-All-Products)
  - [Get single Product ](#Get-A-Product)
  - [Update Product](#Update-Product)
  - [Delete Product](#Delete-Product)

- [Order](#Order-API-Refeference)
  - [Create Order](#Create-Order)
  - [Get all Orders](#Get-All-Orders)
  - [Get single Order ](#Get-A-Order)
  - [Update Order](#Update-Order)
  - [Order-Stats](#Get-Order-Stats)

- [Review](#Review-API-Reference)
  - [Create review](#Create-Review)

## Run Locally

Clone the project

```bash
  git clone https://github.com/AbdighaniMD/E-commerceServer.git  
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`JWT_SECRET`
`JWT_LIFETIME`

`PORT`

`STRIPE_KEY`
`STRIPE_ENDPOINTSEECRET`

`cloudinary_CLOUD_NAME`
`cloudinary_API_KEY`
`cloudinary_API_SECRET_KEY`

##### baseURL = `#`

# API Authentication

Some endpoints may require authentication for example. To create a create/delete/update Brand, you need to register your API client and obtain an access token.

The endpoints that require authentication expect a bearer token sent in the `Authorization header`.

**Example**:

`Authorization: Bearer YOUR TOKEN`

## Register a new API client

```http
POST /api/v1/users/register
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `fullname`       | `string` | Your fullname | yes      |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |

The request body needs to be in JSON format.

Example request body:

```javascript
{
    "fullname":"Your Full name", 
    "email": "Your email",
    "password":"your password"
}
```

# **API Reference**

## **User Login**

```http
POST /api/v1/users/login
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |

Example request body:

```javascript
{
  "email":"your email"
  "password":"your password"
}
```

## **User Profile**

```http
GET /api/v1/users/profile
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |

## **Update User**

```http
PUT /api/v1/users//profile/update/:id
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |
| `name`           | `string` | User id     | yes      |
| `admin`          | `string` | is an Admin | yes      |

Example request body:

```javascript
{
  "admin":"boolean"
}
```
## **Update Shipping Addres**

```http
PUT /api/v1/users/update/shipping
```

| Parameter        | Type     | Description      | Required |
| :--------------- | :------- | :----------------|----------|
| `authentication` | `string` | Your token       | yes      |
| `firstName`      | `string` | Your firstName   | yes      |
| `lastName`       | `string` | Your lastName    | yes      |
| `addres`         | `string` | Your addres      | yes      |
| `city`           | `string` | Your city        | yes      |
| `postalCode`     | `string` | Your postalCode  | yes      |
| `province`       | `string` | Your province    | yes      |
| `phone`          | `string` | Your phone       | yes      |
| `country`        | `string` | Your country     | yes      |

Example request body:

```javascript
{
    "firstName":"value",
    "lastName":"value",
    "address":"value",
    "city":"value", 
    "postalCode":"value",
    "province":"value",
    "phone":"value",
    "country":"value"
}
```

# **Brand API Refeference**

## **Create Brand**

```http
POST /api/v1/brands
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :---------------| :------- |
| `authentication` | `string` | Your token      | yes      |
| `name`           | `string` | Your brand name | yes      |

```javascript
{
    "name":"value",
}
```

## **Get All Brand**

```http
GET /api/v1/brands
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |


## **Get A Brand**

```http
GET /api/v1/brands/:id
```

| Parameter        | Type     | Description      | Required |
| :--------------- | :------- | :----------------| :------- |
| `authentication` | `string` | Your token       | yes      |
| `id`             | `string` | Enter brand id   | yes      |


## **Update Brand**

```http
PUT /api/v1/brands/:id
```
| Parameter        | Type     | Description      | Required |
| :--------------- | :------- | :----------------| :------- |
| `authentication` | `string` | Your token       | yes      |
| `id`             | `string` | Enter brand id   | yes      |
| `name`           | `string` | Your brand name  | yes      |

```javascript
{
    "name":"value",
}
```

## **Delete Brand**

```http
DELETE /api/v1/brands/:id
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :---------------| :------- |
| `authentication` | `string` | Your token      | yes      |
| `id`             | `string` | Enter brand id  | yes      |


# **Category-API-Refeference**

## **Create Category**

```http
POST /api/v1/categories
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :---------------| :------- |
| `authentication` | `string` | Your token      | yes      |
| `name`           | `string` | Your brand name | yes      |

```javascript
{
    "name":"value",
}
```

## **Get All Categories**

```http
GET /api/v1/categories
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |


## **Get A Category**

```http
GET /api/v1/categories/:id
```

| Parameter        | Type     | Description      | Required |
| :--------------- | :------- | :----------------| :------- |
| `authentication` | `string` | Your token       | yes      |
| `id`             | `string` | Enter category id| yes      |


## **Update Category**

```http
PUT /api/v1/categories/:id
```
| Parameter        | Type     | Description         | Required |
| :--------------- | :------- | :-------------------| :------- |
| `authentication` | `string` | Your token          | yes      |
| `id`             | `string` | Enter category id   | yes      |
| `name`           | `string` | Your category name  | yes      |

```javascript
{
    "name":"value",
}
```

## **Delete Category**

```http
DELETE /api/v1/categories/:id
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :---------------| :------- |
| `authentication` | `string` | Your token      | yes      |
| `id`             | `string` | Enter brand id  | yes      |


# **Product API Refeference**

## **Create Product**

```http
POST /api/v1/products
```

| Parameter        | Type     | Description         | Required |
| :--------------- | :------- | :-------------------| :------- |
| `authentication` | `string` | Your token          | yes      |
| `name`           | `string` | product name        | yes      |
| `description`    | `string` | product description | yes      |
| `category`       | `string` | product category    | yes      |
| `sizes`          | `string` | product sizes       | yes      |
| `colors`         | `string` | product colors      | yes      |
| `price`          | `string` | product price       | yes      |
| `totalQty`       | `string` | product total Qty   | yes      |
| `image`          | `string` | product image       | yes      |
| `brand`          | `string` | product brand       | yes      |


```javascript
{
    "name" : "value",
    "description": "value",
    "category":"value", 
    "sizes":"value",
    "colors":"value",
    "price": 0,
    "totalQty": 0,
    "image":"value",
    "brand": "value"
}
```

## **Get All products**

```http
GET /api/v1/products
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |


## **Get A Product**

```http
GET /api/v1/products/:id
```

| Parameter        | Type     | Description      | Required |
| :--------------- | :------- | :----------------| :------- |
| `authentication` | `string` | Your token       | yes      |
| `id`             | `string` | Enter Product id | yes      |


## **Update Product**

```http
PUT /api/v1/products/:id
```
| Parameter        | Type     | Description         | Required |
| :--------------- | :------- | :-------------------| :------- |
| `authentication` | `string` | Your token          | yes      |
| `id`             | `string` | Enter product id    | yes      |
| `name`           | `string` | product name        | yes      |
| `description`    | `string` | product description | yes      |
| `category`       | `string` | product category    | yes      |
| `sizes`          | `string` | product sizes       | yes      |
| `colors`         | `string` | product colors      | yes      |
| `price`          | `string` | product price       | yes      |
| `totalQty`       | `string` | product total Qty   | yes      |
| `image`          | `string` | product image       | yes      |
| `brand`          | `string` | product brand       | yes      |

```javascript
{
    "name" : "value",
    "description": "value",
    "category":"value", 
    "sizes":"value",
    "colors":"value",
    "price": 0,
    "totalQty": 0,
    "image":"value",
    "brand": "value"
}
```

## **Delete Product**

```http
DELETE /api/v1/products/:id
```

| Parameter        | Type     | Description       | Required |
| :--------------- | :------- | :-----------------| :------- |
| `authentication` | `string` | Your token        | yes      |
| `id`             | `string` | Enter Product id  | yes      |


# **Order API Refeference**

## **Create Order**

```http
POST /api/v1/orders
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :---------------| :------- |
| `authentication` | `string` | Your token      | yes      |
| `id`             | `string` | Product id      | yes      |
| `orderItems`     | `string` | Your orders     | yes      |
| `shippingAddress`| `string` | Your addres     | no       |
| `totalPrice`     | `string` | Your total Price| yes      |


```javascript
{
    "orderItems":[{
        "id":"value",
        "name":"value",
        "description":"value",
        "totalQty": 0,
        "totalQtyBuy":0,
        "price":100
    }],
    "shippingAddress":{
        "firstName":"value",
        "Address":"value"
    },
    "totalPrice":0
}
```

## **Get All Orders**

```http
GET /api/v1/orders
```

| Parameter        | Type     | Description | Required |
| :--------------- | :------- | :---------- | :------- |
| `authentication` | `string` | Your token  | yes      |


## **Get A Order**

```http
GET /api/v1/orders/:id
```

| Parameter        | Type     | Description      | Required |
| :--------------- | :------- | :----------------| :------- |
| `authentication` | `string` | Your token       | yes      |
| `id`             | `string` | Enter orders id  | yes      |


## **Update Order**

```http
PUT /api/v1/orders/:id
```
| Parameter        | Type     | Description         | Required |
| :--------------- | :------- | :-------------------| :------- |
| `authentication` | `string` | Your token          | yes      |
| `id`             | `string` | Enter Order id      | yes      |
| `status`         | `string` | Your Order stats    | yes      |

```javascript
{
    "status":"value:['pending', 'processing', 'shipped', 'delivered']"
}
```

## **Get Order Stats**

```http
GET /api/v1/orders/sales/stats
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :---------------| :------- |
| `authentication` | `string` | Your token      | yes      |


# **Review API Reference**

## **Create Review**

```http
POST /api/v1/reviews
```

| Parameter        | Type     | Description     | Required |
| :--------------- | :------- | :---------------| :------- |
| `authentication` | `string` | Your token      | yes      |
| `id`             | `string` | Enter Product id| yes      |
| `message`        | `string` | Your message    | yes      |
| `rating`         | `string` | Your rating     | yes      |

```javascript
{
    "message":"value",
    "rating":0
}
```

## Author

- [@AbdighaniMD](https://github.com/AbdighaniMD)