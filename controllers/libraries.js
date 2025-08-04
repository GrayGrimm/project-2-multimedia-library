const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

/* ==========================Create========================== */
router.get("/new", async (req, res) => {
  try {
    res.render("libraries/new.ejs");
  } catch (error) {
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
  } catch (error) {
    console.log(error);
    res.redirect("/");
  };
});

/* ==========================Read========================== */
router.get('/', async (req, res) => {
  try {
    res.render('libraries/index.ejs')
  } catch (error) {
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
  } catch (error) {
    console.log(error);
    res.redirect("/");
  };
});
/* ==================Res.send only for now================== */
router.get('/tv-shows', async (req, res) => {
  res.send('This will bring you to your TV Shows in our next update 1.1. Please click the go back button.');
});

router.get('/games', async (req, res) => {
  res.send('This will bring you to your Video Games in update 1.2. Please click the go back button.');
});

router.get('/books', async (req, res) => {
  res.send('This will bring you to your Books in update 1.3. Please click the go back button.');
});

router.get('/cds', async (req, res) => {
  res.send("This will bring you to your CD's in update 1.4. Please click the go back button.");
});
/* ==========================End========================== */

router.get("/:movieId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentMovie = currentUser.movieLibrary.id(req.params.movieId);
    res.render("libraries/show.ejs", {
      currentMovie: currentMovie,
      movieLibrary: currentUser.movieLibrary
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  };
});

/* ==========================Update========================== */
router.get("/:movieId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentMovie = currentUser.movieLibrary.id(req.params.movieId);
    res.render("libraries/edit.ejs", {
      currentMovie: currentMovie
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  };
});

router.put("/:movieId", async (req, res) => {
  if (req.body.status === 'on') {
    req.body.status = true;
  } else {
    req.body.status = false;
  }
  try {
    const currentUser = await User.findById(req.session.user._id);
    const currentMovie = currentUser.movieLibrary.id(req.params.movieId);

    currentMovie.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/libraries/${req.params.movieId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  };
});


/* ==========================Delete========================== */

router.delete("/:movieId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.movieLibrary.id(req.params.movieId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/libraries/movies`)
  } catch (error) {
    console.log(error);
    res.redirect("/");
  };
});

/* ==========================Export========================== */

module.exports = router;
