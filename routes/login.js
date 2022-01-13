
const express = require('express'),
      ADMIN_NAME = 'Lorenzo',
      ADMIN_PASSWORD = 'pass666';

const { resetCurrentProfile,
        setUpControllerName } = require('../controller/controls');

const router = express.Router();


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/login', (req, res) => {
    session = req.session;

    // User not logged in
    if( !session.userid ) {
        res.render('login', {
            loginRef: "/login",
            loginMenu: "Login",
            message: req.flash('message')
        });
        return;
    }
    // User logged in
    res.redirect('/logout');
});

router.post('/login', (req, res) => {

    // User logged in
    session = req.session;
    if( session.userid ) {
        res.redirect('/logout');
        return;
    }
    // User not logged in
    if(req.body.username == ADMIN_NAME && req.body.password == ADMIN_PASSWORD) {
        session = req.session;
        session.userid = req.body.username;

        setUpControllerName(session.userid);
        resetCurrentProfile();
        res.redirect('/logout');
    }
    else {
        req.flash('message', 'Nome utente e/o password errati!');
        res.redirect('/login');
    }
});

module.exports = router;
