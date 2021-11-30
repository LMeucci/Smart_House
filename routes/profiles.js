const express = require('express');
const router = express.Router();

router.get('/profiles', (req, res) => {
  const profili= [
    { id: "Profilo casa", info: "Utilizzato durante... per..."},
    { id: "Profilo allenamento", info: "Utilizzato durante... per..."},
    { id: "Profilo lavoro", info: "Utilizzato durante... per..."}
  ];
  res.status(200).render('profiles', {
    elencoProfili: profili
  });
});

module.exports = router;
