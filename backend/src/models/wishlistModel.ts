/**
 * Wishlist Model for VastraVerse
 * Handles wishlist-related database operations
 */

import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface WishlistItem {
  id?: number;
  user_id: number;
  product_id: number;
  created_at?: Date;
  // Joined product data
  product_name?: string;
  product_price?: number;
  product_image?: string;
  product_description?: string;
  product_stock?: number;
}

export class WishlistModel {
  // Add item to wishlist
  static async addItem(userId: number, productId: number): Promise<boolean> {
    try {
      const [result] = await pool.execute<ResultSetHeader>(
        'INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)',
        [userId, productId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      return false;
    }
  }

  // Get all wishlist items for a user
  static async getWishlistItems(userId: number): Promise<WishlistItem[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT 
        w.id, w.user_id, w.product_id, w.created_at,
        p.name as product_name, p.price as product_price, 
        p.image as product_image, p.description as product_description,
        p.stock as product_stock
      FROM wishlist w 
      JOIN products p ON w.product_id = p.id 
      WHERE w.user_id = ? 
      ORDER BY w.created_at DESC`,
      [userId]
    );
    return rows as WishlistItem[];
  }

  // Remove item from wishlist
  static async removeItem(userId: number, productId: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return result.affectedRows > 0;
  }

  // Clear entire wishlist for user
  static async clearWishlist(userId: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM wishlist WHERE user_id = ?',
      [userId]
    );
    return result.affectedRows > 0;
  }

  // Check if item exists in wishlist
  static async itemExists(userId: number, productId: number): Promise<boolean> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows.length > 0;
  }

  // Get wishlist count for user
  static async getWishlistCount(userId: number): Promise<number> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM wishlist WHERE user_id = ?',
      [userId]
    );
    return (rows[0] as any).count || 0;
  }

  // Move item from wishlist to cart
  static async moveToCart(userId: number, productId: number): Promise<boolean> {
    try {
      // Start transaction
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        // Add to cart
        await connection.execute(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1',
          [userId, productId]
        );

        // Remove from wishlist
        await connection.execute(
          'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
          [userId, productId]
        );

        await connection.commit();
        connection.release();
        return true;
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      console.error('Error moving item from wishlist to cart:', error);
      return false;
    }
  }
}
