const Course = require('../models/course');
const Student = require('../models/student');

exports.renderNewPage = async(req, res) => {
    const courses = await Course.find();
    res.render('students/new.ejs',{courses})
};

exports.renderUpdatePage = async(req, res) => {
    const courses = await Course.find();
    const student = await Student.findById(req.params.id);
    res.render('students/edit.ejs',{courses,student})
};



exports.createStudent = async (req, res) => {
    try {
        const { name, course, email, contact } = req.body;
        const student = await Student.create({ name, course, email, contact });
        res.status(201).json({success:true,student});
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('course');
        // const students = await Student.find().populate({ path: 'course', strictPopulate: false });

        res.render('students/index.ejs', { students });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, student });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students')
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
