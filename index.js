const express = require("express");
const path = require("path");
const mongodb = require("./config/db");
const methodOverride = require('method-override');
const ExpressError = require("./utils/expressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");
const listingRoute = require("./routes/listRoute");
const userRoute = require("./routes/userRoute");
const engine = require("ejs-mate");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine("ejs" , engine);

app.use(express.static(path.join(__dirname , "/public")));

const sessionOptions = {
    secret : "mysecretkey",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() * 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

mongodb();
const PORT = 5000;

app.listen(PORT , ()=>{
    console.log(`server listening at port :${PORT}`);
});

app.set("view engine" , "ejs");

app.set("views" , path.join(__dirname , "/views"));


// app.get("/demouser", async (req,res)=>{
//     let fakeUser = new User({
//         email : "demo@gmail.com",
//         username : "fakeuser"
//     })

//     let registerUser = await User.register(fakeUser , "abcd");
//     res.send(registerUser);
// })

app.get("/", (req, res) => {
    res.render("listingViews/home.ejs");  // home route
});

app.use("/user" , userRoute);
app.use("/listing" , listingRoute);


app.use((req , res , next)=>{
    next(new ExpressError( 404 ,"Page not found!"));
})

app.use((err, req , res, next)=>{
    const {statusCode = 500 , message = "something went wrong!" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{ message});
})
