import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeMessage from './components/WelcomeMessage';
import FoodMenu from './components/FoodMenu';
import './App.css'
import FoodCart from './components/FoodCart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  //const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExist = cart.some((cartItem) => cartItem.id === item.id);
    if (itemExist) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    }
    else setCart([...cart, item])
  }
  function decreaseQuantity(item) {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
    setCart(updatedCart);
  }

  function increaseQuantity(item) {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCart(updatedCart);
  }

  function removeFromCart(itemToRemove) {
    setCart(cart.filter(item => item.id !== itemToRemove.id));
  }

  function clearCart() {
    setCart([]);
  }

  function orderNow() {
    toast.success("Order Placed");
    clearCart();
  }

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])


  return (
    <>
      <BrowserRouter>
        <Toaster></Toaster>
        <Header></Header>
        <div className='flex gap-10'>
          <Sidebar cartCount={cart.length}></Sidebar>
          <Routes>
            <Route path='/' element={<WelcomeMessage/>} />
            <Route path='/menu' element={<FoodMenu addToCart={addToCart}/>} /> 
            <Route path='/cart' element={<FoodCart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} decreaseQuantity={decreaseQuantity} orderNow={orderNow} increaseQuantity={increaseQuantity}/>} /> 
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
