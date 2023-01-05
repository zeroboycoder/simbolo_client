const { gql } = require('apollo-server-express')

const typeDefs = gql`
    scalar JSON
    scalar Byte
    scalar DateTime

    type Query {
        healthCheck: String
        admin(email: String): Admin
        course(id: ID): Course
        courses: [Course]
        categories: [Category]
        instructor(id: ID): Instructor
        instructors: [Instructor]
    }
    type Mutation{
        createAdmin(admin: adminDTO!): Admin
        authAdmin(admin: adminDTO): JSON
        updateAdmin(admin: adminDTO!): JSON
        createCourse(course: courseDTO!): Course
        updateCourse(courseId: ID!, course: courseDTO!): JSON
        createInstructor(instructor: instructorDTO!): Instructor
        updateInstructor(instructorId: ID!, instructor: instructorDTO!): JSON
        createCategory(name:String!): JSON
        uploadFile(file: fileDTO!): JSON
        sendOTP(email: String!): JSON
        verifyOTP(email: String!, otpCode: Int): JSON
    }

    type Admin{
        _id: ID!
        name: String
        email: String!
    }
    type Course{
        _id: ID!
        title: String!
        descriptionMy: String
        descriptionEng: String
        instructor: Instructor!
        imageFile: File
        categories: [Category]
        duration: String
        batch: Int
        level: String
        startDate: String
        fee: String
        day: [String]
        startTime: String
        endTime: String
        curriculums: [Curriculum]
    }
    type Instructor {
        _id: ID!
        name: String!
        imageFile: File
        education: String
        position: String
        workExperience: String
        specialistField: String
        description: String
    }
    type Curriculum {
        module: String,
        context: [String]
    }
    type Category {
        _id: ID
        name: String
    }
    type File {
        _id: ID
        name: String
        data: Byte
        type: String
    }

    # =================
    # Input DTOs
    # =================
    input adminDTO{
        name: String
        email: String!
        password: String
    }
    input courseDTO {
        title: String!
        instructorId: ID!
        imageId: String
        categoryIds: [ID]
        duration: String
        level: String
        batch: Int
        startDate: String
        fee: String
        day: [String]
        startTime: String
        endTime: String
        descriptionMy: String
        descriptionEng: String
        curriculums: [CurriculumDTO]
    }
    input instructorDTO {
        name: String!
        imageId: String
        education: String
        position: String
        workExperience: String
        specialistField: String
        description: String
    }
    input fileDTO {
        data: Byte!
        name: String
        type: String
        mimeType: String
        encoding: String
        fileType: String
        metadata: JSON
    }
    input CurriculumDTO {
        module: String,
        context: [String]
    }
`

module.exports = typeDefs