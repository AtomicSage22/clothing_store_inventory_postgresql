const db = require('../db/pool');

async function getContent (req, res) {
  try {
    const result = await db.query(`
      SELECT p.name, p.description, c.name AS category_name, b.name AS brand_name, p.price, p.id
      FROM Products p
      JOIN Categories c ON p.category_id = c.id
      JOIN Brands b ON p.brand_id = b.id
    `);
    res.render('index', { products: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }

}


module.exports = {
    getContent,
    };
