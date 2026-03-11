const mongoose = require('mongoose');

const cache ={};

async function getOrCreate(collectionName,fieldName,value){
    if(!value){
        return null;
    }
    if(!cache[collectionName]){
        cache[collectionName] = {};
    }
    if(cache[collectionName][value]){
        return cache[collectionName][value];
    }
    const collection = mongoose.connection.collection(collectionName);
    const query ={};
    query[`source.${fieldName}`] = value;

    const existing = await collection.findOne(query);
    if(existing){
        cache[collectionName][value] = existing._id;
        return existing._id;
    }
    const newDoc = {
        source: {
            [fieldName] : value
        }
    };
    const result = await collection.insertOne(newDoc);
    cache[collectionName][value] = result.insertedId;
    return result.insertedId;
}

module.exports ={
    getOrCreate
};