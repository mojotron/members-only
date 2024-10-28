import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const SQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_uid UUID PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  member BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE messages (
  message_uid UUID PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES users(user_uid),
  title VARCHAR(255),
  text TEXT,
  created_at TIMESTAMP NOT NULL
);
`;

const populate = async () => {
  try {
    console.log("db populate initialized...");
    const client = new Client({ connectionString: process.env.POSTGRESQL_URI });
    client.connect();
    console.log("db connected");
    client.query(SQL);
    client.end();
    console.log("db populate completed!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populate();
