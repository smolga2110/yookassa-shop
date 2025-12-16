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
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const fetchPayment = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/payment/", {
                method: "POST",
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({ totalCost: totalPrice})
            })

            if (!response.ok){
                throw new Error(`Проблема создания платежа ${response.status}`)
            }

            const url = await response.text()

            document.location.href = url
        }
        catch (err){
            console.error(err)
        }
    }

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
                const sum = data.items.reduce((acc, item) => acc + item.price, 0)

                setItems(data.items || [])
                setTotalPrice(sum)
            }
            catch (err){
                console.error(err)
            }
        }

        fetchCart()
    }, [])

    return(
        <>
            {
                items.map((el: any) => {
                    return(
                        <div>{el.name}</div>
                    )
                })
            }
            <span>{totalPrice}</span>
            <button onClick={() => fetchPayment()}>Оплатить</button>
        </>
    )
}

export default CartList