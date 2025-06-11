import "tailwindcss";
import {Link} from 'react-router-dom'
const WelcomeMessage = () => {

    function setChange(){
       setMsg(false)
       setMenu(true)
    }
    return (
        <div>
            <h1 className="font-semibold scale-150 m-10">Welcome to Tiffin Box!!</h1>
            <Link to='/menu' type="button" className="bg-amber-400 p-2"
                
            >Click to view Food Menu</Link>
        </div> 
    )
}

export default WelcomeMessage
