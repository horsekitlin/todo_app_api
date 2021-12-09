const passport = require('passport');
const passportJWT = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { validateUserAndPassword } = require('../helpers/utils');
const { getUserWithPasswordBy } = require('../services/userServices');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { AUTH_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_DOMAIN  } = process.env;

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${FACEBOOK_CALLBACK_DOMAIN}/auth/facebook/callback`,
},
async function(accessToken, refreshToken, profile, done) {
  done(null, {
    accessToken,
    refreshToken,
    profile,
  });
}
));

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const user = await getUserWithPasswordBy(email);
      const { validated } = validateUserAndPassword(user, password);

      if (!validated) {
        const message = '使用者不存在或密碼錯誤';
        const notfoundError = new Error(message);
        return done(notfoundError, null, { message });
      }
      return done(null, user);
    }
  )
);


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: AUTH_SECRET
},
  function (jwtPayload, done) {
    done(null, jwtPayload, { message: 'Logged In Successfully' });
  }
));

//Todo: 新增 session
passport.serializeUser((user, done) => {
  done(null, user);
});
//Todo: 移除 session
passport.deserializeUser((user, done) => {
  done(null, user);
});

const jwtAuthorizationMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      const err = {
        success: false,
        data: {
          message: info.message,
        }        
      };

      return res.status(401).json(err); // send the error response to client
    }
    req.user = user;
    return next(null, user);
  })(req, res, next);
}

module.exports.jwtAuthorizationMiddleware = jwtAuthorizationMiddleware;
