// import pkg from "pg";
// const { Pool } = pkg;
// import dotenv from "dotenv";
// dotenv.config();

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// async function connectDB() {
//     try {
//         await pool.connect();
//         console.log("PostgreSQL Connected");
//     } catch (err) {
//         console.error("DB Connection Error:", err);
//     }
// }

// export { pool, connectDB };

import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.NEON_DATABASE_URL
    : process.env.POSTGRES_DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

async function connectDB() {
  try {
    await pool.connect();
    console.log("PostgreSQL Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

export { pool, connectDB };
