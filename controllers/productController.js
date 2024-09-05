const db = require('../db/pool');

const getProduct = async (req, res) => {
    productID = req.params.id;
    try {
        const result = await db.query(`
            SELECT p.name, p.description, c.name AS category_name, b.name AS brand_name, p.price, color_name, size
            FROM Products p
            JOIN Categories c ON p.category_id = c.id
            JOIN Brands b ON p.brand_id = b.id
            JOIN Colors ON p.color_id = Colors.id
            JOIN Sizes ON p.size_id = Sizes.id
            WHERE p.id = $1
        
        `, [productID]);
        res.render('product', { product: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}

const getAddProduct = async (req, res) => {
    try {
        const categories = await db.query(`SELECT DISTINCT * FROM Categories;`)
        
        const brands = await db.query(`SELECT DISTINCT * FROM Brands;`)
        const sizes = await db.query(`SELECT DISTINCT * FROM Sizes;`)
        const colors = await db.query(`SELECT DISTINCT * FROM Colors;`)
        res.render('addProduct', { categories: categories.rows, brands: brands.rows, sizes: sizes.rows, colors: colors.rows });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}


const addProduct = async (req, res) => {
    try {
        const { name, description, category_id, brand_id, price, size, color, quantity } = req.body;
        console.log(name, description, category_id, brand_id, price, size, color, quantity);
        const result = await db.query(`
            IF NOT EXISTS (SELECT * FROM Products WHERE name = $1)
            INSERT INTO Products (name, description, category_id, brand_id, price, size_id, color_id, quantity)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `, [name, description, category_id, brand_id, price, size, color, quantity]);
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error, req.body);
        res.status(500).json({ error: 'Database error' });
    }
}


module.exports = {
    addProduct,
    getProduct,
    getAddProduct
};
