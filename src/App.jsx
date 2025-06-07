import { useEffect, useState } from 'react'
import {Toaster} from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeMessage from './components/WelcomeMessage';
import FoodMenu from './components/FoodMenu';
import './App.css'
import FoodCart from './components/FoodCart';

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemExist = cart.some((cartItem) => cartItem.id === item.id);
    if(itemExist){
      const updatedCart = cart.map((cartItem) => 
        cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity +1 } : cartItem
      );
      setCart(updatedCart);
    }
    else setCart([...cart, item])
  }
  function decreaseQuantity(item){
      const updatedCart = cart.map((cartItem) => 
        cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
      );
      setCart(updatedCart);
  }

  function increaseQuantity(item){
    const updatedCart = cart.map((cartItem) => 
        cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
      );
      setCart(updatedCart);
  }


  function removeFromCart(itemToRemove) {
    setCart(cart.filter(item => item.id !== itemToRemove.id));
  }

  function clearCart() {
    setCart([]);
  }

  function orderNow(){
    toast.success("Order Placed");
    clearCart();
  }

  useEffect(() => {
    console.log('Running useEffect to load cart from localStorage');
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
      <Toaster></Toaster>
      <Header></Header>
      <div className='flex gap-10'>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cart.length}></Sidebar>
        {activeTab === "home" && <WelcomeMessage setActiveTab={setActiveTab} />}
        {activeTab === "menu" && <FoodMenu addToCart={addToCart}></FoodMenu>}
        {activeTab === "cart" && <FoodCart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} decreaseQuantity={decreaseQuantity} orderNow={orderNow} increaseQuantity={increaseQuantity} />}
      </div>
    </>
  )
}

export default App
