import { useState } from 'react'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeMessage from './components/WelcomeMessage';
import FoodMenu from './components/FoodMenu';
import './App.css'
import "tailwindcss";

function App() {
  const [msg, setMsg] = useState(true)
  const [menu, setMenu] = useState(false);
  return (
    <>
      <Header></Header>
      <div className='flex gap-10'>
        <Sidebar></Sidebar>
        {msg && <WelcomeMessage setMsg={setMsg} msg={msg} setMenu={setMenu} menu={menu}></WelcomeMessage>}
        {menu && <FoodMenu></FoodMenu>}
      </div>
    </>
  )
}

export default App
