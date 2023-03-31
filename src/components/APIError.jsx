import {useGlobalContext} from '../AppContext.jsx'
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

export const APIError = () => {
    
    const {apiError,setApiError} = useGlobalContext();
    const [countDown, setCountDown] = useState(40);
    const [intervalId,setIntervalId] = useState();

    useEffect (() => {
        setIntervalId(setInterval(() => {
            setCountDown(cd => cd - 1 );
            
        },1000))
        console.log("interval ID",intervalId)
    },[])
    
    useEffect (() => {
        console.log("countDown", countDown)
        if (countDown <= 0) {
            clearInterval(intervalId);
            setApiError("false");
            window.location.reload();
        }
    }, [countDown])

    return (
        <div className="absolute z-10 top-0 left-0 flex items-center justify-center w-screen h-screen backdrop-saturate-0 backdrop-blur">
            <div className="absolute z-10 top-1/2 left-1/2 bg-sky-100 -ml-44 -mt-40 flex flex-col px-8 py-8 max-w-sm shadow-xl ring-2 ring-gray-900/5 rounded-md">
                <h3 className='text-red-600 text-center'>Error: FinnHub {apiError}</h3>
                <h4 className='text-sky-500 font-bold text-center mt-8'>Reloading the page in {countDown}...</h4>
            </div>
        </div>
    )
    
}