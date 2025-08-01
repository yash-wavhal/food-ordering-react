import { pool } from "../config/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (exists.rows.length > 0) {
            res.status(400).json({ error: "User with this email already exists" });
        }

        const hashedpass = await bcrypt.hash(password, 10);

        const res = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
            [name, email, hashedpass]
        )
        res.json(res.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (exists.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const user = exists.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "3d" });

        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });

        res.json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.json({ message: "Logout successful" });
};