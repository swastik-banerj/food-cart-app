import "tailwindcss";

const WelcomeMessage = ({setMsg , msg , setMenu, menu}) => {

    function setChange(){
       setMsg(!msg)
       setMenu(!menu)
    }
    return (
        <div>
            <h1 className="font-semibold scale-150 m-10">Welcome to Tiffin Box!!</h1>
            <button type="button" className="bg-amber-400 p-2"
                onClick={() => setChange()}
            >Click to view Food Menu</button>
        </div> 
    )
}

export default WelcomeMessage
