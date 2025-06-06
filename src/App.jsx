import { useState } from 'react'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeMessage from './components/WelcomeMessage';
import FoodMenu from './components/FoodMenu';
import './App.css'
import FoodCart from './components/FoodCart';

function App() {
  const [activeTab , setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);

  function addToCart(item){
      setCart([...cart, item]);
  }
  function removeFromCart(itemToRemove){
     setCart(cart.filter(item => item.id !== itemToRemove.id));
  }


  return (
    <>
      <Header></Header>
      <div className='flex gap-10'>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab}></Sidebar>
        {activeTab === "home" && <WelcomeMessage setActiveTab={setActiveTab} />}
        {activeTab === "menu" && <FoodMenu addToCart={addToCart}></FoodMenu>}
        {activeTab === "cart" && <FoodCart cart={cart} removeFromCart={removeFromCart}/>}
      </div>
    </>
  )
}

export default App
