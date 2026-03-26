const db = require('../engine.js'); // Notice the ../ to go up one folder

function getAdultUsers() {
    console.log("Running getAdultUsers query...");
    
    const result = db.query('users')
                    .where(user => user.age > 10)
                    .orderBy('age', 'desc')
                    .select(['name', 'age'])
                    .execute();
    return result;
}


function highestPaidEmp(){
    console.log("Running highestPaidEmp query...");

    const result = db.query('users')
                    .orderBy('salary')
                    .limit(3)
                    .select(['name', 'salary'])
                    .execute();
    return result;

}

function lowStockElectronics(){
    console.log("Running lowStockElectronics query...");
    const result = db.query('products')
                    .where(product => product.category === "Electronics") // 1. Filter
                    .orderBy('stock', 'asc')                              // 2. Sort lowest to highest
                    .first();                                             // 3. Grab the top item

    return result;
}

function deleteUserById(collectionName, id) {
    console.log(`Deleting item with id ${id} from collection ${collectionName}...`);
    const success = db.deleteById(collectionName, id);
    return success ? `Item with id ${id} deleted successfully from collection ${collectionName}.` : `Item with id ${id} not found in collection ${collectionName}.`;
}

function updateUserById(collectionName, id, updateObject) {
    console.log(`Updating item with id ${id} in collection ${collectionName}...`);
    const success = db.updateById(collectionName, id, updateObject);
    return success ? `Item with id ${id} updated successfully in collection ${collectionName}.` : `Item with id ${id} not found in collection ${collectionName}.`;
}

// Export the function so app.js can use it
module.exports = { getAdultUsers, highestPaidEmp, lowStockElectronics, deleteUserById, updateUserById };