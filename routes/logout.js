
const express = require('express'),
      current = 'current-profile.json';

const { resetController } = require('../controller/controls');

const router = express.Router();


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/logout', (req, res) => {
    res.render('logout', {
        loginRef: "/logout",
        loginMenu: "Logout"
    });
});

router.post('/logout', (req, res) => {
    if(req.body.check) {
        req.session.destroy();
        resetController();
        res.redirect('/login');
    }
    else {
        res.redirect('/logout');
    }
});

module.exports = router;
