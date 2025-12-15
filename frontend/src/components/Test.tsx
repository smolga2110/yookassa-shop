import { useState } from "react"

function Test(){
    const [value, setValue] = useState<number>(10)

    return(
        <div>
            <button onClick={() => setValue(prev => prev - 2)}>уменьшить</button>
            <span>{value}</span>
        </div>
    )
}

export default Test