const { MongoDataSource } = require('apollo-datasource-mongodb')

class Category extends MongoDataSource {
    findOne(filter) {
        return this.collection.findOne(filter);
    }

    findMany(filter, options) {
        return this.model.find(filter, options);
    }

    create(data) {
        return this.model.create(data);
    }

    createMany(data) {
        return this.collection.insertMany(data);
    }

    update(filter, update) {
        return this.model.findOneAndUpdate(filter, update, { new: true });
    }

    updateMany(filter, update) {
        return this.collection.updateMany(filter, update, { new: true });
    }
}

module.exports = Category;