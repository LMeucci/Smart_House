
const express = require('express');
const router = express.Router();

//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


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
        res.redirect('/login');
    }
    else {
        res.redirect('/logout');
    }
});

module.exports = router;
