import passport from "passport";
import * as LocalStrategy from "passport-local";
import { selectUserAuth, selectUser } from "../db/queries.js";
import { compare } from "bcrypt";

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const strategy = new LocalStrategy.Strategy(
  customFields,
  async (email, password, done) => {
    try {
      console.log("verify");

      if (!email) return done(null, false);
      const user = await selectUserAuth(email);
      if (user === undefined)
        return done(null, false, { message: "invalid email or password" });

      const isValidPassword = await compare(password, user.password);
      if (isValidPassword == false)
        return done(null, false, { message: "invalid email or password" });

      return done(null, { userId: user.userUid });
    } catch (error) {
      return done(error);
    }
  }
);

passport.serializeUser((user, done) => {
  console.log("serialize");

  const { userId } = user as { userId: string };
  done(null, userId);
});

passport.deserializeUser(async (userUid, done) => {
  console.log("deserialize");

  try {
    const user = await selectUser(userUid as string);
    done(false, user);
  } catch (error) {
    done(error);
  }
});

export default strategy;
