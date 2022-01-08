
const fs = require('fs');
const express = require('express'),
      current = 'current-profile.json',
      model = 'model.json',
      profiles = 'profiles.json',
      MAX_LED_INTENSITY = 10,
      LED = 2,
      PR = 3,
      RESET = 9;

const rooms = ["salotto", "cucina", "camera1", "camera2",
               "camera3", "bagno1", "bagno2", "ripostiglio"];

const router = express.Router();

//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/configurazione', (req, res) => {

    session = req.session;
    //console.log(`session: ${session.userid}`);
    // Check if already logged in = session.userid is setup
    if( session.userid ) {
        const currentProfileJSON = fs.readFileSync(current, 'utf-8');
        const currentProfile = JSON.parse(currentProfileJSON);

        const devices = [];
        loadCurrentProfile(currentProfile, devices);
        res.render('config', {
            loginRef: "/logout",
            loginMenu: "Logout",
            message: req.flash('message'),
            devices: devices,
            rooms: rooms
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

    //session = req.session;
    if(req.body.formTrigger == "reset") {
        resetCurrentProfile();
        // Print commands for OnPC_client app to be sent to Arduino controller
        resetController();
        setUpControllerName(session.userid);
    }
    // Form is either setup or save
    else {
        const currentProfileJSON = fs.readFileSync(current, 'utf-8'),
              currentProfile = JSON.parse(currentProfileJSON);

        saveCurrentProfile(currentProfile, req);

        if(req.body.formTrigger == "setup") {
            fs.writeFileSync(current, JSON.stringify(currentProfile, null, 4));

            // Print commands for OnPC_client app to be sent to Arduino controller
            //resetController();
            //setUpControllerName(session.userid);
            let i = 0;
            for(let attribute in currentProfile) {

                let attributeValue = currentProfile[attribute];
                //console.log(`Before: ${attributeValue}`);
                if( (i < 8) && (attributeValue != 0) ) {
                    setUpLED(i, attributeValue);
                }
                else if( (i >= 8) && (i < 16) && (attributeValue != "Nessuno") ) {
                    setUpLED(i-8, MAX_LED_INTENSITY);
                    setUpPR(attributeValue.charAt(2)-1, i-8);
                }
                i++;
            }
        }
        else if(req.body.formTrigger == "save") {
            if( !req.body.profileName ) {
                req.flash('message', 'Devi inserire un nome per il profilo per poterlo salvare!');
                fs.writeFileSync(current, JSON.stringify(currentProfile, null, 4));
            }
            else {
                currentProfile.nome = req.body.profileName;
                currentProfile.descrizione = req.body.profileInfo;


                const profilesJSON= fs.readFileSync(profiles, 'utf-8'),
                      profilesArray= JSON.parse(profilesJSON);

                profilesArray.push(currentProfile);
                fs.writeFileSync(profiles, JSON.stringify(profilesArray, null, 4));
                fs.copyFile(model, current, () => {});
            }
        }
    }
    //console.log(`sessionPost: ${req.session.userid}`);
    res.redirect('/configurazione');
});

//------------ Auxiliary functions
function saveCurrentProfile(currentProfile, req)
{
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

function loadCurrentProfile(currentProfile, devices)
{

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

function resetCurrentProfile()
{
    fs.copyFile(model, current, () => {});
}

function resetController()
{
    console.log(RESET);
}

function setUpControllerName(name)
{
    console.log(`${name}-Casa`);
}

function setUpLED(whichLED, value)
{
    console.log(LED);
    console.log(whichLED);
    scaledValue = 25*value;
    (scaledValue < 100) ? console.log(`0${scaledValue}`) : console.log(scaledValue);
}

function setUpPR(whichPR, whichLED)
{
    console.log(PR);
    console.log(whichPR);
    console.log(whichLED);
}

module.exports = router;
