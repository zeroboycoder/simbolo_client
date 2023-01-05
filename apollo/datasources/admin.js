const { MongoDataSource } = require("apollo-datasource-mongodb")

class Admin extends MongoDataSource {
    findOne(option) {
        return this.model.findOne(option)
    }
    createAdmin(data) {
        return this.model.create(data)
    }
    update(filter, update) {
        return this.model.updateOne(filter, update, { new: true })
    }
}

module.exports = Admin