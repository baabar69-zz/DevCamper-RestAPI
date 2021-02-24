const ErrorResponse = require('../utils/errorResponse')
const Bootcamp = require('../models/Bootcamp')
const asyncHandler = require('../middlewares/async')
// @desc    Get All Bootcamp
// @route   GET /api/v1/bootcamps
// @access  Private
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  console.log('req.query', req.query)
  let query

  let reqQuery = { ...req.query }

  let removeFields = ['select', 'sort', 'limit', 'page']

  removeFields.forEach((param) => delete reqQuery[param])

  let queryStr = JSON.stringify(reqQuery)

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

  query = Bootcamp.find(JSON.parse(queryStr))

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 25
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Bootcamp.countDocuments()
  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }
  query = query.skip(startIndex).limit(limit)

  const bootcamp = await query

  res
    .status(200)
    .json({ success: true, count: bootcamp.length,pagination, data: bootcamp })
})
// @desc    Get single Bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Private
exports.getSingleBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp not found with the id ${req.params.id}`, 404)
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
