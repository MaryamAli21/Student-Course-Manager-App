const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/is-signed-in.js');
const studentController = require('../controllers/student-controller');

router.post('/', isSignedIn, studentController.createStudent);
router.get('/', isSignedIn, studentController.getStudents);
router.put('/:id', isSignedIn, studentController.updateStudent);
router.get('/:id/delete', isSignedIn, studentController.deleteStudent);
router.get('/new', isSignedIn, studentController.renderNewPage)
router.get('/:id/edit', isSignedIn, studentController.renderUpdatePage)


module.exports = router;
