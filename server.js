const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const errorHandler = require('./middlewares/error')
const connectDB = require('./config/db')
// const logger = require('./middlewares/logger')
const bootcamps = require('./routes/bootcamp')
const courses = require('./routes/course')

// Load env vars
dotenv.config({ path: `./config/config.env` })

connectDB()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)

process.on('unhandledRejection', (err, resolved) => {
  console.log(`Error: ${err.message}`.red)

  server.close(() => process.exit(1))
})
