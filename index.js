const express = require("express");
const path = require("path");
const mongodb = require("./config/db");
const listingRoute = require("./routes/listRoute");
const methodOverride = require('method-override');
const ExpressError = require("./utils/expressError");

const engine = require("ejs-mate");



const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine("ejs" , engine);

app.use(express.static(path.join(__dirname , "/public")));

mongodb();
const PORT = 5000;

app.listen(PORT , ()=>{
    console.log(`server listening at port :${PORT}`);
});

app.set("view engine" , "ejs");

app.set("views" , path.join(__dirname , "/views"));

app.use("/" , listingRoute);

app.use((req , res , next)=>{
    next(new ExpressError( 404 ,"Page not found!"));
})

app.use((err, req , res, next)=>{
    const {statusCode = 500 , message = "something went wrong!" } = err;
    res.status(statusCode).send(message);
})
