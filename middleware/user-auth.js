/* Funzioni Middleware */

// Check Authentication
function userAuth(req,res,next)
{

    console.log("Controllo autenticazione...");
    if(req.query.nome)
    {
        console.log(`Benvenuto: ${req.query.nome}`);
        req.user = {nome: `${req.query.nome}`, tipo: `${req.query.codice}`};
        return next();
    }

    console.log("Autenticazione fallita!");
    res.status(401).send("Non sei autenticato!\n");
}

// Check Authorization
function userPerms(req,res,next)
{

    console.log(`Controllo auth per ${req.query.nome}...`);
    if(req.user.tipo >0)
    {
        console.log(`Utente ${req.query.nome} sei stato autorizzato!`);
        return next();
    }

    console.log("Autorizzazione fallita!");
    res.status(403).send("Non sei autorizzato!");
}


module.exports =
{
  userAuth,
  userPerms
}
