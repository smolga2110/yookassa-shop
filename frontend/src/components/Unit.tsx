import { useEffect, useState } from "react"
import {  useCart } from "../provider/ContextProvider"

/*
async function paymentProcess(){
    try{
        const response = await fetch("http://localhost:3000/payment")
        const result = await response.text()
        document.location.href = result
    }
    catch(err){
        console.error(err)
        throw err
    }
}
*/

interface Item {
    id: number,
    category: string,
    name: string,
    price: number,
    in_stock: boolean
}

interface ApiResponse {
    items: Item[]
}

function Unit(){
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    const {changeId} = useCart()
    

    useEffect(() => {
        async function fetchItems() {
            try{
                const response = await fetch("http://localhost:3000/api/items/")
                if (!response.ok){
                    throw new Error(`Ошибка запроса: ${response.status}`)
                }
                const data: ApiResponse = await response.json()
                setItems(data.items || [])
            }
            catch (err){
                console.error(err)
                setError("Ошибка при загрузке")
            }
            finally{
                setLoading(false)
            }
        }
        fetchItems()
    }, [])

    if (loading){
        return(
            <div>Загрузка</div>
        )
    }

    if (error){
        return(
            <div>{error}</div>
        )
    }

    return(
        <>
            {
                items.map((el) => {
                    return(
                        <div>
                            <span>{el.id}</span>
                            <span>{el.category}</span>
                            <span>{el.name}</span>
                            <span>{el.price}</span>
                            <span>{el.in_stock}</span>
                            <button onClick={() => changeId(el.id)}>Добавить в корзину</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Unit