
const FoodCart = ({ cart, removeFromCart }) => {

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="bg-amber-200 p-8 rounded-md mx-auto my-14 h-max flex flex-col justify-center items-center">
      <h1 className="scale-150 m-10 font-bold">Your Cart</h1>
      {cart.length === 0 ? (
        <h2 className="scale-120" >Your cart is empty..</h2>
      ) :
        (<>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>{item.name} - Rs.{item.price}</span>
                <button
                  type="button"
                  className="bg-red-600 p-3 mx-10 rounded"
                  onClick={() => removeFromCart(item)}
                >Remove</button>
              </li>
            ))}
          </ul>

          <div>
              <span>Total : Rs.{totalAmount}</span>
          </div>
        </>
        )
      }
    </div >
  )
}

export default FoodCart
