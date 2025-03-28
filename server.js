const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./data/database');
const routes = require('./routes/index');
const cors = require('cors');
const port = process.env.PORT || 4000;
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

// Database connection
mongodb.connectDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
// The default error handler - https://tinyurl.com/2zh7fm8k
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
    // });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out') });

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    // console.log('User object:', req.user);
    req.session.user = req.user;
    res.redirect('/');
  }
);

app.listen(port, () => {
  console.log(`🔥 Web server is running on port: ${port}`);
});