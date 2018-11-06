const express = require('express');

const app = express();
const server = require('http').Server(app);

const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
// const session = require('express-session'); var cookieParser =
// require('cookie-parser'); const MongoStore =
// require('connect-mongo')(session);

app.use(
	morgan(
		'[:date[clf]] ":method :url HTTP/:http-version" :status  :response-time ms'
	)
);

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

require('./models').connect(config.dbUri);
// app.use(session({     secret: 'mySecretString',     saveUninitialized: false,
//     resave: false,     cookie: {         maxAge: 1000 * 60 * 60 * 24 * 2 },
// // 2 days in milliseconds     store: new MongoStore({ mongooseConnection: db,
//         ttl: 2 * 24 * 60 * 60     })     //ttl: 2 days * 24 hours * 60
// minutes * 60 seconds }))
app.use(passport.initialize());
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

server.listen(8080, () => {
	console.log('server is running on port 8080');
});
