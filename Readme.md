# MemDB

MemDB is a custom in-memory database engine built using core JavaScript.

This project was created to deeply understand how JavaScript works behind the scenes using:
- objects
- arrays
- functions
- method chaining
- dynamic property access
- `this` keyword
- modular file structure

Instead of using a real database, this project stores collections in memory and allows chained queries like filtering, sorting, selecting fields, limiting results, and returning computed outputs.

## Project Goal

The goal of this project is not just to "make something work" but to understand:

- how object methods use `this`
- how chaining works using `return this`
- how data can flow through multiple transformation steps
- how query builders work internally
- how modular Node.js files share the same exported object

## Features

- Insert collections into memory
- Query a collection by name
- Filter records using `where()`
- Sort records using `orderBy()`
- Select only specific fields using `select()`
- Limit the number of results using `limit()`
- Return full results using `execute()`
- Return only the first result using `first()`
- Return the number of matching results using `count()`

## Folder Structure

```bash
memdb/
├── app.js
├── data.js
├── engine.js
├── README.md
└── queries/
    └── userQueries.js
```

## How It Works

### 1. Insert data
Data is stored inside the `collections` object.

Example:
```js
db.insert('users', usersData);
```

### 2. Start a query
A query creates a new query context with a copied array.

Example:
```js
db.query('users')
```

### 3. Chain methods
Each intermediate method updates the temporary `results` array and returns the same query object.

Example:
```js
db.query('users')
  .where(user => user.age > 18)
  .orderBy('salary', 'desc')
  .select(['name', 'salary'])
  .execute();
```

### 4. Finish the chain
Terminal methods return final output instead of returning `this`.

Examples:
- `execute()` returns an array
- `first()` returns one object
- `count()` returns a number

## Example Data

This project includes sample datasets such as:

- users
- products

Example user object:
```js
{
  id: 1,
  name: "Alice",
  age: 25,
  department: "Engineering",
  salary: 85000
}
```

Example product object:
```js
{
  id: 101,
  name: "Laptop Pro",
  category: "Electronics",
  price: 1299,
  stock: 45
}
```

## Example Queries

### Get top 3 highest-paid employees
```js
const topEmployees = db.query('users')
  .orderBy('salary', 'desc')
  .limit(3)
  .select(['name', 'salary'])
  .execute();
```

### Get lowest-stock electronics product
```js
const lowStockProduct = db.query('products')
  .where(product => product.category === "Electronics")
  .orderBy('stock', 'asc')
  .first();
```

### Count marketing employees
```js
const marketingCount = db.query('users')
  .where(user => user.department === "Marketing")
  .count();
```

## Key JavaScript Concepts Used

- Object literals
- Dynamic keys with bracket notation
- Array methods: `filter`, `map`, `sort`, `slice`
- Function callbacks
- Method chaining
- `this` binding in regular functions
- Module exports and imports in Node.js

## Important Learning Points

### Why `return this` matters
Methods like `where()`, `select()`, `orderBy()`, and `limit()` return `this` so the chain can continue.

### Why `query()` returns a new object
The main database object should not directly handle filtering state.  
Instead, `query()` returns a separate query context object that stores temporary results.

### Why data is copied
The original collection is copied so the query does not mutate the original database.

Example:
```js
results: [...originalArray]
```

### Why terminal methods do not return `this`
Methods like `execute()`, `first()`, and `count()` end the chain because they return final values.

## How to Run

Make sure Node.js is installed, then run:

```bash
node app.js
```

## Future Improvements

Possible next features:
- `findById()`
- `update()`
- `delete()`
- `groupBy()`
- `sum()`
- `avg()`
- support for multiple query files
- better error handling for missing collections

## Why This Project Matters

This project demonstrates real understanding of JavaScript fundamentals by building something architectural instead of only solving syntax exercises.

It is a strong beginner-to-intermediate portfolio project because it shows:
- problem solving
- code organization
- chaining logic
- reusable design
- understanding of JavaScript internals

## Author

Built by Arjun
