const Course = require('../models/course');

const isCourseUser = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.redirect('/courses');
        }
        const courseUser = course.user_id.toString();
        if (req.session.user._id === courseUser) {
            next();
        } else {
            res.redirect('/courses');
        }
    } catch (error) {
        res.redirect('/courses');
    }
};

module.exports = isCourseUser;
