const orderProductQueries = {
  create: "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *",
  delete: "DELETE FROM order_products WHERE id=($1)"
}

export default orderProductQueries;