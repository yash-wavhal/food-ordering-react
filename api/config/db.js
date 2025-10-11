import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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