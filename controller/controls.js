
const fs = require('fs');
const current = './model/current-profile.json',
      template = './model/template.json';
const MIN_LED_INTENSITY = 0,
      MAX_LED_INTENSITY = 10,
      NO_PR_SELECTED = "Nessuno",
      LED_CMD = 2,
      PR_CMD = 3,
      RESET_CMD = 9;


function setUpControllerName(name)
{
    console.log(`${name}-Casa`);
}

function resetController()
{
    console.log(RESET_CMD);
}

function resetCurrentProfile()
{
    fs.copyFile(template, current, () => {});
}

function setUpControllerDevices(currentProfile)
{
    let i = 0;
    for(let attribute in currentProfile) {
        let attributeValue = currentProfile[attribute];
        if( (i < 8) && (attributeValue != MIN_LED_INTENSITY) ) {
            setUpLED(i, attributeValue);
        }
        else if( (i >= 8) && (i < 16) && (attributeValue != NO_PR_SELECTED) ) {
            setUpLED(i-8, MAX_LED_INTENSITY);
            setUpPR(attributeValue.charAt(2)-1, i-8);
        }
        i++;
    }
}

//------------ Auxiliary functions
function setUpLED(whichLED, value)
{
    console.log(LED_CMD);
    console.log(whichLED);
    scaledValue = 25*value;
    (scaledValue < 100) ? console.log(`0${scaledValue}`) : console.log(scaledValue);
}

function setUpPR(whichPR, whichLED)
{
    console.log(PR_CMD);
    console.log(whichPR);
    console.log(whichLED);
}


module.exports = {
    setUpControllerName,
    resetController,
    resetCurrentProfile,
    setUpControllerDevices
}
