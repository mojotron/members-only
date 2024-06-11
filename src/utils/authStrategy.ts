import { Express } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/user';
import { comparePasswords } from './passwordHelpers';
import { LoginError } from '../errors/index';

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (user === null) {
        throw new LoginError(
          `no user with ${username} username`,
          {
            username: `no user with ${username} username`,
          },
          { username, password },
        );
      }

      const validPassword = await comparePasswords(password, user.password);

      if (validPassword === false) {
        throw new LoginError(
          'invalid user password',
          {
            password: 'invalid passport',
          },
          { username, password },
        );
      }

      done(false, user);
    } catch (error) {
      done(error, false);
    }
  }),
);

passport.serializeUser((user, done) => {
  const { _id } = user as Express.User & { _id: string };
  done(false, _id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user === null) throw new Error(`unknown user with id: ${id}`);
    done(false, {
      username: user.username,
      userId: user._id,
      isMember: user.isMember,
    });
  } catch (error) {
    done(error, false);
  }
});
