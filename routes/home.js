
const express = require('express');
const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/', (req, res) => {

    session = req.session;

    // Check if already logged in = session.userid is setup
    if( session.userid ) {
        res.render('home', {
            loginRef: "/logout",
            loginMenu: "Logout"
        });
    }
    else {
        res.render('home', {
            loginRef: "/login",
            loginMenu: "Login"
        });
    }
});

module.exports = router;
