
const express = require('express');
const router = express.Router();


/////////////////////////* Routes Handlers *////////////////////////////////////
router.get('/profiles', (req, res) => {

    session = req.session;
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
        res.send("Devi effettuare il login prima di poter configurare i tuoi dispositivi!");
    }
});

module.exports = router;
