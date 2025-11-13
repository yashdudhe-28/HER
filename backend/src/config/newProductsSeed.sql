-- Updated Product Data for VastraVerse with Rating and Sizes
-- Run this in Supabase SQL Editor after creating the tables

INSERT INTO products (name, description, price, category, image, stock, rating, sizes) VALUES
('Royal Blue Kurta Set', 'Elegant royal blue cotton kurta with white churidar pants. Perfect for festive and traditional occasions.', 1499.00, 'men', 'https://images.unsplash.com/photo-1620794341550-6c89e6b8d1ab?w=600&auto=format', 25, 4.7, ARRAY['S', 'M', 'L', 'XL']),

('Silk Saree with Zari Border', 'Beautiful red silk saree with intricate golden zari border and pallu work. Ideal for weddings and festivals.', 2599.00, 'women', 'https://images.unsplash.com/photo-1582651051604-58d7f6f3e8a4?w=600&auto=format', 20, 4.8, ARRAY['Free Size']),

('Cotton Printed Shirt', 'Soft and breathable cotton shirt with Indian block print pattern. Pairs well with jeans or chinos.', 999.00, 'men', 'https://images.unsplash.com/photo-1520975922203-27d7c9691a49?w=600&auto=format', 30, 4.4, ARRAY['S', 'M', 'L', 'XL', 'XXL']),

('Floral Anarkali Gown', 'Graceful floor-length Anarkali gown with floral prints and soft georgette fabric. A perfect festive outfit.', 1899.00, 'women', 'https://images.unsplash.com/photo-1616469829960-18aef209d661?w=600&auto=format', 18, 4.6, ARRAY['S', 'M', 'L', 'XL']),

('Indigo Denim Jacket', 'Trendy indigo blue denim jacket with stitched pocket design. Ideal for cool casual outings.', 1799.00, 'men', 'https://images.unsplash.com/photo-1593032465171-8f0b7a0b78cd?w=600&auto=format', 35, 4.5, ARRAY['S', 'M', 'L', 'XL']),

('Pastel Lehenga Choli', 'Pastel pink lehenga choli set with mirror work and embroidered dupatta. Lightweight and elegant.', 3299.00, 'women', 'https://images.unsplash.com/photo-1622021830629-066c09ad248c?w=600&auto=format', 12, 4.9, ARRAY['S', 'M', 'L']),

('Handloom Kurta', 'Classic beige handloom cotton kurta with mandarin collar and wooden buttons. Comfortable daily ethnic wear.', 1399.00, 'men', 'https://images.unsplash.com/photo-1621786860304-1b1a0a0197a1?w=600&auto=format', 22, 4.6, ARRAY['S', 'M', 'L', 'XL']),

('Chikankari Kurti', 'Beautiful white chikankari embroidered kurti, handcrafted from Lucknow. Perfect for summer wear.', 1099.00, 'women', 'https://images.unsplash.com/photo-1617034182210-91e5336b4999?w=600&auto=format', 28, 4.5, ARRAY['S', 'M', 'L', 'XL']),

('Graphic T-Shirt', 'Comfortable cotton T-shirt with trendy printed design. A must-have for youth fashion.', 699.00, 'men', 'https://images.unsplash.com/photo-1618354691213-39d1f1aa8d1e?w=600&auto=format', 60, 4.3, ARRAY['S', 'M', 'L', 'XL', 'XXL']),

('Embroidered Dupatta', 'Soft chiffon dupatta with zari embroidery and tassels. Adds elegance to any ethnic outfit.', 599.00, 'women', 'https://images.unsplash.com/photo-1622021830567-4d07da4d7959?w=600&auto=format', 40, 4.4, ARRAY['Free Size']),

-- Additional products for variety
('Bandhgala Suit', 'Royal bandhgala suit with intricate embroidery. Perfect for weddings and formal occasions. Includes matching pants.', 5999.00, 'traditional', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format', 8, 4.8, ARRAY['S', 'M', 'L', 'XL']),

('Designer Palazzo Set', 'Trendy palazzo set with matching top. Comfortable and stylish for casual wear. Breathable fabric perfect for summers.', 1599.00, 'women', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format', 32, 4.5, ARRAY['S', 'M', 'L', 'XL']),

('Kids Ethnic Set', 'Adorable ethnic wear set for kids. Includes kurta and dhoti/lehenga. Perfect for festivals and family functions.', 799.00, 'kids', 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&auto=format', 45, 4.7, ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y']),

('Nehru Jacket', 'Classic Nehru jacket that can be paired with kurta or shirt. Versatile piece for ethnic and semi-formal looks.', 1499.00, 'traditional', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format', 18, 4.6, ARRAY['S', 'M', 'L', 'XL']),

('Cotton Casual Dress', 'Comfortable cotton dress with modern prints. Perfect for daily wear and casual outings.', 1299.00, 'women', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format', 25, 4.4, ARRAY['S', 'M', 'L', 'XL']);
