const { MongoDataSource } = require('apollo-datasource-mongodb')

class Instructor extends MongoDataSource {
    getInstructor(instructorId) {
        return this.findOneById(instructorId)
    }
    getInstructors() {
        return this.model.find()
    }
    createInstructor(dto) {
        return this.model.create(dto)
    }
    update(filter, update) {
        return this.model.findOneAndUpdate(filter, update, { new: true });
    }
    updateMany(filter, update) {
        return this.collection.updateMany(filter, update, { new: true });
    }
}

module.exports = Instructor;