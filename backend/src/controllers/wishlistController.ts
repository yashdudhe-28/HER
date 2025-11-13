/**
 * Wishlist Controller for VastraVerse
 * Handles wishlist-related operations
 */

import { Request, Response } from 'express';
import { WishlistModel } from '../models/wishlistModel';
import { ProductModel } from '../models/productModel';

// Get user's wishlist
export const getWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const wishlistItems = await WishlistModel.getWishlistItems(userId);
    const wishlistCount = await WishlistModel.getWishlistCount(userId);

    res.json({
      success: true,
      data: {
        items: wishlistItems,
        count: wishlistCount
      }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Add item to wishlist
export const addToWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
      return;
    }

    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    // Check if item already exists in wishlist
    const exists = await WishlistModel.itemExists(userId, productId);
    if (exists) {
      res.status(409).json({
        success: false,
        message: 'Item already in wishlist'
      });
      return;
    }

    const added = await WishlistModel.addItem(userId, productId);
    
    if (!added) {
      res.status(500).json({
        success: false,
        message: 'Failed to add item to wishlist'
      });
      return;
    }

    const wishlistCount = await WishlistModel.getWishlistCount(userId);

    res.json({
      success: true,
      message: 'Item added to wishlist successfully',
      data: { count: wishlistCount }
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
      return;
    }

    const removed = await WishlistModel.removeItem(userId, productId);
    
    if (!removed) {
      res.status(404).json({
        success: false,
        message: 'Item not found in wishlist'
      });
      return;
    }

    const wishlistCount = await WishlistModel.getWishlistCount(userId);

    res.json({
      success: true,
      message: 'Item removed from wishlist successfully',
      data: { count: wishlistCount }
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Move item from wishlist to cart
export const moveToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const productId = parseInt(req.params.productId);

    if (isNaN(productId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
      return;
    }

    // Check if product exists and has stock
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    if (product.stock < 1) {
      res.status(400).json({
        success: false,
        message: 'Product out of stock'
      });
      return;
    }

    // Check if item exists in wishlist
    const exists = await WishlistModel.itemExists(userId, productId);
    if (!exists) {
      res.status(404).json({
        success: false,
        message: 'Item not found in wishlist'
      });
      return;
    }

    const moved = await WishlistModel.moveToCart(userId, productId);
    
    if (!moved) {
      res.status(500).json({
        success: false,
        message: 'Failed to move item to cart'
      });
      return;
    }

    const wishlistCount = await WishlistModel.getWishlistCount(userId);

    res.json({
      success: true,
      message: 'Item moved to cart successfully',
      data: { count: wishlistCount }
    });
  } catch (error) {
    console.error('Move to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Clear entire wishlist
export const clearWishlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const cleared = await WishlistModel.clearWishlist(userId);
    
    if (!cleared) {
      res.status(400).json({
        success: false,
        message: 'Wishlist is already empty'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Wishlist cleared successfully'
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
