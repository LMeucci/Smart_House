
const fs = require('fs'),
      express = require('express'),
      profiles = './model/profiles.json',
      APPLY_FORM = "apply",
      DELETE_FORM = "delete";

const { setUpControllerName,
        resetController,
        setUpControllerDevices } = require('../controller/controls');

const rooms = ["salotto", "cucina", "camera1", "camera2",
               "camera3", "bagno1", "bagno2", "ripostiglio"];

const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/profili', (req, res) => {

    session = req.session;

    // Check if already logged in = session.userid is setup
    if( session.userid )
    {
        const profilesJSON= fs.readFileSync(profiles, 'utf-8'),
              profilesArray= JSON.parse(profilesJSON);

        res.render('profiles', {
            loginRef: "/logout",
            loginMenu: "Logout",
            elencoProfili: profilesArray,
            rooms: rooms
        });
    }
    else
    {
        res.render('notLogged', {
            loginRef: "/login",
            loginMenu: "Login"
        });
    }
});

router.post('/profili', (req, res) => {

    const profileIndex = req.body.profileIndex;
    const profilesJSON = fs.readFileSync(profiles, 'utf-8'),
          profilesArray= JSON.parse(profilesJSON);

    if(req.body.formTrigger == APPLY_FORM) {

        const currentProfile = profilesArray[profileIndex];
        // Print commands for OnPC_client app to be sent to Arduino controller
        setUpControllerDevices(currentProfile);
    }
    else if (req.body.formTrigger == DELETE_FORM) {
        profilesArray.splice(profileIndex, 1);
        fs.writeFileSync(profiles, JSON.stringify(profilesArray, null, 4));
    }
    res.redirect('/profili');
});

module.exports = router;
