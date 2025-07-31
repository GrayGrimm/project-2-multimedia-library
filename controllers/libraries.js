const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

/* ==========================Create========================== */
router.get("/new", async (req, res) => {
    try {
        res.render("libraries/new.ejs");
    } catch(error) {
        console.log(error);
        res.redirect("/");
    };
});
router.post("/movieLibrary", async (req, res) => {
  console.log(req.body)
  if (req.body.status === 'on') {
    req.body.status = true;
  } else {
    req.body.status = false;
  }
  try {
    const currentUser = await User.findById(req.session.user._id);
    console.log(currentUser)
    currentUser.movieLibrary.push(req.body);
    console.log(currentUser)
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/libraries/movies`)
  } catch(error) {
    console.log(error);
    res.redirect("/");
  };
});

/* ==========================Read========================== */
router.get('/', async (req, res) => {
  try {
    res.render('libraries/index.ejs')
  } catch(error) {
    console.log(error);
    res.redirect("/");
  };
});

router.get('/movies', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('libraries/movies.ejs', {
      movieLibrary: currentUser.movieLibrary,
    });
  } catch(error) {
    console.log(error);
    res.redirect("/");
  };
});

/* ==========================Update========================== */



/* ==========================Delete========================== */



/* ==========================Export========================== */

module.exports = router;
