# product-api
An ecommerce backend server capable of handling users, products , cart , advanced search , authentication & authorization 

## Tech stack used 
 Nodejs
 Express js 
 MongoDB 
 Jsonweb tokens
 Npm
 
 ## How to get started 
 - Clone the repo
 ```
 git clone https://github.com/kumar-kalyan/product-api.git
 
 cd product-api 
 
 npm install
 
 ```
 - create `.env `file in the root dicrectory and add enironment variables 
 
 ```
 DB_CONNECTION=mongodb://localhost:27017/product-api
 PORT=5000
 SECRET_KEY=SecretKey
 ACCESS_TOKEN_SECRET=TokenSecret 
 ```
 - **Start the server** 
 
 ```
 npm run dev 
 ```
 
 ## API routes
 
 Authentication 
 
 ```
 /api/auth/register 
 
 /api/auth/login
 
 ```
 
 Products 
 ```
 Get all / Post 
 /api/products/
 
 Put/delete/get
 
 /api/products/:id
 
 ```
 
 Orders
 
 ```
 Getall 
 /api/orders/
 
 admin post 
 /api/orders/:id
 
 
users post/put/ update/ delete
 
 /api/orders/users/
 ```
 Cart
 ```
 Get & post
 /api/cart/
 
 users
 
 /api/cart/users/:id
 ```
