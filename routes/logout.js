
const express = require('express');
const current = 'current-profile.json',
      model = 'model.json',
      RESET = 9; // Command 9 issue a reset for the controller

const router = express.Router();

//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/logout', (req, res) => {
    res.render('logout', {
        loginRef: "/logout",
        loginMenu: "Logout"
    });
});

router.post('/logout', (req, res) => {

    if(req.body.check) {
        req.session.destroy();
        resetController();
        res.redirect('/login');
    }
    else {
        res.redirect('/logout');
    }
});

function resetController()
{
    console.log(RESET);
}

module.exports = router;
