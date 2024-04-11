const productQueries = {
  getAll: "SELECT * from products",
  getAllProductsByName: "SELECT * FROM products WHERE name=($1)",
  create: "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *",
  delete: "DELETE FROM products WHERE name=($1)"
}

export default productQueries;