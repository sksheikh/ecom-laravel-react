import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/assets/css/style.scss';
import App from './App.jsx';
import { AdminAuthProvider } from './components/context/AdminAuth.jsx';
import { CartProvider } from './components/context/Cart.jsx';
import { CustomerAuthProvider } from './components/context/CustomerAuth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <CustomerAuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CustomerAuthProvider>
    </AdminAuthProvider>
  </StrictMode>,
)
