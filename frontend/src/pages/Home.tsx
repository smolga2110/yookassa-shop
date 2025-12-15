import { Link } from "react-router-dom"
import Unit from "../components/Unit"

function Home(){
    return(
        <>
            <Unit/>
            <Link to="/cart">Корзина</Link>
        </>
    )
}

export default Home