const { MongoDataSource } = require('apollo-datasource-mongodb')

class Courses extends MongoDataSource {
    getCourse(courseId) {
        return this.model.findById(courseId)
    }
    getCourses() {
        return this.model.find().sort({ _id: -1 })
    }
    createCourse(dto) {
        return this.model.create(dto)
    }
    update(filter, dto) {
        return this.model.findOneAndUpdate(filter, dto, { new: true })
    }
}

module.exports = Courses;