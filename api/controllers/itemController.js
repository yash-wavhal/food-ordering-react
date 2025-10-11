import { pool } from "../config/db.js";

export async function getAllFoodItems(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { rows } = await pool.query(
            "SELECT * FROM food_items ORDER BY id LIMIT $1 OFFSET $2",
            [limit, offset]
        );

        const { rows: totalRows } = await pool.query("SELECT COUNT(*) FROM food_items");
        const totalItems = parseInt(totalRows[0].count);
        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            page,
            totalPages,
            totalItems,
            items: rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getFoodItem(req, res) {
    const { itemid } = req.params;

    try {
        const { rows } = await pool.query(
            "SELECT * FROM food_items WHERE id = $1",
            [itemid]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getFoodItemsByType(req, res) {
    const { type } = req.params;

    try {
        const { rows } = await pool.query(
            "SELECT * FROM food_items WHERE foodtype = $1",
            [type]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function saveFoodItem(req, res) {
    try {
        const {
            foodType,
            category,
            name,
            price,
            discount = 0,
            rating,
            image,
            deliveryTime,
            description,
            ingredients,
            veg,
            isAvailable = true,
            quantity = 0,
            hotelName,
            address
        } = req.body;

        const query = `
            INSERT INTO food_items 
            (foodType, category, name, price, discount, rating, image, deliveryTime, description, ingredients, veg, isAvailable, quantity, hotelName, address) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING *;
        `;

        const values = [
            foodType,
            category,
            name,
            price,
            discount,
            rating,
            image,
            deliveryTime,
            description,
            ingredients,
            veg,
            isAvailable,
            quantity,
            hotelName,
            address
        ];

        const { rows } = await pool.query(query, values);

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}