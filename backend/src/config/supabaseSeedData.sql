-- Sample Product Data for VastraVerse (Supabase/PostgreSQL)
-- Insert sample products for demonstration

INSERT INTO products (name, description, price, category, image, stock, rating, sizes) VALUES
-- Men's Collection
('Classic Cotton Kurta', 'Comfortable cotton kurta perfect for casual and festive occasions. Made from premium quality cotton with traditional embroidery.', 1299.00, 'men', 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=500&fit=crop', 25),

('Silk Dhoti Set', 'Traditional silk dhoti with matching kurta. Perfect for weddings and religious ceremonies. Handwoven silk fabric.', 2499.00, 'traditional', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop', 15),

('Casual Denim Jacket', 'Modern denim jacket with contemporary fit. Perfect for casual outings and college wear.', 1899.00, 'men', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', 30),

-- Women's Collection
('Elegant Saree', 'Beautiful silk saree with intricate border work. Perfect for special occasions and festivals. Includes matching blouse piece.', 3499.00, 'women', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop', 20),

('Designer Lehenga Choli', 'Stunning lehenga choli with heavy embroidery work. Perfect for weddings and celebrations. Semi-stitched for custom fitting.', 8999.00, 'traditional', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop', 8),

('Cotton Kurti', 'Comfortable cotton kurti with modern prints. Perfect for daily wear and office. Available in multiple colors.', 899.00, 'women', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', 40),

('Palazzo Set', 'Trendy palazzo set with matching top. Comfortable and stylish for casual wear. Breathable fabric perfect for summers.', 1599.00, 'women', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop', 35),

-- Kids Collection
('Kids Ethnic Wear Set', 'Adorable ethnic wear set for kids. Includes kurta and dhoti/lehenga. Perfect for festivals and family functions.', 799.00, 'kids', 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&h=500&fit=crop', 50),

('Casual T-Shirt', 'Comfortable cotton t-shirt for kids. Soft fabric with fun prints. Perfect for daily wear and play.', 399.00, 'kids', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop', 60),

-- Traditional Collection
('Bandhgala Suit', 'Royal bandhgala suit with intricate embroidery. Perfect for weddings and formal occasions. Includes matching pants.', 5999.00, 'traditional', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop', 12),

('Anarkali Dress', 'Graceful anarkali dress with flowing silhouette. Perfect for parties and celebrations. Beautiful embroidery work.', 2799.00, 'traditional', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', 18),

('Nehru Jacket', 'Classic Nehru jacket that can be paired with kurta or shirt. Versatile piece for ethnic and semi-formal looks.', 1499.00, 'traditional', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop', 22);

-- Additional products for better variety
INSERT INTO products (name, description, price, category, image, stock) VALUES
('Formal Shirt', 'Crisp white formal shirt perfect for office and business meetings. Premium cotton fabric with comfortable fit.', 1199.00, 'men', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop', 45),

('Chinos Pants', 'Comfortable chinos pants in khaki color. Perfect for casual and semi-formal occasions.', 1799.00, 'men', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop', 35),

('Floral Maxi Dress', 'Beautiful floral maxi dress perfect for summer outings and casual parties. Lightweight and comfortable.', 1999.00, 'women', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop', 28),

('Denim Jeans', 'Classic blue denim jeans with comfortable fit. Perfect for casual wear and weekend outings.', 2299.00, 'women', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', 42),

('Kids Party Dress', 'Adorable party dress for little girls. Perfect for birthdays and special occasions. Available in multiple colors.', 1299.00, 'kids', 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&h=500&fit=crop', 25),

('Boys Polo Shirt', 'Comfortable polo shirt for boys. Perfect for school and casual wear. Available in various colors.', 699.00, 'kids', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop', 55),

('Silk Scarf', 'Elegant silk scarf with traditional Indian prints. Perfect accessory for any outfit.', 899.00, 'women', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', 30),

('Leather Belt', 'Premium leather belt for men. Perfect accessory for formal and casual wear.', 1599.00, 'men', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', 40);
