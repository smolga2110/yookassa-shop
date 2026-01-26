import { Link } from "react-router-dom"
import Unit from "../components/Unit"

function Home(){
    return(
        <>
            <header>
                <div className="flex justify-end">
                    <Link to="/cart">Корзина</Link>
                </div>
            </header>
            <div className="flex flex-wrap justify-center gap-15 bg-white p-2 rounded-lg pt-10">
                <Unit/>
            </div>
        </>
    )
}

export default Home