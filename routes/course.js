const express = require('express')
const {
getCourses
} = require('../controllers/Course')
const router = express.Router()

router.route('/').get(getCourses)

module.exports = router