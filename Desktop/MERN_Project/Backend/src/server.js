import express from 'express'
import authRoutes from './routes/authRoutes.js'
import appRoutes from './routes/appRoutes.js'
import mongoose  from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error("MongoDB Connection error", err))

const PORT = process.env.SERVER_PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())


app.use('/auth', authRoutes)
app.use('/lostfound', appRoutes)
app.listen(PORT, () => {
    console.log(`Server Started`)

})