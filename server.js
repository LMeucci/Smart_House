// Middlewares
const fs = require('fs'),
      morgan = require('morgan'),
      express = require('express'),
      flash = require('connect-flash'),
      cookieParser = require('cookie-parser'),
      sessions = require('express-session'),
      oneDay = 1000 * 60 * 60 * 24, // Session Timeout
      randomstring = require('randomstring');


// Routes handling
const home = require('./routes/home'),
      config = require('./routes/config'),
      profiles = require('./routes/profiles'),
      login = require('./routes/login'),
      logout = require('./routes/logout'),
      _404 = require('./routes/404');


const app = express();


// Ambient variables loaded from path dinamically, depending on env variable NODE_ENV.
// echo $NODE_ENV (linux) to check status of NODE_ENV
// export NODE_ENV=development
require('dotenv').config({
    path: `.env.${ app.get('env') }`
});

// Create Access Log file
const log = fs.createWriteStream('logs/access.log', { flags: 'a'});


// Templates to allow dynamic html pages
app.set('views', './views');
app.set('view engine', 'ejs');



                           /* APP CODE */
// Inform express static files (eg: css) are inside public
app.use(express.static('public'));
// Morgan middleware used to save request logs
app.use(morgan('combined', {stream: log}));
app.use(flash());

// --------------- Session setup
const randomSecret = randomstring.generate();
app.use(sessions({
    secret: randomSecret,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());

//--------- Modules needed to parse a form response
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//--------- Mount points for routes
app.use(home);
app.use(config);
app.use(profiles);
app.use(login)
app.use(logout);
app.use(_404);

app.listen(process.env.SMART_HOUSE_PORT, () =>{
    //console.log(`Server in ascolto sulla porta: ${process.env.SMART_HOUSE_PORT}`);
});
