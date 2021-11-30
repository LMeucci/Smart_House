// Stock Middleware
const fs = require('fs'),
      morgan = require('morgan'),
      express = require('express');


// Routes Handling
const home = require('./routes/home'),
      tuning = require('./routes/tuning'),
      profiles = require('./routes/profiles'),
      contacts = require('./routes/contacts'),
      login = require('./routes/login'),
      logout = require('./routes/logout'),
      _404 = require('./routes/404');


const app = express();
const port = process.env.PORT || 3000;
const log = fs.createWriteStream('logs/access.log', { flags: 'a'});

// Templates to allow dynamic html pages
app.set('views', './views');
app.set('view engine', 'ejs');



                           /* APP CODE */
// morgan middleware used to save request logs
app.use(morgan('combined', {stream: log}));

app.use(home);
app.use(tuning);
app.use(profiles);
app.use(contacts);
app.use('/login', login);
app.use(logout);
app.use(_404);

app.listen(port);
