import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/shop' element={<Shop/>} ></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
