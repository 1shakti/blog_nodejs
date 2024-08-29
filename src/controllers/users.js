const User = require("../models/users");

async function handlePostSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handlePostSignin(req, res) {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);
  console.log(user);
  return res.redirect("/");
}

module.exports = {
  handlePostSignup,
  handlePostSignin,
};
