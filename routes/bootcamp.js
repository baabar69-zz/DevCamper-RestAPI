const express = require('express')
const {
  createBootcamps,
  deleteBootcamp,
  getBootcamps,
  getSingleBootcamps,
  updateBootcamp,
} = require('../controllers/Bootcamp')
const router = express.Router()

router.route('/').get(getBootcamps).post(createBootcamps)
router
  .route('/:id')
  .get(getSingleBootcamps)
  .delete(deleteBootcamp)
  .put(updateBootcamp)

module.exports = router
