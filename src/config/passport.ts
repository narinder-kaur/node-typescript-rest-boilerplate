import passport from "passport";
import passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import passportJWT from 'passport-jwt';

import _ from "lodash";

// import { User, UserType } from '../models/User';
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new passportJWT.Strategy({
  jwtFromRequest: passportJWT.ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'mysecrete'
},
  function (jwtPayload: any, cb: any) {
    console.log('JWTPAYLOAD', jwtPayload);
  }
));


/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
