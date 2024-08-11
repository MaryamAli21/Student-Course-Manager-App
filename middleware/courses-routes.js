const express = require('express');
const router = express.Router();
const courseCtrl = require('/controllers/course');


router.get('/edit', courseCtrl.courseEdit);

module.exports = router;
