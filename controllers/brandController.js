const db = require('../db/pool');

async function getBrands (req, res) {
    try {
        const result = await db.query(`
        SELECT * FROM Brands;
        `);
        res.render('brands', { brands: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}

async function getAddBrand (req, res) {
    try {
        res.render('addBrand');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}


async function addBrand (req, res) {
    try {
        const { name, description } = req.body;
        const result = await db.query(`
            IF NOT EXISTS (SELECT * FROM Brand WHERE name = $1)
            INSERT INTO Brand (name, description)
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
    getBrands,
    addBrand,
    getAddBrand
}