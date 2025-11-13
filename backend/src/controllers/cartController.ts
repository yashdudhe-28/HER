/**
 * Cart Controller for VastraVerse
 * Handles cart-related operations
 */

import { Request, Response } from 'express';
import { CartModel } from '../models/cartModel';
import { ProductModel } from '../models/productModel';

// Get user's cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const cartItems = await CartModel.getCartItems(userId);
    const cartTotal = await CartModel.getCartTotal(userId);

    res.json({
      success: true,
      data: {
        items: cartItems,
        total: cartTotal
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Add item to cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
      return;
    }

    if (quantity <= 0) {
      res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
      return;
    }

    // Check if product exists and has enough stock
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    if (product.stock < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
      return;
    }

    const added = await CartModel.addItem(userId, productId, quantity);
    
    if (!added) {
      res.status(500).json({
        success: false,
        message: 'Failed to add item to cart'
      });
      return;
    }

    const cartTotal = await CartModel.getCartTotal(userId);

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: { total: cartTotal }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
      return;
    }

    if (quantity < 0) {
      res.status(400).json({
        success: false,
        message: 'Quantity cannot be negative'
      });
      return;
    }

    // Check product stock if increasing quantity
    if (quantity > 0) {
      const product = await ProductModel.findById(productId);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      if (product.stock < quantity) {
        res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        });
        return;
      }
    }

    const updated = await CartModel.updateQuantity(userId, productId, quantity);
    
    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
      return;
    }

    const cartTotal = await CartModel.getCartTotal(userId);

    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: { total: cartTotal }
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
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

    const removed = await CartModel.removeItem(userId, productId);
    
    if (!removed) {
      res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
      return;
    }

    const cartTotal = await CartModel.getCartTotal(userId);

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: { total: cartTotal }
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Clear entire cart
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const cleared = await CartModel.clearCart(userId);
    
    if (!cleared) {
      res.status(400).json({
        success: false,
        message: 'Cart is already empty'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
