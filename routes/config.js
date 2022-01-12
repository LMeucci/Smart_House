
const express = require('express'),
      RESET_FORM = "reset",
      APPLY_FORM = "apply",
      SAVE_FORM = "save";

const { setUpControllerName,
        resetController,
        resetCurrentProfile,
        loadCurrentProfile,
        applyCurrentSettings,
        saveProfileOnDB } = require('../controller/controls');

const rooms = ["salotto", "cucina", "camera1", "camera2",
               "camera3", "bagno1", "bagno2", "ripostiglio"];

const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/configurazione', (req, res) => {
    session = req.session;

    // User not logged in
    if( !session.userid ) {
        res.render('notLogged', {
            loginRef: "/login",
            loginMenu: "Login"
        });
        return;
    }
    // User logged in
    const devices = loadCurrentProfile();
    res.render('config', {
        loginRef: "/logout",
        loginMenu: "Logout",
        message: req.flash('message'),
        devices: devices,
        rooms: rooms
    });
});

router.post('/configurazione', (req, res) => {
    session = req.session;

    // User not logged in
    if( !session.userid ) {
        res.redirect('/configurazione');
        return;
    }
    // User logged in
    if(req.body.formTrigger == RESET_FORM) {
        resetCurrentProfile();
        resetController();
        setUpControllerName(session.userid);
    }
    else if(req.body.formTrigger == APPLY_FORM) {
        applyCurrentSettings(req);
    }
    else if(req.body.formTrigger == SAVE_FORM) {
        saveProfileOnDB(req)
    }
    res.redirect('/configurazione');
});


module.exports = router;
