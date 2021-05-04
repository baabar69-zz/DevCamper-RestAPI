// @desc    logs the URLs to console
const logger = (req, res, next) => {
  console.log(res)
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  )
  next()
}

module.exports = logger
