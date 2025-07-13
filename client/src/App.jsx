import { createContext, useEffect, useReducer, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import FoodMenu from './components/FoodMenu';
import './App.css'
import FoodCart from './components/FoodCart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';

// step 1: create context
const cartContext = createContext();

// step 2 : wrap all children inside a provider
// step 3 : pass value
// step 4:  consume the values in the consumer


// Using useReducer
// initial state
const initialState = JSON.parse(localStorage.getItem('cart')) || [];

function cartReducer(state, action) {
  const { type, payload } = action;

  switch (type) {

    case 'ADD_ITEM':
      const itemExist = state.find((cartItem) => cartItem._id === payload._id);
      if (itemExist) {
        return state.map((cartItem) =>
          cartItem.id === payload.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...state, { ...payload, quantity: 1 }];

    case 'REMOVE_ITEM':
      return state.filter(item => item._id !== payload._id);

    case 'INCREASE_QTY':
      return state.map((cartItem) =>
        cartItem._id === payload._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );

    case 'DECREASE_QTY':
      return state.map((cartItem) =>
        (cartItem._id === payload._id && cartItem.quantity > 1) ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

function App() {

  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [signupState, setSignupState] = useState(true);
  const [signupPop, setSignupPop] = useState(false);

  const addToCart = item => dispatch({ type: 'ADD_ITEM', payload: item });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const removeFromCart = item => dispatch({ type: 'REMOVE_ITEM', payload: item });
  const increaseQuantity = item => dispatch({ type: 'INCREASE_QTY', payload: item });
  const decreaseQuantity = item => dispatch({ type: 'DECREASE_QTY', payload: item });

  function orderNow() {
    toast.success("Order Placed");
    clearCart();
  }


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])


  return (     
    <>
      <BrowserRouter>
        <Toaster></Toaster>
        <cartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decreaseQuantity, increaseQuantity, orderNow, signupState, setSignupState, signupPop, setSignupPop }} >
          <Header></Header>
          {signupPop && <SignUp/>}
          <div className='flex gap-10'>
            <Routes>
              <Route path='/' element={<WelcomeMessage />} />
              <Route path='/menu' element={<FoodMenu />} />
              <Route path='/cart' element={<FoodCart />} />
            </Routes>
          </div>

        </cartContext.Provider>
        <Routes>
          <Route path='/' element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
export { cartContext };
