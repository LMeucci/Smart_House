const express = require('express');
const router = express.Router();

router.get('/contacts', (req, res) => {
  res.status(200).render('index', {
    intestazione: "Contacts Area",
    info: "In the co-operative trick-taking game The Crew: The Quest for Planet Nine, the players set out as astronauts on an uncertain space adventure. What about the rumors about the unknown planet about? The eventful journey through space extends over 50 exciting missions. But this game can only be defeated by meeting common individual tasks of each player. In order to meet the varied challenges, communication is essential in the team. But this is more difficult than expected in space. With each mission, the game becomes more difficult. After each mission, the game can be paused and continued later. During each mission, it is not the amount of tricks, but the right tricks at the right time that count. The team completes a mission only if every single player is successful in fulfilling their tasks. The game comes with 50 missions, with three additional missions published in spielbox 2/2020."
  });
});

module.exports = router;
