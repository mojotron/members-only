import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user';
import { comparePasswords } from './passwordHelpers';

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (user === null) throw new Error(`no user with ${username} username`);
      const validPassword = await comparePasswords(password, user.password);
      if (validPassword === false) throw new Error('invalid user password');
      return done(false, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);

passport.serializeUser((user, done) => {
  return done(false, user); // TODO set id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user === null) throw new Error(`unknown user with id: ${id}`);
    return done(false, user);
  } catch (error) {
    return done(error, false);
  }
});
