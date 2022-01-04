
const fs = require('fs');
const express = require('express');
const profiles = 'profiles.json';

const router = express.Router();

//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


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
            elencoProfili: profilesArray
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

    if(req.body.formTrigger == "apply") {

        console.log(`item number (apply): ${req.body.profileIndex}`);
    }
    else if (req.body.formTrigger == "delete") {

        const profilesJSON= fs.readFileSync(profiles, 'utf-8'),
              profilesArray= JSON.parse(profilesJSON);
        console.log(`item number (delete): ${req.body.profileIndex}`);
    }
    res.redirect('/profili');
});

module.exports = router;
