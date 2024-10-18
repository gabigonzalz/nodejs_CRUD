// Imports
require('dotenv').config();
const express = require('express');
const session = require('express-session');


// Defining the app and the port
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express sessions
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Setting the template engine
app.set('view engine', 'ejs');

// Route prefix
app.use("", require("./routes/routes"));

// Listening on the defined port
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

