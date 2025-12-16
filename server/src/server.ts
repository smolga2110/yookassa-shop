import express from 'express';
import 'dotenv/config'
import cors from 'cors'

import { itemRouter } from "./routes/items"
import { paymentRouter } from './routes/payment';

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/items", itemRouter)
app.use("/api/payment", paymentRouter)

app.listen(3000, () => {
    console.log(`Server running on port 3000`)
})