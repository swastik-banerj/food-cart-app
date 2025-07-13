import "tailwindcss";
import { assets } from "../assets/assets";
const WelcomeMessage = () => {

    return (
        <div className="flex flex-col justify-center items-center text-center px-4">

            <div className="w-full flex justify-center mt-5">
                <img src={assets.header_img} alt="" className="w-full object-contain"/>
            </div>

            <div className="">
                <h1 className="font-bold text-3xl mt-8">Explore our menu</h1>
                <div className="mx-5">
                    <p className="mt-3 text-gray-500 max-w-xl">
                        Check out the variety of delicious food items with an army of mouth watering flavours. Satisfy the hunger with our tasty cuisines!!
                    </p>
                </div>
            </div>
        </div> 
    )
}

export default WelcomeMessage
