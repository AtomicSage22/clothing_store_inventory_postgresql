const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();


router.get('/add', productController.getAddProduct);

router.get('/:id', productController.getProduct);
router.post('/add', productController.addProduct);

module.exports = router;
