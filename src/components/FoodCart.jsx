
const FoodCart = ({ cart, removeFromCart, clearCart, decreaseQuantity, orderNow, increaseQuantity }) => {

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-amber-200 p-8 rounded-md mx-auto my-14 h-max flex flex-col justify-center items-center">
      <div className="flex justify-between w-[100%]">
        <h1 className="scale-150 m-10 font-bold">Your Cart</h1>
        <button
          type="button"
          className="bg-red-600 p-1 mx-10 rounded h-9"
          onClick={() => clearCart()}
        >Clear Cart</button>
      </div>

      {cart.length === 0 ? (
        <h2 className="scale-120" >Your cart is empty..</h2>
      ) :
        (<>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <div>
                    <span> {item.name} - Rs.{item.price} x {item.quantity} = Rs.{item.price * item.quantity}</span>
                </div>
                  
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-green-600 p-0.5 mx-10 h-5 w-5 rounded"
                    onClick={() => increaseQuantity(item)}
                  > + </button>

                  {item.quantity > 1 &&
                    <button
                      type="button"
                      className="bg-red-600 p-0.5 mx-10 h-5 w-5 rounded"
                      onClick={() => decreaseQuantity(item)}
                    > - </button>
                  }
                  <button
                    type="button"
                    className="bg-red-600 p-3 mx-10 rounded"
                    onClick={() => removeFromCart(item)}
                  >Remove</button>
                </div>

              </li>
            ))}
          </ul>

          <div>
            <span>Total : Rs.{totalAmount}</span>
          </div>
          {cart.length !== 0 && <button type="button" className="bg-green-700 m-5 p-2 rounded"
            onClick={() => orderNow()}
          >Order Now!</button>}
        </>
        )
      }
    </div >
  )
}

export default FoodCart
