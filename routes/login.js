
const fs = require('fs');
const express = require('express'),
      adminName = 'Lorenzo',
      adminPassword = 'pass666',
      current = 'current-profile.json',
      model = 'model.json';

const router = express.Router();


//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


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
    if(req.body.username == adminName && req.body.password == adminPassword) {
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

function setUpControllerName(name)
{
    console.log(`${name}-Casa`);
}

function resetCurrentProfile()
{
    fs.copyFile(model, current, () => {});
}

module.exports = router;
