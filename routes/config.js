
const fs = require('fs');
const express = require('express');
const currentFile = 'current_profile.json'

const router = express.Router();

//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/configurazione', (req, res) => {

    session = req.session;

    // Check if already logged in = session.userid is setup
    if( session.userid ) {
        const currentProfileJSON = fs.readFileSync(currentFile, 'utf-8');
        const currentProfile = JSON.parse(currentProfileJSON);

        const devices = [];
        load(currentProfile, devices);
        res.render('config', {
            loginRef: "/logout",
            loginMenu: "Logout",
            devices: devices
        });
    }
    else {
        res.render('notLogged', {
            loginRef: "/login",
            loginMenu: "Login"
        });
    }
});

router.post('/configurazione', (req, res) => {

    const currentProfileJSON = fs.readFileSync(currentFile, 'utf-8');
    const currentProfile = JSON.parse(currentProfileJSON);

    if(req.body.formInstance == "setupForm") {

        currentProfile.led1 = req.body.led1;
        currentProfile.led2 = req.body.led2;
        currentProfile.led3 = req.body.led3;
        currentProfile.led4 = req.body.led4;
        currentProfile.led5 = req.body.led5;
        currentProfile.led6 = req.body.led6;
        currentProfile.led7 = req.body.led7;
        currentProfile.led8 = req.body.led8;
        currentProfile.sel1 = req.body.sel1;
        currentProfile.sel2 = req.body.sel2;
        currentProfile.sel3 = req.body.sel3;
        currentProfile.sel4 = req.body.sel4;
        currentProfile.sel5 = req.body.sel5;
        currentProfile.sel6 = req.body.sel6;
        currentProfile.sel7 = req.body.sel7;
        currentProfile.sel8 = req.body.sel8;
    }
    else if(req.body.formInstance == "saveForm") {
        // cose...
    }
    const devices = [];
    load(currentProfile, devices);
    fs.writeFileSync(currentFile, JSON.stringify(currentProfile, null, 4));
    res.render('config', {
        loginRef: "/logout",
        loginMenu: "Logout",
        devices: devices
    });
});


function load(currentProfile, devices) {

    devices.push(currentProfile.led1);
    devices.push(currentProfile.led2);
    devices.push(currentProfile.led3);
    devices.push(currentProfile.led4);
    devices.push(currentProfile.led5);
    devices.push(currentProfile.led6);
    devices.push(currentProfile.led7);
    devices.push(currentProfile.led8);
    devices.push(currentProfile.sel1);
    devices.push(currentProfile.sel2);
    devices.push(currentProfile.sel3);
    devices.push(currentProfile.sel4);
    devices.push(currentProfile.sel5);
    devices.push(currentProfile.sel6);
    devices.push(currentProfile.sel7);
    devices.push(currentProfile.sel8);
}

module.exports = router;
