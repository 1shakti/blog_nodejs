const express = require("express");
const path = require("path");
const { mongoDBConnect } = require("./src/config/mongodbConnect");

const PORT = 8005;
const app = express();

//mogodbconnection
mongoDBConnect("mongodb://localhost:27017/blogify")
  .then(() => console.log("Mongodb connected"))
  .catch((e) => console.log("Mongodb Connection error", e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => res.end("hello"));

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
