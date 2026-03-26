
const db = require('./engine.js');
const { usersData, productsData } = require('./data.js');

// Import our separated query functions
const { getAdultUsers, highestPaidEmp, lowStockElectronics } = require('./queries/userQueries.js');


// 1. "Seed" (fill) the database first
db.insert('users', usersData)
  .insert('products', productsData);

console.log("Database seeded successfully!");

const adults = getAdultUsers();
console.log("Adult users (age > 10):");
console.log(adults);

const topEarners = highestPaidEmp();
console.log("Top 3 highest paid employees:");
console.log(topEarners);

const lowerstStock = lowStockElectronics();
console.log("Lowest stock electronics product:");
console.log(lowerstStock);