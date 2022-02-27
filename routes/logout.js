
const express = require('express');

const { restartConfiguration } = require('../controller/controls');

const router = express.Router();


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/logout', (req, res) => {
    session = req.session;

    // User not logged in
    if( !session.userid ) {
        res.redirect('/login');
        return;
    }
    // User logged in
    res.render('logout', {
        loginRef: "/logout",
        loginMenu: "Logout",
        message: req.flash('message')
    });
});

router.post('/logout', (req, res) => {

    // User not logged in
    session = req.session;
    if( !session.userid ) {
        res.redirect('/login');
        return;
    }
    // User logged in
    if(req.body.check) {
        req.session.destroy();
        restartConfiguration();
        res.redirect('/login');
    }
    else {
        req.flash('message', 'Devi selezionare la casella di controllo per poter effettuare il logout!');
        res.redirect('/logout');
    }
});

module.exports = router;
