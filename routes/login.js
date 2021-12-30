
const express = require('express'),
      adminName = 'Lorenzo',
      adminPassword = 'pass666';

const router = express.Router();


//--------- Modules needed to parse a form response
router.use(express.json());
router.use(express.urlencoded({extended: true}));


/////////////////////////* Routes Handlers *///////////////////////////////////
router.get('/login', (req, res) => {

    session = req.session;

    // Check if already logged in = session.userid is setup
    if( session.userid )
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
    else
    {
        res.render('login', {
            title: "Smart House",
            loginRef: "/login",
            loginMenu: "Login",
            info: "In questa pagina puoi effettuare il login per poter accedere alle"
                 +" aree di configurazione e di caricamento dei profili salvati."
        });
    }
});

router.post('/login', (req, res) => {

    // Check login data submitted through the form
    if(req.body.username == adminName && req.body.password == adminPassword)
    {
        session = req.session;
        session.userid = req.body.username;
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
    else
    {
        res.send("Invalid username or password");
    }
});

module.exports = router;
