
const express = require('express');
const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/profili', (req, res) => {

    session = req.session;

    // Check if already logged in = session.userid is setup
    if( session.userid )
    {
        const profili= [
            { id: "Profilo casa", info: "Utilizzato durante... per..."},
            { id: "Profilo allenamento", info: "Utilizzato durante... per..."},
            { id: "Profilo lavoro", info: "Utilizzato durante... per..."}
        ];
        res.render('profiles', {
            loginRef: "/logout",
            loginMenu: "Logout",
            elencoProfili: profili
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

module.exports = router;
