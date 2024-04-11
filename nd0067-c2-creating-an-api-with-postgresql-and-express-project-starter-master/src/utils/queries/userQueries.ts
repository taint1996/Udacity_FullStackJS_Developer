const userQueries = {
  getAllUsers: "SELECT * from users",
  getUsersByUsername: "SELECT * FROM users WHERE username=($1)",
  create: "INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *",
  delete: "DELETE FROM users WHERE username=($1)"
}

export default userQueries;