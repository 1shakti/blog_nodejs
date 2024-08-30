const Blog = require("../models/blog");
const Comment = require("../models/comments");

async function handleGetBlog(req, res) {
  const blogs = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId:req.params.id}).populate("createdBy")
  return res.render("blog", {
    user: req.user,
    blogs,
    comments
  });
}

async function handlePostBlog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    coverImage: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  console.log(blog);
  return res.redirect(`/blog/${blog._id}`);
}

async function handlePostComment(req, res) {
  const { content } = req.body;
  await Comment.create({
    content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
}

module.exports = {
  handleGetBlog,
  handlePostBlog,
  handlePostComment,
};
