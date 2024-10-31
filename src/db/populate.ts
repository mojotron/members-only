import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS app_user;
DROP TABLE IF EXISTS massage;
DROP INDEX IF EXISTS IDX_session_expire;

CREATE TABLE session (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE app_user (
  user_uid UUID PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  member BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE message (
  message_uid UUID PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES app_user(user_uid),
  title VARCHAR(255),
  text TEXT,
  created_at TIMESTAMP NOT NULL
);
`;

const populate = async () => {
  try {
    console.log("db populate initialized...");
    const client = new Client({ connectionString: process.env.POSTGRESQL_URI });
    await client.connect();
    console.log("db connected");
    await client.query(SQL);
    await client.end();
    console.log("db populate completed!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
