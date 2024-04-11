import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_PORT,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

const client = new Pool({
  host: POSTGRES_HOST,
  port: POSTGRES_PORT as unknown as number,
  database: ENV === 'dev' ? POSTGRES_DB_DEV : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
})

export default client;
