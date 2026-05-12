import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './configs/mongodb.js'
import clerkWebhooks from './controllers/webhooks.js'

const app = express()

// Connect DB
await connectDb()

// Clerk webhook route BEFORE express.json()
app.post('/api/webhooks', express.json(), clerkWebhooks)

// Other middlewares
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.send('API Working')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})