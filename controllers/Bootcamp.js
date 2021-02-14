const Bootcamp = require('../models/Bootcamp')
// @desc    Get All Bootcamp
// @route   GET /api/v1/bootcamps
// @access  Private
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' })
}
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.getSingleBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get Single bootcamp ${req.params.id}` })
}
// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Update  bootcamps' })
}
// @desc    Delete Bootcamp
// @route   PUT /api/v1/bootcamps
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Delete bootcamps' })
}
// @desc    Creatr Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
