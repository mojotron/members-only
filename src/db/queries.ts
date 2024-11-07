import pool from "./pool.js";
import type { AppUserType, UserSignupType } from "../types/userTypes.js";
import { MessageCardType } from "../types/messagesTypes.js";

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
): Promise<AppUserType | undefined> => {
  try {
    const { rows } = await pool.query(
      `SELECT 
      user_uid AS "userUid",
      first_name AS "firstName",
      last_name AS "lastName",
      member,
      created_at AS "createdAt" 
      FROM app_user WHERE user_uid = $1;`,
      [userUid]
    );
    const user = rows[0];

    return user;
  } catch (error) {
    throw new Error("db error: select user");
  }
};

// messages
const insertMessage = async (userUid: string, title: string, text: string) => {
  try {
    const timestamp = new Date().toISOString();
    await pool.query(
      `
    INSERT INTO message (message_uid, user_id, title, text, created_at)
    VALUES (uuid_generate_v4(), $1, $2, $3, $4);
    `,
      [userUid, title, text, timestamp]
    );
  } catch (error) {
    throw new Error("db error: insert message");
  }
};

const selectMessagesByUserUid = async (
  userUid: string
): Promise<MessageCardType[]> => {
  try {
    const { rows } = await pool.query(
      `SELECT
      message.message_uid AS "messageUid",
      message.title,
      message.created_at AS "createdAt",
      app_user.user_uid AS "userUid"
      FROM message INNER JOIN app_user
      ON message.user_id = app_user.user_uid
      WHERE user_id = $1
      ORDER BY message.created_at ASC;`,
      [userUid]
    );

    return rows;
  } catch (error) {
    console.log(error);
    throw new Error("db error: select messages by user uid");
  }
};

export {
  // auth
  insertUser,
  selectUserAuth,
  selectUser,
  // messages
  insertMessage,
  selectMessagesByUserUid,
};
