CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) not null,
  password VARCHAR(1024),
  firstname VARCHAR(100),
  lastname VARCHAR(100)
);