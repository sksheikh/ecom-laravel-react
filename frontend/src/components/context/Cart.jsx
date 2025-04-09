import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    const addToCart = (product, size = null) => {
        let updatedCart = [...cartData];

        if (cartData.length == 0) {
            updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                product_id: product.id,
                size: size,
                title: product.title,
                price: product.price,
                qty: 1,
                image_url: product.image_url
            })
        } else {
            if (size != null) {
                const isProductExist = updatedCart.find(item =>
                    item.product_id == product.id && item.size == size);

                //product already exist in cart
                if (isProductExist) {
                    updatedCart = updatedCart.map(item =>
                        (item.product_id == product.id && item.size == size)
                            ? {...item, qty: item.qty + 1}
                            : item
                    )
                }else{
                    //product not exist in cart
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
                    })
                }
            }else{
                const isProductExist = updatedCart.find(item =>
                    item.product_id == product.id);

                //product already exist in cart
                if (isProductExist) {
                    updatedCart = updatedCart.map(item =>
                        (item.product_id == product.id)
                            ? {...item, qty: item.qty + 1}
                            : item
                    )
                }else{
                    //product not exist in cart
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        title: product.title,
                        price: product.price,
                        qty: 1,
                        image_url: product.image_url
                    })
                }
            }
        }

        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const shipping = () => {
        return 0;
    }

    const subTotal = () => {
        let subTotal = 0;
        cartData.map(item => {
            subTotal += item.qty * item.price
        });

        return subTotal;
    }

    const grandTotal = () => {
        return subTotal() + shipping();
    }


    return (
        <CartContext.Provider value={{ addToCart, cartData, shipping, subTotal, grandTotal }}>
            {children}
        </CartContext.Provider>
    )
}

