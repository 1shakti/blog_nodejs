const { Router } = require("express");
const path = require("path");
const { handlePostBlog } = require("../controllers/blog");
const multer = require("multer");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {

    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get("/addNewBlog", (req, res) => {
  res.render("addBlog");
});

router.post("/", upload.single("coverImage"), handlePostBlog);

module.exports = router;
