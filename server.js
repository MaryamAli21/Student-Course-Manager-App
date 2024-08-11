require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/course-routes');
const studentRoutes = require('./routes/student-routes');
const app = express();

const port = process.env.PORT ? process.env.PORT : '3000';

const authController = require('./controllers/auth.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

require('./config/database');



app.use(morgan('dev'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL
    })
  })
);

app.use(passUserToView);

app.use('/auth', authController);

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.set('view engine', 'ejs');


app.use('/courses', courseRoutes)
app.use('/students', studentRoutes)






app.listen(port, () => {
  console.log("Server listening on port", port)
});





