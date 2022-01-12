
const express = require('express');

const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/', (req, res) => {
    session = req.session;

    // User not logged in
    if( !session.userid ) {
        res.render('home', {
            loginRef: "/login",
            loginMenu: "Login"
        });
        return;
    }
    // User logged in
    res.render('home', {
        loginRef: "/logout",
        loginMenu: "Logout"
    });
});

module.exports = router;
