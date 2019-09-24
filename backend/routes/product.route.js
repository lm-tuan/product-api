const express = require('express');
const productController = require('./../controllers/product.controller');
const authMiddleware = require('./../middlewares/auth.middleware'); 

const router = express.Router();

router.get('/',authMiddleware.authMiddleware,productController.index);
router.post('/',productController.create);
router.get('/:id',productController.getbyid);
router.delete('/:id',productController.delete);
router.put('/:id',productController.update);


module.exports = router;