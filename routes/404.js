const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
  res.status(404).send('Not Found\n');
});

module.exports = router;
