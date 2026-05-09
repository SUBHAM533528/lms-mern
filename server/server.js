import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

// initialize express
const app = express()

// Connect MongoDB
await connectDb()

// Clerk webhook route FIRST
app.post('/api/webhooks', clerkWebhooks)

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('API Is Working')
})

// Port
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})