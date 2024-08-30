const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const { mongoDBConnect } = require("./src/config/mongodbConnect");
const PORT = 8005;
const app = express();

const Blogs = require('./src/models/blog');

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
app.use(express.static(path.resolve('./public')));

app.get("/", async (req, res) =>{
  const allBlogs = await Blogs.find({});
  return res.render("home",{
    user:req.user,
    blogs:allBlogs
  })
} );
app.use("/user", userRoutes);
app.use("/blog",blogRoutes);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
