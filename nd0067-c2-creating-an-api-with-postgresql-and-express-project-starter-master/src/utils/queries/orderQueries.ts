const orderQueries = {
  getAllOrders: "SELECT * from orders",
  getOrdersByUserId: "SELECT * FROM orders WHERE user_id=($1)",
  create: "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *",
  delete: "DELETE FROM orders WHERE id=($1)"
}

export default orderQueries;