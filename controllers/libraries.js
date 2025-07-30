const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

/* ==========================Create========================== */
router.get("/new", async (req, res) => {
    try {
        res.redirect("/libraries/new.ejs");
    } catch(error) {
        console.log(error);
        res.redirect("/");
    };
});


/* ==========================Read========================== */
router.get('/', (req, res) => {
  try {
    res.render('libraries/index.ejs')
  } catch(error) {
    console.log(error);
    res.redirect("/");
  };
});


/* ==========================Update========================== */



/* ==========================Delete========================== */



/* ==========================Export========================== */

module.exports = router;
