import "tailwindcss";
import { Link } from "react-router";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { cartContext } from "../App";
const Header = () => {

   const {signupState, setSignupPop, userState} = useContext(cartContext);

   return (
      <div className="navBar bg-amber-300">
         <div className="logo">
            <img src={assets.logo} alt="" />
         </div>

         <div className="navBar-menu">
            <ul className="menu-items">
               <Link to="/" className="hover:underline">Home</Link>
               <Link to="/menu" className="hover:underline">Menu</Link> <Link to="/" className="hover:underline">Contact-Us</Link>
            </ul>
         </div>

         <div className="navBar-right">
            <div>
               <img src={assets.search_icon} alt="" />
            </div>

            <Link to="/cart">
               <img src={assets.basket_icon} alt="" />
            </Link>

            <div>
               { userState? <button className="border rounded-full p-1.5 hover:bg-amber-200"  >
                  {`${userState.fullName}`}
               </button>

               :   
               <button className="border rounded-full p-1.5 hover:bg-amber-200"
                  onClick={() => setSignupPop(prev => !prev)}
               >
                  {signupState ? 'Sign up' : 'Sign in'}
               </button> }
            </div>
            
         </div>
      </div>
   )
}

export default Header
