import { toast } from 'react-hot-toast'
import { useState, useEffect, useContext } from 'react'
import { cartContext } from '../App';
import { food_list } from '../assets/assets';
const FoodMenu = () => {

  const cartObj = useContext(cartContext);

  /* { id: 1, name: "Chicken pizza", price: 180, quantity: 1 },
        { id: 2, name: "Paneer butter masala", price: 120, quantity: 1 },
        { id: 3, name: "Butter naan", price: 15, quantity: 1 },
        { id: 4, name: "Chicken tandori", price: 80, quantity: 1 },
        { id: 5, name: "Kulcha", price: 25, quantity: 1 },
        { id: 5, name: "Chicken Pakoda", price: 25, quantity: 1 }, */

  const [loading, setLoading] = useState(true);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Stimulate API delay
    setTimeout(() => {
      setFoodItems(food_list);
      setLoading(false); // stop loading
    }, 0); // 2s delay
  }, []);

  if (loading) {
    return (
      <div>Loading Menu ...</div>
    );
  }


  return (
    <div className=" p-8 rounded-md mx-auto  h-max flex flex-col justify-center items-center">
      <h1 className="scale-250 m-10 font-bold">Food Menu</h1>

      <div className='flex flex-wrap gap-6 items-center'>
        {food_list.map(item => (
          <div key={item._id} className=" shadow-md transition mb-2 flex flex-col justify-between items-center border-2 border-gray-200 m-3 hover:shadow-lg rounded-2xl max-w-2xs" >

            <div className='w-full'>
                <img src={item.image} alt={item.name} className='w-full' />
            </div>

            <div className='m-3'>

              <div>
                <h1 className='font-bold scale-100 m-2'>{item.name}</h1>
                <p className='mt-3 text-gray-500 max-w-xl'>{item.description}</p>
              </div>
              

              <div className='flex m-3'>
                <span className='rounded bg-amber-400 h-7 w-auto p-1'>Rs.{item.price}</span>
                <button
                  type="button"
                  className="bg-green-600 p-3 mx-10 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95"
                  onClick={() => {
                    cartObj.saveToCart(item)
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
