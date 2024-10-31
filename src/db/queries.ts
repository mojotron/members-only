import pool from "./pool.js";

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  member: boolean;
};

const insertUser = async (userData: UserType) => {
  const timestamp = new Date().toISOString();
  try {
    await pool.query(
      `INSERT INTO app_user
      (uuid, first_name, last_name, email, password, member, created_at)
      VALUES(uuid_generate_v4(), $1, $2, $3, $4, false, timestamp);`,
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

export { insertUser };
