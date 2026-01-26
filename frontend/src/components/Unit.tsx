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
    in_stock: boolean,
    image_url: string
}

interface ApiResponse {
    items: Item[]
}

function Unit(){
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    const {changeId, removeId} = useCart()

    const formatter = new Intl.NumberFormat('ru', {
        style: "currency",
        currency: "RUB",
    })
    

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
                        <div className="flex flex-col bg-gray-100 p-2.5 rounded-lg gap-2">
                            <img src={el.image_url}/>
                            <div className="flex flex-row items-center gap-2">
                                <span className="font-bold text-[#10c44c] text-lg">{formatter.format(el.price)}</span>
                                <span className="line-through text-[#99a3ae]">{formatter.format(el.price + 30000)}</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="font-medium">{el.name}</span>
                                <span>|</span>
                                <span>{el.category}</span>
                            </div>
                            <span>{el.in_stock}</span>
                            <button className="" disabled={!el.in_stock} onClick={(event) => {
                                if (event.currentTarget.textContent === "Добавить в корзину"){
                                    changeId(el.id);
                                    event.currentTarget.textContent = "В корзине"
                                    event.currentTarget.className = "!bg-gray-300 !text-gray-500 hover:text-gray-600!"
                                }
                                else{
                                    removeId(el.id)
                                    event.currentTarget.textContent = "Добавить в корзину"
                                    event.currentTarget.className = ""
                                }
                                }}>Добавить в корзину</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Unit