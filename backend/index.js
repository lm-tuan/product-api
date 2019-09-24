require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require('cors');
var expressSession = require('express-session');


const productRoute = require("./routes/product.route");
const authtRoute = require("./routes/auth.route");

const app = express();
const port = process.env.PORT || 5000;
app.use(expressSession({secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false}));

const test = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
app.use(cors())
app.options('*', cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/product",productRoute);
app.use("/auth",authtRoute);

app.listen(port, () => {
    console.log(`app runing to ${port}`);
})