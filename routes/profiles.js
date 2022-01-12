
const      express = require('express'),
      APPLY_FORM = "apply",
      DELETE_FORM = "delete";

const { loadProfiles,
        loadProfileOnController,
        deleteProfileFromDB } = require('../controller/controls');

const rooms = ["salotto", "cucina", "camera1", "camera2",
               "camera3", "bagno1", "bagno2", "ripostiglio"];

const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/profili', (req, res) => {
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
    const profiles = loadProfiles();
    res.render('profiles', {
        loginRef: "/logout",
        loginMenu: "Logout",
        elencoProfili: profiles,
        rooms: rooms
    });
});

router.post('/profili', (req, res) => {
    session = req.session;

    // User not logged in
    if( !session.userid ) {
        res.redirect('/profili');
        return;
    }
    // User logged in
    const profileIndex = req.body.profileIndex;
    if(req.body.formTrigger == APPLY_FORM) {
        loadProfileOnController(profileIndex);
    }
    else if (req.body.formTrigger == DELETE_FORM) {
        deleteProfileFromDB(profileIndex);
    }
    res.redirect('/profili');
});

module.exports = router;
