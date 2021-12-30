const express = require('express');
const router = express.Router();

//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/logout', (req, res) => {
    res.render('logout', {
        title: "Smart House",
        loginRef: "/logout",
        loginMenu: "Logout",
        info: "Hai effettuato il login con successo! Non appena avrai terminato"
             +" le operazioni di configurazione e di caricamento dei profili salvati"
             +" ricordati di effettuare il logout dall'applicanzione premendo"
             +" il pulsante apposito all'interno di questa pagina."
    });
});

router.post('/logout', (req, res) => {

    if(req.body.check)
    {
        req.session.destroy();
        res.redirect('/login');
    }
    else
    {
        res.render('logout', {
            title: "Smart House",
            loginRef: "/logout",
            loginMenu: "Logout",
            info: "Hai effettuato il login con successo! Non appena avrai terminato"
                 +" le operazioni di configurazione e di caricamento dei profili salvati"
                 +" ricordati di effettuare il logout dall'applicanzione premendo"
                 +" il pulsante apposito all'interno di questa pagina."
        });
    }
});

module.exports = router;
