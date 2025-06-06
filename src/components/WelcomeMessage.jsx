import "tailwindcss";

const WelcomeMessage = ({setActiveTab}) => {

    function setChange(){
       setMsg(false)
       setMenu(true)
    }
    return (
        <div>
            <h1 className="font-semibold scale-150 m-10">Welcome to Tiffin Box!!</h1>
            <button type="button" className="bg-amber-400 p-2"
                onClick={() => setActiveTab("menu")}
            >Click to view Food Menu</button>
        </div> 
    )
}

export default WelcomeMessage
