require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3737
const app = express()
const admin = require('./routers/admin')
const item = require('./routers/item')
const user = require('./routers/user')
const purchasing = require('./routers/purchasing')
const report = require('./routers/report')

app.use(cors())
app.use(express.json())

app.use('/api/admin', admin)
app.use('/api/item', item)
app.use('/api/user/', user)
app.use('/api/purchasing', purchasing)
app.use('/api/report', report)
app.use('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'This is API for Riliv Back End Development Test. Docs here https://github.com/ganta-dev/Riliv-backend-test#readme'
  })
})



if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})