import { createContext, useContext, useState, type ReactNode } from "react";

interface Cart {
    id: number[]
    changeId: (newId: number) => void
}

interface CartProviderProps {
    children: ReactNode
}

const CartContext = createContext<Cart | undefined>(undefined)

function CartProvider({ children }: CartProviderProps) {
    const [id, setId] = useState<number[]>([])

    const changeId = (newId: number) => {
        setId([...id, newId])
    }

    return(
        <CartContext.Provider value={{id, changeId}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined){
        throw new Error("Должен быть использовать с CartProvider")
    }
    return context
}

export default CartProvider