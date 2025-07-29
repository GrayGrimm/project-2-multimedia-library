const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const User = require("../models/user.js")


router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
    console.log(req.body)
    const userInDatabase = await User.findOne({ username: req.body.username });

    if (userInDatabase) {
        return res.send('Username already taken!');
    };

    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Passwords must match!');
    };

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
const successPageHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Signup Successful!</title>
            <meta http-equiv="refresh" content="3;url=/"> 
            <style>
                body {
                    font-family: sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background-color: #f0f0f0;
                    text-align: center;
                }
                .container {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #28a745;
                }
                p {
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🎉 Success!</h1>
                <p>Your account has been created. You will be redirected to the home page in 3 seconds...</p>
                <p>If you are not redirected, <a href="/">click here</a>.</p>

                </div>
        </body>
        </html>
    `;
    const user = await User.create(req.body);
    res.send(successPageHtml);

});

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
        return res.send("Login failed. Please try again.");
    }

    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    );
    if (!validPassword) {
        res.send("Login Failed. Please try again!")
    }

    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
    };
    res.redirect('/')

});

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router;