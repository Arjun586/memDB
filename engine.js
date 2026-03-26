
const db = {
    collections : {},

    insert: function(collectionName, dataArray){

        this.collections[collectionName] = dataArray;

        return this;

    },

    deleteById: function(collectionName, id) {
    // Check if the collection exists, if not, return false
        if (!this.collections[collectionName]) return false;

        //  Overwrite the collection with a filtered version of itself
        this.collections[collectionName] = this.collections[collectionName].filter(item => item.id !== id);
        
        return true; // Indicate success
    },

    updateById: function(collectionName, id, updateObject) {
    // Check if the collection exists
        if (!this.collections[collectionName]) return false;

        const collection = this.collections[collectionName];

        // Find the exact index of the item using .findIndex()
        const index = collection.findIndex(item => item.id === id);

        // If findIndex returns -1, it means the item wasn't found. Return false.
        if (index === -1) return false;

        // Merge the old object with the updateObject using the spread operator
        collection[index] = { ...collection[index], ...updateObject };

        return true; // Indicate success
    },

    query: function(collectionName) {
    
    const originalArray = this.collections[collectionName];

    
        return {
            // Make a COPY of the array using the spread operator [...]
            // If we don't copy it, filtering will destroy our database data!
            results: [...originalArray],

            //  The where method takes a callback function (just like .filter)
            where: function(conditionCallback) {
            // We filter our temporary 'results' array
            // 'this' refers to this new QueryContext object, NOT the db object
            this.results = this.results.filter(conditionCallback);
            
            // Return 'this' (the QueryContext) so we can chain more methods later!
            return this; 
            },

            select: function(fieldsArray) {
            // 'fieldsArray' might be ['name', 'age']
            
            // We use map to transform each user object
            this.results = this.results.map(item => {
                let newObj = {};
                
                // We loop through the requested fields
                fieldsArray.forEach(field => {
                    // If the item has the field (e.g., item['name']), copy it to the new object
                    if (item[field] !== undefined) {
                        newObj[field] = item[field];
                    }
                });
                
                return newObj; // Replace the old user object with this smaller one
            });

            return this; // Keep the chain going!
            },

            
            orderBy: function(field, direction = 'asc') {
            
            // We use sort to compare two objects (a and b) based on the specific field
            this.results = this.results.sort((a, b) => {
                if (a[field] < b[field]) {
                return direction === 'asc' ? -1 : 1;
                }
                if (a[field] > b[field]) {
                return direction === 'asc' ? 1 : -1;
                }
                return 0; // They are equal
            });

            return this; // Keep the chain going!
            },


            limit: function(count) {
                // slice(0, count) takes a chunk of the array from index 0 up to 'count'
                this.results = this.results.slice(0, count);
                return this; 
            },

            
            execute: function() {
                return this.results;
            },

            first: function() {
                // Ends the chain and returns just the first object (or null if empty)
                return this.results.length > 0 ? this.results[0] : null;
            },
            count: function() {
                // Ends the chain and returns a number
                return this.results.length;
            }
        }
    }
}

module.exports = db;