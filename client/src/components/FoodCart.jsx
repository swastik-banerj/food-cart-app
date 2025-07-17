import { useContext } from "react";
import { cartContext } from "../App";
const FoodCart = () => {

  const cartObj = useContext(cartContext);
  const totalAmount = cartObj.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-amber-200 p-8 rounded-md mx-auto my-14 h-max min-w-[90%] flex flex-col justify-center items-center">
      <div className="flex justify-between w-[100%]">
        <h1 className="scale-150 m-10 font-bold">Your Cart</h1>
        <button
          type="button"
          className="bg-red-600 p-1 mx-10 rounded h-9"
          onClick={() => cartObj.deleteCart()}
        >Clear Cart</button>
      </div>

      {cartObj.cart.length === 0 ? (
        <h2 className="scale-120" >Your cart is empty..</h2>
      ) :
        (<div className="w-full flex flex-col">
          <ul>
            <div className="grid grid-cols-8 gap-4">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Add</p>
              <p>Less</p>
              <p>Remove</p>
              <p>Total</p>
            </div>

            <br />
            <hr />

            {cartObj.cart.map((item) => (
              <div key={item._id} className="mb-2">
                <div className="grid grid-cols-8">
                  <img src={item.image} alt="" className="max-w-20" />
                  <p>{item.name}</p>
                  <p>Rs.{item.price}</p>
                  <p>{item.quantity}</p>
                  <button
                    type="button"
                    className="bg-green-600 p-0.5 mx-10 h-5 w-5 rounded"
                    onClick={() => cartObj.increaseQuantity(item)}
                  > + </button>

                  <button
                    type="button"
                    className="bg-red-600 p-0.5 mx-10 h-5 w-5 rounded"
                    onClick={() => cartObj.decreaseQuantity(item)}
                  > - </button>

                  <button
                    type="button"
                    className="bg-red-600 w-15 h-7 p-0.5 rounded"
                    onClick={() => cartObj.removeFromCart(item)}
                  >Remove</button>
                  <p>Rs.{item.price * item.quantity}</p>
                </div>

              </div>
            ))}
          </ul>

          <div>
            <span>Total : Rs.{totalAmount}</span>

            {cartObj.cart.length !== 0 && <button type="button" className="bg-green-700 m-5 p-2 rounded"
              onClick={() => cartObj.orderNow()}
            >Order Now!</button>}
          </div>
        </div>
        )
      }
    </div >
  )
}

export default FoodCart;
