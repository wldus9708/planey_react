import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Main from "./CKH/main";
import Data from "./CKH/Components/Data";
import Sdata from "./CKH/Components/MainPage/Sdata";
import Cart from "./CKH/Components/Cart/Cart"

function App() {
  const { productItems } = Data
  const { shopItems } = Sdata
  const [CartItem, setCartItem] = useState([])
  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + 1 } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }])
    }
  }

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <>
    <Main productItems={productItems} shopItems={shopItems}/>
    <Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} />
    </>
  );
}

export default App;
