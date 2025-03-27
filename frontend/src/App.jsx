import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Home from './components/Home'
import Product from './components/Product'
import Shop from './components/Shop'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import Dashboard from './components/admin/Dashboard'
import Login from './components/admin/Login'
import {default as ShowCategory} from './components/admin/category/Show'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/dashboard' element={
            <AdminRequireAuth >
              <Dashboard />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories' element={
            <AdminRequireAuth >
              <ShowCategory />
            </AdminRequireAuth>
          } />

        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </>
  )
}

export default App
