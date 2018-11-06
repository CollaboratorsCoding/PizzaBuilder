const express = require('express');

const app = express();
const server = require('http').Server(app);

const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

app.use(
	morgan(
		'[:date[clf]] ":method :url HTTP/:http-version" :status  :response-time ms'
	)
);

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./models').connect(config.dbUri);

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
