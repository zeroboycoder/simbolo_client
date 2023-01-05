const bcrypt = require("bcrypt");
const { ObjectId } = require("mongoose").Types
const nodemailer = require('nodemailer')

const resolver = {
    Query: {
        healthCheck: async () => {
            return "Work!"
        },
        admin: async (_, { email }, { dataSources }) => {
            return await dataSources.admins.findOne({ email });
        },
        course: async (_, args, { dataSources }) => {
            const course = await dataSources.courses.getCourse(args.id)
            return course
        },
        courses: async (_, args, { dataSources }) => {
            const courses = await dataSources.courses.getCourses();
            return courses
        },
        categories: async (_, args, { dataSources }) => {
            return await await dataSources.categories.findMany();
        },
        instructor: async (_, args, { dataSources }) => {
            return await dataSources.instructors.getInstructor(args.id)
        },
        instructors: async (_, args, { dataSources }) => {
            const instructors = await dataSources.instructors.getInstructors();
            return instructors
        },
    },
    Mutation: {
        // Admin
        createAdmin: async (_, args, { dataSources }) => {
            return bcrypt.hash(args.admin.password, 10).then(async hash => {
                const data = { ...args.admin }
                data.password = hash;
                return await dataSources.admins.createAdmin(data)
            }).catch(err => console.log(err))
        },
        authAdmin: async (_, args, { dataSources }) => {
            const admin = await dataSources.admins.findOne({ email: args.admin.email })
            return bcrypt.compare(args.admin.password, admin.password)
                .then(success => {
                    if (!success) return;
                    return { _id: admin._id, name: admin.name, email: admin.email };
                })
        },
        updateAdmin: async (_, args, { dataSources }) => {
            let adminDTO = { ...args.admin };
            const admin = await dataSources.admins.findOne({ email: adminDTO.email });
            if (adminDTO.password) {
                const hash = await bcrypt.hash(adminDTO.password, 10)
                adminDTO.password = hash;
            }
            await dataSources.admins.update({ _id: new ObjectId(admin._id) }, {
                $set: {
                    ...adminDTO
                }
            })
            return { msg: true }
        },
        // Course
        createCourse: async (_, args, { dataSources }) => {
            const course = await dataSources.courses.createCourse(args.course);
            return course;
        },
        updateCourse: async (_, { courseId, course }, { dataSources }) => {
            await dataSources.courses.update({ _id: new ObjectId(courseId) }, {
                $set: {
                    ...course
                }
            })
            return { msg: true }
        },
        createCategory: async (_, { name }, { dataSources }) => {
            const category = await dataSources.categories.create({ name });
            return { _id: category._id }
        },
        // Instructor
        createInstructor: async (_, args, { dataSources }) => {
            return await dataSources.instructors.createInstructor(args.instructor);
        },
        updateInstructor: async (_, { instructorId, instructor }, { dataSources }) => {
            const newInstru = await dataSources.instructors.update({ _id: new ObjectId(instructorId) }, {
                $set: instructor
            })
            return { msg: true }
        },
        // OTP
        sendOTP: async (_, { email }, { dataSources }) => {
            const admin = await dataSources.admins.findOne({ email: email })
            console.log(admin)
            if (admin) {
                const generateOTPCode = Math.floor(100000 + Math.random() * 900000);
                // create reusable transporter object using the default SMTP transport
                const transporter = nodemailer.createTransport({
                    host: 'smtp-relay.sendinblue.com',
                    port: 587,
                    auth: {
                        user: 'pyaesonekhant1234@gmail.com',
                        pass: 'T3bw5jJXzpG7InSa'
                    }
                });
                // send mail with defined transport object
                await transporter.sendMail({
                    from: '"ZeroBoy 👻" <pyaesonekhant1234@gmail.com>', // sender address
                    to: admin.email, // receiver email
                    subject: "OTP Code", // Subject line
                    text: `Your login OTP code is ${generateOTPCode}. `, // plain text body
                });
                // Add the OTP code to the admin database
                await dataSources.admins.update({ _id: admin._id }, {
                    $set: {
                        otpCode: generateOTPCode
                    }
                })
                return { msg: "success" }
            } else {
                return { msg: "User not found." }
            }
        },
        verifyOTP: async (_, { email, otpCode }, { dataSources }) => {
            const admin = await dataSources.admins.findOne({ email: email });
            console.log(admin)
            if (admin.otpCode === otpCode) {
                return { msg: true }
            } else {
                return { msg: 'OTP wrong' }
            }
        },
        // Utils
        uploadFile: async (_, { file }, {
            dataSources,
        }) => {
            const createdFile = await dataSources.files.createFile(file);
            const fileId = {
                _id: createdFile._id,
            };
            return fileId;
        },

    },

    // ==================
    // Resolvers
    // ==================
    Instructor: {
        imageFile: async (instructor, _, { dataSources }) => {
            const file = await dataSources.files.findOne({ _id: instructor.imageId })
            return file
        }
    },
    Course: {
        instructor: async (course, _, { dataSources }) => {
            const instru = await dataSources.instructors.getInstructor(course.instructorId)
            return instru
        },
        imageFile: async (course, _, { dataSources }) => {
            const file = await dataSources.files.findOne({ _id: course.imageId });
            return file
        },
        categories: async (course, _, { dataSources }) => {
            const result = course.categoryIds.map(async cateId => {
                return await dataSources.categories.findOne({ _id: new ObjectId(cateId) })
            })
            return result
        },
    },
}

module.exports = resolver