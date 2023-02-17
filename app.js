
//import library
const express = require('express')
const cors = require('cors')
const path = require("path")
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cookiParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express")


//create app server using express
const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



// import route for api
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const cart = require('./routes/cartRoute')




// increase limit file upload request
app.use(express.json({
  limit: '50mb'
}))
app.use(cookiParser())
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}))
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

// middleware
app.use(fileUpload())
app.use(cors(corsOptions))

//api
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", cart)




// all of code for route defalut
app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware error hander 
app.use(errorMiddleware)

module.exports = app