import { Link } from "react-router-dom"
import CartList from "../components/CartList"

function Cart(){
    return(
        <>
            <CartList/>
            <Link to="/">Домой</Link>
        </>
    )
}

export default Cart