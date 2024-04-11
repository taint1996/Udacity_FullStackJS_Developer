CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  quantity integer default 0,
  order_id bigint REFERENCES orders(id),
  product_id bigint REFERENCES products(id)
);