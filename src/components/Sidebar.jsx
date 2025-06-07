
const Sidebar = ({ activeTab, setActiveTab, cartCount }) => {

    return (
        <aside className="flex flex-col w-64 bg-orange-300 h-screen shadow-md">
            <div className="flex items-center justify-center h-16 ">
                <button className="hover:text-blue-400 font-medium"
                    onClick={() => setActiveTab("home")}
                >Home</button>
            </div>

            <div className="flex items-center justify-center h-16 hover:text-blue-400 font-medium">
                <button type="button"
                    onClick={() => setActiveTab("menu")}
                >Food Menu</button>
            </div>

            <div className="flex items-center justify-center h-16 hover:text-blue-400 font-medium">
                <button type="button"
                    onClick={() => setActiveTab("cart")}
                >Food Cart
                    {cartCount > 0 &&
                        <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded mx-0.5">
                            ({cartCount})
                        </span>
                    }

                </button>
            </div>
        </aside>

    )
}

export default Sidebar
