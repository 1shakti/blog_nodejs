const { Router } = require('express');
const router = Router();
const User = require('../models/users');

router.get('/signup',(req, res) => res.render('signup'))
router.get('/signin',(req, res) => res.render('signin'))

router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');
})

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    const user = await User.matchPassword(email, password);
    console.log(user)
    return res.redirect('/');
})


module.exports = router;