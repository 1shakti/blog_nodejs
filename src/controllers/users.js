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
  try {
    const userToken = await User.matchPasswordAndGenerateToken(email, password);
    return res
      .cookie("token", userToken, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 3600000,
      })
      .redirect("/");
  } catch (e) {
    return res.render("signin", {
      error: e,
    });
  }
}

function handleGetLogout(req, res) {
  return res.clearCookie("token").redirect("/");
}

module.exports = {
  handlePostSignup,
  handlePostSignin,
  handleGetLogout,
};
