
const fs = require('fs');
const express = require('express'),
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

    if(req.body.formTrigger == "apply") {

        const currentProfile = profilesArray[profileIndex];
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
    else if (req.body.formTrigger == "delete") {

        profilesArray.splice(profileIndex, 1);
        fs.writeFileSync(profiles, JSON.stringify(profilesArray, null, 4));
        //console.log(`item number (delete): ${req.body.profileIndex}`);
    }
    res.redirect('/profili');
});

//------------ Auxiliary functions
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
