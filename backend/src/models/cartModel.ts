/**
 * Cart Model for VastraVerse
 * Handles cart-related database operations
 */

import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface CartItem {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at?: Date;
  // Joined product data
  product_name?: string;
  product_price?: number;
  product_image?: string;
  product_stock?: number;
}

export class CartModel {
  // Add item to cart
  static async addItem(userId: number, productId: number, quantity: number = 1): Promise<boolean> {
    try {
      // Check if item already exists in cart
      const [existing] = await pool.execute<RowDataPacket[]>(
        'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );

      if (existing.length > 0) {
        // Update quantity if item exists
        const [result] = await pool.execute<ResultSetHeader>(
          'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
          [quantity, userId, productId]
        );
        return result.affectedRows > 0;
      } else {
        // Insert new item
        const [result] = await pool.execute<ResultSetHeader>(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
          [userId, productId, quantity]
        );
        return result.affectedRows > 0;
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return false;
    }
  }

  // Get all cart items for a user
  static async getCartItems(userId: number): Promise<CartItem[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT 
        c.id, c.user_id, c.product_id, c.quantity, c.created_at,
        p.name as product_name, p.price as product_price, 
        p.image as product_image, p.stock as product_stock
      FROM cart c 
      JOIN products p ON c.product_id = p.id 
      WHERE c.user_id = ? 
      ORDER BY c.created_at DESC`,
      [userId]
    );
    return rows as CartItem[];
  }

  // Update item quantity
  static async updateQuantity(userId: number, productId: number, quantity: number): Promise<boolean> {
    if (quantity <= 0) {
      return this.removeItem(userId, productId);
    }

    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId]
    );
    return result.affectedRows > 0;
  }

  // Remove item from cart
  static async removeItem(userId: number, productId: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return result.affectedRows > 0;
  }

  // Clear entire cart for user
  static async clearCart(userId: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM cart WHERE user_id = ?',
      [userId]
    );
    return result.affectedRows > 0;
  }

  // Get cart total
  static async getCartTotal(userId: number): Promise<{ totalItems: number; totalPrice: number }> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT 
        SUM(c.quantity) as totalItems,
        SUM(c.quantity * p.price) as totalPrice
      FROM cart c 
      JOIN products p ON c.product_id = p.id 
      WHERE c.user_id = ?`,
      [userId]
    );
    
    const result = rows[0] as any;
    return {
      totalItems: parseInt(result.totalItems) || 0,
      totalPrice: parseFloat(result.totalPrice) || 0
    };
  }

  // Check if item exists in cart
  static async itemExists(userId: number, productId: number): Promise<boolean> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows.length > 0;
  }
}
