import {Link , useLocation } from 'react-router-dom'
const Sidebar = ({ cartCount }) => {

    const location = useLocation();
    const currPath = location.pathname;

    return (
        <aside className="flex flex-col w-64 bg-orange-300 h-screen shadow-md">
            <div className="flex items-center justify-center h-16 ">
                <Link to="/" className={`${currPath==='/' ? "text-blue-700 font-bold" : "text-black"} hover:text-blue-400 font-medium`}>Home</Link>
            </div>

            <div className="flex items-center justify-center h-16">
                <Link to="/menu" type="button" className={`${currPath==='/menu' ? "text-blue-700 font-bold" : "text-black"} hover:text-blue-400 font-medium`}>Food Menu</Link>
            </div>

            <div className="flex items-center justify-center h-16 hover:text-blue-400 font-medium">
                <Link to="/cart" type="button" className={`${currPath==='/cart' ? "text-blue-700 font-bold" : "text-black"} hover:text-blue-400 font-medium`} > Food Cart
                    {cartCount > 0 &&
                        <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded mx-0.5">
                            ({cartCount})
                        </span>
                    }
                </Link>
            </div>
        </aside>

    )
}

export default Sidebar
