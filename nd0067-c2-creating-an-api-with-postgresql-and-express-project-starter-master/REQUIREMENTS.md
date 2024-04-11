### API Requirements
> The company's stakeholders want to set up an online storefront to showcase their fantastic product ideas.
> Users should be able to navigate an index of all products, view specific product details, and add products to an order that can be viewed in a cart page.


### API Endpoints
`GET /` - Overview The Storefront Product API

#### Products
- Index: `GET /products` - Get All products
- Show (args: product name): `GET /products/:productName` - Get a product info by product name
- Create (args: product name, product price) [token required]: `POST /products` - Create a product
- Delete (args: product id) [token required]: `DELETE /products` - Delete a product by product id

#### Users
- Index [token required]: `GET /users` - Get all users
- Show (args: username) [token required]: `GET /users/:username` - Get a user by username
- Create (args: first name, last name, username, password): `POST /users/register` - Create a user
- `POST /users/login` - Login account by username - password
- Delete (args: username): `DELETE /users` - DELETE specific user by username

#### Orders
- Index `GET /orders` - Get all orders
- Show (args: user id): `GET /orders/:userId` - Get orders by user id
- Create order (args: status, user id) [token required]: `POST /orders` - Create a order
- Delete (args: order id) [token required]: `DELETE /orders` - Delete a order by order id
- Create order with product quantity and product id (args: quantity, order id, product id) [token required]: `POST /orders/products` - Create order with product quantity and product id
- Delete order product (args: order product id) [token required]: `DELETE /orders/products` - Delete order product by order product id

### Data Shapes
#### Products
-  id
- name
- price

#### Users
- id
- firstname
- lastname
- username
- password

#### Orders
- id
- status of order (`ordered` / `shipped` / `delivered`)
- user_id

#### Order Products
- id
- quantity of each product in the order
- id of each order that products belong to
- id of each product in the order

### Tables
```shell
Table "public.products"
id |   name    | price
----+-----------+-------
```

```shell
Table "public.users"
id | username |                           password                           | firstname | lastname
----+----------+--------------------------------------------------------------+-----------+----------
```

```shell
Table "public.orders"
id | status  | user_id
----+---------+---------
```

```shell
Table "public.order_products"
 id | quantity | order_id | product_id
----+----------+----------+------------
```