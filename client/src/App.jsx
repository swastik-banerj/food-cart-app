import { createContext, useEffect, useReducer, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import FoodMenu from './components/FoodMenu';
import './App.css'
import FoodCart from './components/FoodCart';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import axios from 'axios';

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
  const [userState, setUserState] = useState(null);

  const addToCart = item => dispatch({ type: 'ADD_ITEM', payload: item });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const removeFromCart = item => dispatch({ type: 'REMOVE_ITEM', payload: item });
  const increaseQuantity = item => dispatch({ type: 'INCREASE_QTY', payload: item });
  const decreaseQuantity = item => dispatch({ type: 'DECREASE_QTY', payload: item });

  const API = import.meta.env.VITE_API_BASE_URL;

  const saveToCart = async (item) => {

    let token = localStorage.getItem("token");

    try {

      const res = await axios.post(`${API}/api/cart/save`, {
        item: {
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        }
      },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }

        }
      );

      if (res.data.success) {
        toast.success("Added to cart");
        addToCart(item);
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      toast.error("Could not add to cart");
      console.error(error);
    }
  }

  const deleteItemFromCart = async (itemName) => {
    try {

      let token = localStorage.getItem("token");

      const res = await axios.delete(`${API}/cart/deleteItem/${itemName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }

        }
      );

      if (res.data.success) {
        removeFromCart();
        toast.success("Item deleted successfully")
      } else {
        toast.error(res.data.message);
      }


    } catch (error) {
      console.log("Error while deleting item : ", error);
      toast.error("Could not delete item");
    }
  }

  const increaseItemQty = async (itemName) => {
     try {

      let token = localStorage.getItem("token");

      const res = await axios.put(`${API}/api/cart/item/${itemName}/inc`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }

        }
      );

      if (res.data.success) {
        increaseQuantity();
        toast.success("Item number increased")
      } else {
        toast.error(res.data.message);
      }


    } catch (error) {
      console.log("Error while increase qty : ", error);
      toast.error("Could not increase item");
    }
  }

  const decreaseItemQty = async (itemName) => {
     try {

      let token = localStorage.getItem("token");

      const res = await axios.put(`${API}/api/cart/item/${itemName}/dec`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }

        }
      );

      if (res.data.success) {
        decreaseQuantity();
        toast.success("Item number decreased")
      } else {
        toast.error(res.data.message);
      }


    } catch (error) {
      console.log("Error while decrease qty : ", error);
      toast.error("Could not decrease item");
    }
  }

  const deleteCart = async () => {

    try {

      let token = localStorage.getItem("token");

      const res = await axios.post(`${API}/api/cart/clearCart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }

        }
      );

      if (res.data.success) {
        clearCart();
        toast.success("Cart cleared successfully")
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log("Error while clear cart : ", error);
      toast.error("Could not clear cart");
    }


  }

  async function orderNow() {
    try {

      await deleteCart();
      clearCart();

      toast.success("Order Placed")

    } catch (error) {
      toast.error("Couldn't place order");
    }
  }


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])


  return (
    <>
      <BrowserRouter>
        <Toaster></Toaster>
        <cartContext.Provider value={{ cart, saveToCart, deleteItemFromCart, deleteCart, decreaseItemQty, increaseItemQty, orderNow, signupState, setSignupState, signupPop, setSignupPop, userState, setUserState }} >
          <Header></Header>
          {signupPop && <SignUp />}
          <div className='flex gap-10'>
            <Routes>
              <Route path='/' element={
                <div className='flex flex-col'>
                  <WelcomeMessage />
                  <Footer />
                </div>
              } />
              <Route path='/menu' element={<FoodMenu />} />
              <Route
                path="/cart"
                element={userState ? <FoodCart /> : <Navigate to="/" />}
              />
            </Routes>
          </div>

        </cartContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
export { cartContext };
