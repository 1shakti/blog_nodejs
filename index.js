const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const { mongoDBConnect } = require("./src/config/mongodbConnect");
const PORT = 8005;
const app = express();

//routes
const userRoutes = require('./src/routes/users');
const blogRoutes = require('./src/routes/blog');
const { checkForAuthenticationCookie } = require("./src/middlewares/auth");

//mogodbconnection
mongoDBConnect("mongodb://localhost:27017/blogify")
  .then(() => console.log("Mongodb connected"))
  .catch((e) => console.log("Mongodb Connection error", e));

//ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.get("/", (req, res) => res.render("home",{
  user:req.user
}));
app.use("/user", userRoutes);
app.use("/blog",blogRoutes);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
