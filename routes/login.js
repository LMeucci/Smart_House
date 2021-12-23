const { userAuth, userPerms } = require('../middleware/user-auth');
const express = require('express');
const router = express.Router();

//router.use(userAuth, userPerms);

router.get('/login', (req, res) => {
    //console.log("Login effettuato con successo!");
    res.status(200).render('login', {
        title: "Smart House",
        info: "In questa pagina puoi effettuare il login per poter accedere alle"
             +" aree di configurazione e di caricamento dei profili salvati."
    });
});

module.exports = router;
