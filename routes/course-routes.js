const express = require('express');
const courseController = require('../controllers/course-controller');
const isSignedIn = require('../middleware/is-signed-in.js');

const router = express.Router();

router.get('/', isSignedIn, courseController.getAllCourses)
router.get('/list', isSignedIn, courseController.coursesListForStudents)
router.post('/', isSignedIn, courseController.createCourse)
router.put('/:id', isSignedIn, courseController.updateCourse);
router.get('/:id/delete', isSignedIn, courseController.deleteCourse);
router.get('/new', isSignedIn, courseController.renderNewPage)
router.get('/:id/edit', isSignedIn, courseController.renderUpdatePage)




module.exports = router;
