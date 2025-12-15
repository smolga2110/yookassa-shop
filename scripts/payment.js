async function ready() {
    try{
        const response = await fetch("http://localhost:3000/checkout")
        const result = await response.text()
        if (result === "succeeded"){
            document.body.innerHTML = "<div>Успех</div>"
        }
        else{
            console.log(document.body.innerHTML)
        }
    }
    catch (err){
        console.error(err)
        throw err
    }
}

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


