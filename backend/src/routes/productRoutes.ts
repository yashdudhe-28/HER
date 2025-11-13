/**
 * Product Routes for VastraVerse
 * Handles product-related endpoints
 */

import { Router } from 'express';
import { 
  getAllProducts, 
  getProductsByCategory, 
  getProduct, 
  searchProducts,
  createProduct,
  updateProduct
} from '../controllers/productController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

// Protected routes (Admin only - optional)
router.post('/', authenticateToken, createProduct);
router.put('/:id', authenticateToken, updateProduct);

export default router;
