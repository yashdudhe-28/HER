/**
 * User Model for VastraVerse
 * Handles user-related database operations with Supabase
 */

import { supabase } from '../config/db';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserResponse extends Omit<User, 'password'> {}

export class UserModel {
  // Create a new user
  static async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User | null> {
    try {
      const { name, email, password, phone, address } = userData;
      const { data, error } = await supabase
        .from('users')
        .insert({
          name,
          email,
          password,
          phone: phone || null,
          address: address || null
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating user:', error);
        throw error;
      }
      
      return data as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        console.error('Error finding user by email:', error);
        throw error;
      }
      
      return data as User;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Find user by ID
  static async findById(id: number): Promise<UserResponse | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, phone, address, created_at, updated_at')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        console.error('Error finding user by ID:', error);
        throw error;
      }
      
      return data as UserResponse;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(id: number, updateData: Partial<Omit<User, 'id' | 'email' | 'password' | 'created_at' | 'updated_at'>>): Promise<User | null> {
    try {
      const { name, phone, address } = updateData;
      const { data, error } = await supabase
        .from('users')
        .update({
          name,
          phone: phone || null,
          address: address || null
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
      
      return data as User;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  // Check if email exists
  static async emailExists(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return false; // No rows found
        }
        console.error('Error checking email existence:', error);
        throw error;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking email existence:', error);
      throw error;
    }
  }
}
