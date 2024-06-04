import pkg from "pg";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

class Repositories {
  async queryDB(sql: string, args: any[]) {
    const client = await pool.connect();
    try {
      const data = await client.query(sql, args);
      return data;
    } catch (err) {
      console.log("error in query: ", err)
      return err;
    } finally {
      client.release();
    }
  }
}

export default Repositories;
