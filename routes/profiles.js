const express = require('express');
const router = express.Router();

router.get('/profiles', (req, res) => {
  const profili= [
    { id: "Profilo casa", info: "Profilo utilizzato durante... per..."},
    { id: "Profilo allenamento", info: "Profilo utilizzato durante... per..."},
    { id: "Profilo lavoro", info: "Profilo utilizzato durante... per..."}
  ];
  res.status(200).render('profiles', {
    elencoProfili: profili
  });
});

module.exports = router;
