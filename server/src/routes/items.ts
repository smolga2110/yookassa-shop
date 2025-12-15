import express from "express";
import * as fs from "fs/promises"

export const itemRouter = express.Router()

const readData = async () => {
    try{
        const data = await fs.readFile("./src/data/items.json", {encoding: "utf8"})
        const result = await JSON.parse(data)
        return result
    }
    catch (err){
        console.error(err)
        throw err
    }
}

itemRouter.get("/", async (req, res) => {
    const result = await readData()
    res.json(result)
})

itemRouter.post("/cart", async (req, res) => {
    console.log(req.body)
    const result = await readData()
    const data = result.items.filter((el: any) => 
        req.body.ids.includes(el.id)
    )
    res.send({items: [...data]})
})