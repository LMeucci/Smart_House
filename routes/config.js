const express = require('express');
const router = express.Router();

router.get('/configurazione', (req, res) => {

    res.status(200).render('config', {
        info: "Questa è la sezione dedicata all'impostazione e regolazione dei tuoi dispositivi. Dopo aver regolato i vari dispositivi disponibili è possibile salvare la configurazione attuale per poterla utilizzare in seguito. Per fare ciò è necessario associargli un nome e premere il tasto salva.",
        led: "Area LED",
        infoLED: "In questa area è possibile regolare la luminosità dei LED. Sono previsti 10 livelli (1-10) per ogni LED.",
        pr: "Area Fotoresistori",
        infoPR: "In questa area è possibile associare ognuno dei fotoresistori installati ad uno o più LED presenti in un ambiente, in modo da regolarne la luminosità in maniera automatica.",
        save: "Area di salvataggio",
        infoSave: "In questa area è possibile salvare le impostazioni scelte nelle aree soprastanti. E' richiesto l'inserimento di un nome da associare alla configurazione attuale per procedere al salvataggio."
    });
});

module.exports = router;
