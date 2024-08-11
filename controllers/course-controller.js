const Course = require('../models/course');
const Student = require('../models/student');

exports.renderNewPage = (req, res) => res.render('courses/new.ejs');

exports.renderUpdatePage = async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('courses/edit.ejs', { course })
}


exports.createCourse = async (req, res) => {

    try {
        const { name, lessons } = req.body;

        const course = await Course.create({ name, lessons });

        res.status(200).json({ success: true, course })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })

    }

}

exports.getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.render('courses/index.ejs', { courses });
};


exports.coursesListForStudents = async (req, res) => {
    const courses = await Course.find().select('name');
    res.status(200).json({ courses: courses })
};



exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {

        const courseId = req.params.id;

        const studentsUsingCourse = await Student.findOne({ course: courseId });

        if (studentsUsingCourse) {

            return res.status(400).send('Cannot delete course. It is being used by one or more students.');
        }

        await Course.findByIdAndDelete(req.params.id);
        res.redirect('/courses')
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
