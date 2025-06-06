import "tailwindcss";

const Sidebar = () => {
    return (
        <aside className="flex flex-col w-64 bg-orange-300 h-screen shadow-md">
            <div className="flex items-center justify-center h-16 ">
                <h2 className="hover:text-blue-400 font-medium">Home</h2> 
            </div>

            <div className="flex items-center justify-center h-16 hover:text-blue-400 font-medium">
                <h2>Food Menu</h2> 
            </div>

            <div className="flex items-center justify-center h-16 hover:text-blue-400 font-medium">
                <h2>Food Cart</h2> 
            </div>

            <div className="flex items-center justify-center h-16 hover:text-blue-400 font-medium">
                <h2>Orders</h2> 
            </div>
        </aside>

    )
}

export default Sidebar
