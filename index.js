const express = require("express");
const path = require("path");
const { mongoDBConnect } = require("./src/config/mongodbConnect");
const PORT = 8005;
const app = express();

//routes
const userRoutes = require('./src/routes/users');

//mogodbconnection
mongoDBConnect("mongodb://localhost:27017/blogify")
  .then(() => console.log("Mongodb connected"))
  .catch((e) => console.log("Mongodb Connection error", e));

//ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => res.render("home"));
app.use("/user", userRoutes);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
