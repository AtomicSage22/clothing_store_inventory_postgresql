const db = require('../db/pool');

async function getCategories (req, res) {
    try {
        const result = await db.query(`
        SELECT * FROM Categories;
        `);
        res.render('categories', { categories: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}

async function getAddCategory (req, res) {
    try {
        res.render('addCategory');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}


async function addCategory (req, res) {
    try {
        const { name, description } = req.body;
        const result = await db.query(`
            IF NOT EXISTS (SELECT * FROM Categories WHERE name = $1)
            INSERT INTO Categories (name, description)
            VALUES ($1, $2)
            RETURNING id
        `, [name, description]);
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error, req.body);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = {
    getCategories,
    addCategory,
    getAddCategory
}