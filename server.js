// importing modules 
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connections');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

// Initializing express app
 const app = express();
 const PORT = process.env.PORT || 3002;

 
 //  session configuration
 const sess = {
     secret: process.env.SECRET,
     cookie: {},
     resave: false,
     saveUninitialized: true,
     store: new sequelizeStore({
         db: sequelize,
        }),
    };
    
    app.use(session(sess));
    
// handlebars setup
const hbs = exphbs.create({helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes used from controller
app.use(routes);

// starting server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Running on server Port ${PORT}, Visit http://localhost:${PORT} and create an account`));
});