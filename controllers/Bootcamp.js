const Bootcamp = require('../models/Bootcamp')
// @desc    Get All Bootcamp
// @route   GET /api/v1/bootcamps
// @access  Private
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find()
    res.status(200).json({ success: true, data: bootcamp })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.getSingleBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp)
      res.status(400).json({ success: false, error: 'Bootcamp not found' })

    res.status(200).json({ success: true, data: bootcamp })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!bootcamp)
      res.status(400).json({ success: false, error: 'Bootcamp not found' })

    res.status(200).json({ success: true, data: bootcamp })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
// @desc    Delete Bootcamp
// @route   PUT /api/v1/bootcamps
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp)
      res.status(400).json({ success: false, error: 'Bootcamp not found' })

    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
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
    res.status(400).json({ success: false, error: error.message })
  }
}
