import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { CustomerRequireAuth } from './components/CustomerRequireAuth'
import Home from './components/Home'
import Product from './components/Product'
import Shop from './components/Shop'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import Dashboard from './components/admin/Dashboard'
import Login from './components/admin/Login'

import { default as CreateCategory } from './components/admin/category/Create'
import { default as EditCategory } from './components/admin/category/Edit'
import { default as ShowCategory } from './components/admin/category/Show'

import { default as CreateBrand } from './components/admin/brands/Create'
import { default as EditBrand } from './components/admin/brands/Edit'
import { default as ShowBrand } from './components/admin/brands/Show'


import { default as CreateProduct } from './components/admin/products/Create'
import { default as EditProduct } from './components/admin/products/Edit'
import { default as ShowProduct } from './components/admin/products/Show'

import Confirmation from './components/Confirmation'
import { default as CustomerLogin } from './components/Login'
import { default as CustomerProfile } from './components/Profile'
import { default as CustomerRegister } from './components/Register'
import ShowOrders from './components/admin/order/ShowOrders'
import OrderDetail from './components/admin/order/OrderDetail'



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account/login' element={<CustomerLogin />} />
          <Route path='/account/register' element={<CustomerRegister />} />

          <Route path='/checkout' element={
            <CustomerRequireAuth>
              <Checkout />
            </CustomerRequireAuth>
          } />

          <Route path='/account/' element={
            <CustomerRequireAuth >
              <CustomerProfile />
            </CustomerRequireAuth>
          } />

          <Route path='/order/confirmation/:id' element={
            <CustomerRequireAuth>
              <Confirmation />
            </CustomerRequireAuth>
          } />


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

          <Route path='/admin/categories/create' element={
            <AdminRequireAuth >
              <CreateCategory />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth >
              <EditCategory />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands' element={
            <AdminRequireAuth >
              <ShowBrand />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands/create' element={
            <AdminRequireAuth >
              <CreateBrand />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth >
              <EditBrand />
            </AdminRequireAuth>
          } />


          <Route path='/admin/products' element={
            <AdminRequireAuth >
              <ShowProduct />
            </AdminRequireAuth>
          } />

          <Route path='/admin/products/create' element={
            <AdminRequireAuth >
              <CreateProduct />
            </AdminRequireAuth>
          } />

          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth >
              <EditProduct />
            </AdminRequireAuth>
          } />

          <Route path='/admin/orders' element={
            <AdminRequireAuth >
              <ShowOrders />
            </AdminRequireAuth>
          } />

          <Route path='/admin/orders/:id' element={
            <AdminRequireAuth >
              <OrderDetail />
            </AdminRequireAuth>
          } />

        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </>
  )
}

export default App
