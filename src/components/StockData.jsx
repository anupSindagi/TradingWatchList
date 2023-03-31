import {useState, useEffect} from "react"
import finnhub from "../apis/finnhub.js"
import {useGlobalContext} from '../AppContext.jsx'

export const StockData = ({symbol}) => {
    const [stockData, setStockData] = useState()
    const {pageLoading, setPageLoading, setApiError} = useGlobalContext();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setPageLoading(true)
                setApiError("false")
                const response = await finnhub.get("/stock/profile2", {
                    params :{
                        symbol
                    }
                })
                console.log(response.data)
                if (isMounted) {
                    setStockData(response.data)
                    setApiError(err.response.data.error)
                }
            } catch(err){
                console.log(err)
            }
        }
        fetchData()
        return () => (isMounted = false)
    }, [symbol])

    return (
        <div className="grid grid-cols-4 gap-4 mx-32 self-center mb-8">
            { stockData && <>
                <div className="col-span-4 place-self-center">
                    <span>
                        <img className="inline rounded-md shadow m-3 w-14 h-14 " src={stockData.logo}></img >
                    </span>
                    <h4 className="inline m-3 text-sky-600 text-2xl">{stockData.name}</h4>
                </div>
                <div>
                    <span className="block text-sky-500 text-base">country</span>
                    <span className="block text-sky-600 text-lg">{stockData.country}</span>
                </div>
                <div>
                    <span className="block text-sky-500 text-base">exchange</span>
                    <span className="block text-sky-600 text-lg">{stockData.exchange}</span>
                </div>
                <div>
                    <span className="block text-sky-500 text-base">industry</span>
                    <span className="block text-sky-600 text-lg">{stockData.finnhubIndustry}</span>
                </div>
                <div>
                    <span className="block text-sky-500 text-base">ipo</span>
                    <span className="block text-sky-600 text-lg">{stockData.ipo}</span>
                </div>
                <div>
                    <span className="block text-sky-500 text-base">market cap</span>
                    <span className="block text-sky-600 text-lg">{stockData.marketCapitalization}</span>
                </div>
                <div>
                    <span className="block text-sky-500 text-base">outstanding shares</span>
                    <span className="block text-sky-600 text-lg">{stockData.shareOutstanding}</span> 
                </div>
                <div>
                    <span className="block text-sky-500 text-base">ticker</span>
                    <span className="block text-sky-600 text-lg">{stockData.ticker}</span> 
                </div>
                <div>
                    <span className="block text-sky-500 text-base">website</span>
                    <a className="block text-sky-600 text-lg" href={stockData.weburl}>{stockData.weburl}</a> 
                </div>   
            </>                
            }
        </div>
    )
}