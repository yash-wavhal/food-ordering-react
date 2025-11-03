import { pool } from "../config/db.js"

export async function getUser(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE email = $1",
      [req.user.email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};