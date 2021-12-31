
const express = require('express');
const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/configurazione', (req, res) => {

    session = req.session;
    
    // Check if already logged in = session.userid is setup
    if( session.userid ) {
        res.render('config', {
            loginRef: "/logout",
            loginMenu: "Logout",
        });
    }
    else {
        res.render('notLogged', {
            loginRef: "/login",
            loginMenu: "Login",
        });
    }
});

module.exports = router;
