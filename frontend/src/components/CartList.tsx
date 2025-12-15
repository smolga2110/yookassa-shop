import { useEffect, useState } from "react"
import { useCart } from "../provider/ContextProvider"

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

function CartList(){
    const {id} = useCart()
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        async function fetchCart() {
            try{
                const response = await fetch("http://localhost:3000/api/items/cart", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ids: id })
                })
                if (!response.ok){
                    throw new Error(`Ошибка запроса ${response.status}`)
                }
                const data: ApiResponse = await response.json()
                setItems(data.items || [])
            }
            catch (err){
                console.error(err)
            }
        }

        fetchCart()
    }, [])

    return(
        <>
            {items.map((el: any) => {
                return(
                    <div>{el.name}</div>
                )
            })}
        </>
    )
}

export default CartList