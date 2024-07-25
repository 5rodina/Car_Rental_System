import express from 'express'

import carRouter from './modules/car.routes.js'
import customerRouter from './modules/customer.routes.js'
import rentalRouter from './modules/rental.routes.js'
import special from './modules/special.routes.js'
const app=express()
const port=3002

app.use(express.json())

app.use('/car',carRouter)
app.use('/customer',customerRouter)
app.use('/rental',rentalRouter)
app.use('/special',special)

app.listen(port,()=>console.log(`example app listening on port ${port}`))