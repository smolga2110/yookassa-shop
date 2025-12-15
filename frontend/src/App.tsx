import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CartProvider from './provider/ContextProvider'
import Home from './pages/Home'
import Cart from './pages/Cart'
import './App.css'

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
