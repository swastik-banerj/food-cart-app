import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
const FoodMenu = ({ addToCart }) => {

  const [loading, setLoading] = useState(true);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Stimulate API delay
    setTimeout(() => {
      setFoodItems([
        { id: 1, name: "Chicken pizza", price: 180, quantity: 1 },
        { id: 2, name: "Paneer butter masala", price: 120, quantity: 1 },
        { id: 3, name: "Butter naan", price: 15, quantity: 1 },
        { id: 4, name: "Chicken tandori", price: 80, quantity: 1 },
        { id: 5, name: "Kulcha", price: 25, quantity: 1 },
        { id: 5, name: "Chicken Pakoda", price: 25, quantity: 1 },
      ]);
      setLoading(false); // stop loading
    }, 0); // 2s delay
  }, []);

  if (loading) {
    return (
      <div>Loading Menu ...</div>
    );
  }


  return (
    <div className="bg-amber-200 p-8 rounded-md mx-auto my-10 h-max flex flex-col justify-center items-center">
      <h1 className="scale-250 m-10 font-bold">Food Menu</h1>

      <div className='flex flex-wrap gap-6 items-center'>
        {foodItems.map(item => (
          <div key={item.id} className=" shadow-md transition mb-2 flex flex-col justify-between items-center border-2 m-3 hover:shadow-lg">

            <div className='img'>

            </div>

            <div className='m-3'>
              <h1 className='font-bold scale-100 m-2'>{item.name}</h1>
              <div className='flex m-3'>
                <span className='rounded bg-amber-400 h-7 w-auto p-1'>Rs.{item.price}</span>
                <button
                  type="button"
                  className="bg-green-600 p-3 mx-10 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95"
                  onClick={() => {
                    addToCart(item)
                    toast.success(`${item.name} added to cart!`)
                  }}
                >Add to cart</button>
              </div>

            </div>

          </div>
        ))
        }
      </div>
    </div>
  )
}

export default FoodMenu
