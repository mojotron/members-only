import pool from "./pool.js";

type UserSignupType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type UserType = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  member: boolean;
  createdAt: Date;
};

const insertUser = async (userData: UserSignupType) => {
  const timestamp = new Date().toISOString();
  try {
    await pool.query(
      `INSERT INTO app_user
      (user_uid, first_name, last_name, email, password, member, created_at)
      VALUES(uuid_generate_v4(), $1, $2, $3, $4, false, $5);`,
      [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        timestamp,
      ]
    );
  } catch (error) {
    throw new Error("db error: insert new user");
  }
};

const selectUserAuth = async (
  email: string
): Promise<{ userUid: string; password: string } | undefined> => {
  try {
    const { rows } = await pool.query(
      `SELECT user_uid, password FROM app_user WHERE email = $1;`,
      [email]
    );
    const user = rows[0];
    if (user === undefined) return undefined;
    return {
      userUid: user.user_uid,
      password: user.password,
    };
  } catch (error) {
    throw new Error("db error: select user auth");
  }
};

const selectUser = async (
  userUid: string
): Promise<
  | {
      userUid: string;
      firstName: string;
      lastName: string;
      member: boolean;
      createdAt: string;
    }
  | undefined
> => {
  try {
    const { rows } = await pool.query(
      `SELECT user_uid, first_name, last_name, member, created_at 
      FROM app_user WHERE user_uid = $1;`,
      [userUid]
    );
    const user = rows[0];
    if (user === undefined) return undefined;
    return {
      userUid: user.user_uid,
      firstName: user.first_name,
      lastName: user.user_last_name,
      member: user.member,
      createdAt: user.created_at,
    };
  } catch (error) {
    throw new Error("db error: select user");
  }
};

export { insertUser, selectUserAuth, selectUser };
