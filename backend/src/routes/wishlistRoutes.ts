/**
 * Wishlist Routes for VastraVerse
 * Handles wishlist-related endpoints
 */

import { Router } from 'express';
import { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist, 
  moveToCart, 
  clearWishlist 
} from '../controllers/wishlistController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// All wishlist routes require authentication
router.use(authenticateToken);

router.get('/', getWishlist);
router.post('/add', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);
router.post('/move-to-cart/:productId', moveToCart);
router.delete('/clear', clearWishlist);

export default router;
