import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
});

async function connectDB() {
    try {
        await pool.connect();
        console.log("PostgreSQL Connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}

export {pool, connectDB};