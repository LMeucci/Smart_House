
const express = require('express');

const { resetController } = require('../controller/controls');

const router = express.Router();


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/logout', (req, res) => {
    res.render('logout', {
        loginRef: "/logout",
        loginMenu: "Logout",
        message: req.flash('message')
    });
});

router.post('/logout', (req, res) => {

    // Only accepts POST request from logged in user
    session = req.session;
    if( !session.userid ) {
        res.redirect('/login');
        return;
    }

    if(req.body.check) {
        req.session.destroy();
        resetController();
        res.redirect('/login');
    }
    else {
        req.flash('message', 'Devi selezionare la casella di controllo per poter effettuare il logout!');
        res.redirect('/logout');
    }
});

module.exports = router;
