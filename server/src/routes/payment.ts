import express from "express"
import { Request, Response } from 'express';
import { YooCheckout, ICreatePayment } from "@a2seven/yoo-checkout";
import 'dotenv/config'

export const paymentRouter = express.Router()

const checkout = new YooCheckout({shopId: `${process.env.SHOPID}` , secretKey: `${process.env.SECRETKEY}`})

const fetchPaymentCreation = async (totalCost: number) => {
    try{
        const createPayload: ICreatePayment = {
            amount: {
                value: `${totalCost}`,
                currency: 'RUB'
            },
            confirmation: {
                type: "redirect",
                return_url: "http://localhost:5173/"
            },
            capture: true
        }
        const payment = await checkout.createPayment(createPayload);
        console.log("Платеж создан: ", payment)
        return payment
    }
    catch (err){
        console.error(err)
        throw err
    }
}

paymentRouter.post("/", async (req: Request, res: Response) => {
    console.log(req.body)
    const response = await fetchPaymentCreation(req.body.totalCost)
    
    res.send(`${response.confirmation.confirmation_url}`)
})

paymentRouter.get("/test", async (req, res) => {
    const response = await checkout.getPayment("30d3c58e-000f-5000-b000-1f7a0dda83bb")
    res.send(response)
})