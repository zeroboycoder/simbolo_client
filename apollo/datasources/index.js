const { models } = require("../../mongoose/schema")
const adminDatasource = require("./admin")
const courseDatasource = require('./course');
const categoryDatasource = require("./category")
const instructorDatasource = require("./instructor")
const fileDataSource = require("./file");

const datasource = {
    admins: new adminDatasource(models.Admin),
    courses: new courseDatasource(models.Course),
    categories: new categoryDatasource(models.Category),
    instructors: new instructorDatasource(models.Instructor),
    files: new fileDataSource(models.File)
}

module.exports = datasource;