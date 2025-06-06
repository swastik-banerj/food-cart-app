
const Sidebar = ({activeTab , setActiveTab}) => {

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
                >Food Cart</button> 
            </div>
        </aside>

    )
}

export default Sidebar
