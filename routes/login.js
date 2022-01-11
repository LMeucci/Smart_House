
const express = require('express'),
      ADMIN_NAME = 'Lorenzo',
      ADMIN_PASSWORD = 'pass666';

const { resetCurrentProfile,
        setUpControllerName } = require('../controller/controls');

const router = express.Router();


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/login', (req, res) => {

    session = req.session;

    // Check if already logged in = session.userid is setup
    if( session.userid ) {
        res.render('logout', {
            loginRef: "/logout",
            loginMenu: "Logout",
            message: req.flash('message')
        });
    }
    else {
        res.render('login', {
            loginRef: "/login",
            loginMenu: "Login",
            message: req.flash('message')
        });
    }
});

router.post('/login', (req, res) => {

    // Check login data submitted through the form
    if(req.body.username == ADMIN_NAME && req.body.password == ADMIN_PASSWORD) {
        session = req.session;
        session.userid = req.body.username;

        setUpControllerName(req.body.username);
        resetCurrentProfile();
        res.redirect('/logout');
    }
    else {
        req.flash('message', 'Nome utente e/o password errati!');
        res.redirect('/login');
    }
});

module.exports = router;
