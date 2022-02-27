
const fs = require('fs'),
      current = './model/current-profile.json',
      template = './model/template.json',
      profiles = './model/profiles.json',
      LED_OFF = 0,
      MAX_LED_INTENSITY = 10,
      NO_PR_SELECTED = "Nessuno",
      LED_CMD = 2,
      LED_OFF_CMD = 5,
      PR_CMD = 3,
      PR_OFF_CMD = 6,
      RESTART_CMD = 8,
      RESET_CMD = 9,

      DEBUG_PORTS = 1;


///////////////////////////* Exposed Functions *///////////////////////////////

function setUpControllerName(name)
{
    console.log(`${name}-Casa`);
}

function resetController()
{
    console.log(RESET_CMD);
}

function restartConfiguration()
{
    console.log(RESTART_CMD);
}

function resetCurrentProfile()
{
    fs.copyFile(template, current, () => {});
}

function loadCurrentProfile()
{
    const currentProfileJSON = fs.readFileSync(current, 'utf-8');
    const currentProfile = JSON.parse(currentProfileJSON);
    let devices = [];

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

    return devices;
}

function applyCurrentSettings(req)
{
    const currentProfileJSON = fs.readFileSync(current, 'utf-8'),
          currentProfile = JSON.parse(currentProfileJSON);

    saveCurrentProfile(currentProfile, req);
    fs.writeFileSync(current, JSON.stringify(currentProfile, null, 4));
    setUpControllerDevices(currentProfile);
}

function saveProfileOnDB(req)
{
    const currentProfileJSON = fs.readFileSync(current, 'utf-8'),
          currentProfile = JSON.parse(currentProfileJSON);

    saveCurrentProfile(currentProfile, req);

    if( !req.body.profileName ) {
        // Profile to save has no name
        req.flash('message', 'Devi inserire un nome per il profilo per poterlo salvare!');
        fs.writeFileSync(current, JSON.stringify(currentProfile, null, 4));
    }
    else {
        // Add new profile to profiles model
        currentProfile.nome = req.body.profileName;
        currentProfile.descrizione = req.body.profileInfo;
        const profilesJSON= fs.readFileSync(profiles, 'utf-8'),
              profilesArray= JSON.parse(profilesJSON);

        profilesArray.push(currentProfile);
        fs.writeFileSync(profiles, JSON.stringify(profilesArray, null, 4));

        resetCurrentProfile();
    }
}

function loadProfiles()
{
    const profilesJSON= fs.readFileSync(profiles, 'utf-8');
    return JSON.parse(profilesJSON);
}

function loadProfileOnController(profileIndex)
{
    const profilesJSON = fs.readFileSync(profiles, 'utf-8'),
          profilesArray= JSON.parse(profilesJSON);

    const currentProfile = profilesArray[profileIndex];
    setUpControllerDevices(currentProfile);
}

function deleteProfileFromDB(profileIndex)
{
    const profilesJSON = fs.readFileSync(profiles, 'utf-8'),
          profilesArray= JSON.parse(profilesJSON);

    profilesArray.splice(profileIndex, 1);
    fs.writeFileSync(profiles, JSON.stringify(profilesArray, null, 4));
}



//---------------------------- Auxiliary private functions ------------------//
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

function setUpLED(whichLED, value)
{
    console.log(LED_CMD);
    console.log(whichLED);
    scaledValue = 25*value;
    (scaledValue < 100) ? console.log(`0${scaledValue}`) : console.log(scaledValue);
}

function turnOffLED(whichLED)
{
    console.log(LED_OFF_CMD);
    console.log(whichLED);
}

function setUpPR(whichPR, whichLED)
{
    console.log(PR_CMD);
    console.log(whichPR);
    console.log(whichLED);
}

function turnOffPR(whichPR)
{
    console.log(PR_OFF_CMD);
    console.log(whichPR);
}

function setUpControllerDevices(currentProfile)
{
    let i = 0;
    for(let attribute in currentProfile) {
        let attributeValue = currentProfile[attribute];
        if( i < 8 ) {
            if(attributeValue != LED_OFF) {
                setUpLED(i, attributeValue);
            }
            else {
                turnOffLED(i);
            }
        }
        else if( (i >= 8) && (i < 16) ) {
            if( attributeValue != NO_PR_SELECTED ) {
                setUpLED(i-8, MAX_LED_INTENSITY);
                setUpPR(attributeValue.charAt(2)-1, i-8);
            }
            else {
                turnOffPR(i-8);
            }
        }
        i++;
    }
    //console.log(DEBUG_PORTS);
}



module.exports = {
    setUpControllerName,
    restartConfiguration,
    resetController,
    resetCurrentProfile,
    loadCurrentProfile,
    applyCurrentSettings,
    saveProfileOnDB,
    loadProfiles,
    loadProfileOnController,
    deleteProfileFromDB
}
