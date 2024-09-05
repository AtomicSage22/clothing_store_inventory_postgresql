const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/', categoryController.getCategories);


router.get('/add', categoryController.getAddCategory);

router.post('/add', categoryController.addCategory);

module.exports = router;
