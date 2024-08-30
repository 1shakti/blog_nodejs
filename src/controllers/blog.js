const Blog = require("../models/blog");

async function handlePostBlog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    coverImage: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  console.log(blog)
  return res.redirect(`/blog/${blog._id}`);
}

module.exports = {
  handlePostBlog,
};
