
const FoodMenu = ({addToCart}) => {

  const foodItems = [
    { id: 1, name: "Chicken pizza", price: 180 },
    { id: 2, name: "Paneer butter masala", price: 120 },
    { id: 3, name: "Butter naan", price: 15 },
    { id: 4, name: "Chicken tandori", price: 80 },
    { id: 5, name: "Kulcha", price: 25 },
  ]

  return (
    <div className="bg-amber-200 p-8 rounded-md mx-auto my-14 h-max flex flex-col justify-center items-center">
      <h1 className="scale-150 m-10 font-bold">Food Menu</h1>
      <ul>
        {foodItems.map(item => (
          <li key={item.id} className="mb-2 flex justify-between items-center">
            <span>{item.name} - Rs.{item.price}</span>
            <button 
            type="button" 
            className="bg-green-600 p-3 mx-10 rounded"
              onClick={() => addToCart(item)}
            >Add to cart</button>
          </li>
        ))
        }

      </ul>
    </div>
  )
}

export default FoodMenu
