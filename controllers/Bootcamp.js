const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middlewares/async')
// @desc    Get All Bootcamp
// @route   GET /api/v1/bootcamps
// @access  Private
exports.getBootcamps =asyncHandler( async (req, res, next) => {
    console.log('req.query', req.query)
    let query 

    let queryStr = JSON.stringify(req.query)
    
    queryStr= queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g , match => `$${match}`)

    query =  Bootcamp.find(JSON.parse(queryStr))

    const bootcamp = await query

    res.status(200).json({ success: true, count : bootcamp.length ,data: bootcamp })
})
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.getSingleBootcamps =asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp)
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id ${req.params.id}`,
          404
        )
      )

    res.status(200).json({ success: true, data: bootcamp })
})
// @desc    Update Bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with the id ${req.params.id}`, 404)
    )

    res.status(200).json({ success: true, data: bootcamp })
})
// @desc    Delete Bootcamp
// @route   PUT /api/v1/bootcamps
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with the id ${req.params.id}`, 404)
    )
    res.status(200).json({ success: true, data: {} })
})
// @desc    Creatr Bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)

    res.status(201).json({
      success: true,
      data: bootcamp,
    })
})
