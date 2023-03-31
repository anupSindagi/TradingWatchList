import {useParams, useNavigate} from "react-router-dom";
import finnhub from '../apis/finnhub.js'
import {useEffect, useState} from "react";
import {StockChart} from '../components/StockChart.jsx'
import {StockData} from "../components/StockData.jsx"
import {AiOutlineLeft} from 'react-icons/ai'
import {useGlobalContext} from '../AppContext.jsx'
import {PageLoading} from '../components/PageLoading.jsx'
import {APIError} from "../components/APIError.jsx"


export const StockDetailPage = () => {
    const {symbol} = useParams();
    const [chartData, setChartData] = useState();
    const navigate = useNavigate()
    const {pageLoading,setPageLoading, apiError, setApiError} = useGlobalContext();
    
    useEffect(() => {
        const fetchData = async () => {
        const currentDate = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        const currentTime = Math.floor(currentDate.getTime() / 1000);
        const currentDay =  currentDate.getDay();
        let oneDayTime;
        switch(currentDay){
            case 0 : oneDayTime = currentTime - (3 * 24 * 60 * 60);
                    break;
            case 6 : oneDayTime = currentTime - (2 * 24 * 60 * 60);
                    break;
            default : oneDayTime = currentTime - (24 * 60 * 60);
        }
        const oneWeekTime = currentTime - (7 * 24 * 60 * 60);
        const oneYearTime = currentTime - (365 * 24 * 60 * 60);

        try {
            setPageLoading(true)
            setApiError("false")
            const responses = await Promise.all([
                finnhub.get("/stock/candle", {
                    params : {
                        symbol : symbol,
                        from : oneDayTime,
                        to : currentTime,
                        resolution : 15
                    }
                }),
                finnhub.get("/stock/candle", {
                    params : {
                        symbol : symbol,
                        from : oneWeekTime,
                        to : currentTime,
                        resolution : 60
                    }
                }),
                finnhub.get("/stock/candle", {
                    params : {
                        symbol : symbol,
                        from : oneYearTime,
                        to : currentTime,
                        resolution : "W"
                    }
                }),
            ]);
            console.log(responses)
            console.log(responses[0].data.t.map((val,index)=> ({x: val, y: responses[0].data.c[index]})))
            setChartData({
                day : responses[0].data.t.map((val,index)=> ({x: val*1000, y: Number.parseFloat(responses[0].data.c[index]).toFixed(3)})),
                week : responses[1].data.t.map((val,index)=> ({x: val*1000, y: Number.parseFloat(responses[1].data.c[index]).toFixed(3)})),
                year : responses[2].data.t.map((val,index)=> ({x: val*1000, y: Number.parseFloat(responses[2].data.c[index]).toFixed(3)}))
            })
            setPageLoading(false)
            } catch(err) {
                console.log(err)
                setPageLoading(false)
                setApiError(err.response.data.error)
            }
        }
        fetchData();
    }, [symbol]);    
  
    return(
        <div className="container flex flex-col bg-stone-50 w-[85%] overflow-y-auto h-[90vh] mx-auto shadow-xl my-10 ring-1 ring-gray-900/5 rounded-md">
            {apiError !== "false" && <APIError/>}
            {pageLoading && <PageLoading />}
            <span className="grid grid-cols-10">
                <AiOutlineLeft size={50} 
                    className="col-span-1 place-self-center fill-sky-400 shadow rounded-full p-2 bg-sky-100 transition duration-100 hover:scale-[.9] hover:bg-sky-200 hover:cursor-pointer"
                    onClick={() => navigate("/")}   
                />
                <h1 className="col-span-9 place-self-center text-center text-4xl text-sky-500 m-6 -ml-20 tracking-widest drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                trade watchlist
            </h1>
            </span>
            {  
                chartData &&
                <StockChart  chartData={chartData} symbol={symbol}/>    
            }
            <StockData symbol={symbol}/>
        </div>
    );
}