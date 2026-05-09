import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import connectDb from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'


// initialize express
const app = express()

// Connect Mongodb
await connectDb()

// Middlewares
app.use(cors())
app.use("/api/webhooks", clerkWebhooks)

// Routes
app.get('/', (req, res) => res.send('Api Is Working'))
app.post('/clerk', express.json(), clerkWebhooks)

// Port
const port = process.env.port || 5000

app.listen(port, ()=> {
    console.log(`server is running successfully on port ${port}`)
})


