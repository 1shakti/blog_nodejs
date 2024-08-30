const { Router } = require("express");
const path = require("path");
const { handleGetBlog, handlePostBlog, handlePostComment } = require("../controllers/blog");
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

router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", handleGetBlog);
router.post('/comment/:blogId',handlePostComment)
router.post("/", upload.single("coverImage"), handlePostBlog);

module.exports = router;
