const { MongoDataSource } = require('apollo-datasource-mongodb')

class File extends MongoDataSource {
    createFile(file) {
        return this.model.create(file)
    }
    findOne(filter) {
        return this.model.findOne(filter)
    }
}

module.exports = File;