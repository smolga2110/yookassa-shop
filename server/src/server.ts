import express from 'express';
import { Request, Response } from 'express';
import { YooCheckout, ICreatePayment } from "@a2seven/yoo-checkout";
import 'dotenv/config'
import cors from 'cors'

const app = express()

app.use(cors())

const checkout = new YooCheckout({shopId: `${process.env.SHOPID}` , secretKey: `${process.env.SECRETKEY}`})

const idempotenceKey = '02347fc6-a1f0-49db-808e-f0d67c2ed5a5';

let lastId: string

const fetchPaymentCreation = async () => {
    try{
        const createPayload: ICreatePayment = {
            amount: {
                value: '2.00',
                currency: 'RUB'
            },
            confirmation: {
                type: "redirect",
                return_url: "http://localhost:3000/checkout"
            },
            capture: true
        }
        const payment = await checkout.createPayment(createPayload);
        console.log("Платеж создан: ", payment)
        lastId = payment.id
        return payment
    }
    catch (err){
        console.error(err)
        throw err
    }
}

app.get("/", (req: Request, res: Response) => {
    res.send("Хайы")
})

app.get("/payment", async (req: Request, res: Response) => {
    const result = await fetchPaymentCreation()
    res.send(`${result.confirmation.confirmation_url}`)
})

app.get("/checkout", async (req: Request, res: Response) => {
    try{
        const payment = await checkout.getPayment(lastId);
        res.send(payment.status)
    }
    catch (err){
        res.errored
    }
})

app.listen(3000, () => {
    console.log(`Server running on port 3000`)
})