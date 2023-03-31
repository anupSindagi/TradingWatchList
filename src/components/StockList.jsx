import {useState, useEffect} from 'react';
import finnhub from '../apis/finnhub.js'
import {AiFillCaretDown, AiFillCaretUp, AiFillCloseCircle} from 'react-icons/ai'
import {useGlobalContext} from '../AppContext.jsx'
import { useNavigate } from 'react-router-dom';

export const StockList = () => {
    const {watchList,setWatchList,pageLoading, setPageLoading, setApiError} = useGlobalContext();
    const [stock, setStock] = useState()
    const navigate = useNavigate();

    useEffect(()=> {
        let isMounted = true;
        const fetchData = async () => {
            setApiError("false")
            setPageLoading(true);
            try {
                const responses = await Promise.all(watchList.map(stock=> {
                    return finnhub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                console.log(responses)
                const stockData = responses.map(res => ({
                    data:    res.data,
                    symbol: res.config.params.symbol
                }))
                if (isMounted) {
                    setStock(stockData);
                    setPageLoading(false)
                }
            } catch(err) {
                console.log(err.response.data.error)
                setPageLoading(false)
                setApiError(err.response.data.error)
            }
        }
        fetchData()
        
        return () => (isMounted = false)
    }, [watchList])
    return (
        <div className="inline-block max-h-[75vh] overflow-auto my-4 mb-20">
            <table className="mx-auto bg-sky-200 table-fixed w-[85%] ">
            <thead className="text-sky-700 text-left">
                <tr>
                    <th className="font-semibold p-2 border-4 border-sky-50">Symbol</th>
                    <th className="font-semibold border-4 p-2 border-sky-50">Last</th>
                    <th className="font-semibold border-4 p-2 border-sky-50">Change</th>
                    <th className="font-semibold border-4 p-2 border-sky-50">%Change</th>
                    <th className="font-semibold p-2 border-4 border-sky-50">High</th>
                    <th className="font-semibold p-2 border-4 border-sky-50">Low</th>
                    <th className="font-semibold p-2 border-4 border-sky-50">Open</th>
                    <th className="font-semibold p-2 border-4 border-sky-50">Close</th>
                </tr>
            </thead>
            <tbody className="bg-sky-100 p-2 text-left text-sky-800 max-h-[65vh]">
                {   
                    stock && stock.map(ele => 
                     <tr key={ele.symbol} className="transition duration-100 hover:scale-[1.01] hover:cursor-pointer hover:bg-sky-200"
                        onClick={(e) => {
                            console.log(e.target.tagName);
                            if(!["path","svg"].includes(e.target.tagName))navigate(`detail/${ele.symbol}`)}}
                         >
                        <th className="font-semibold p-2 border-4 border-sky-50">
                            <span>
                                {ele.symbol}
                            </span>
                        </th>
                        <td className="p-2 border-4 border-sky-50">{ele.data.c}</td>
                        <td className={`p-2 border-4 border-sky-50 ${ele.data.d && ele.data.d > 0 ? `text-green-700` : `text-red-700`}`}>
                            {ele.data.d} 
                            {ele.data.d > 0 ? <AiFillCaretUp className="inline"/> : <AiFillCaretDown className="inline"/>}
                        </td>
                         <td className={`p-2 border-4 border-sky-50 ${ele.data.dp && ele.data.dp > 0 ? `text-green-700` : `text-red-700`}`}>
                             {ele.data.dp} 
                             {ele.data.dp > 0 ? <AiFillCaretUp className="inline"/> : <AiFillCaretDown className="inline"/>}
                        </td>
                        <td className="p-2 border-4 border-sky-50">{ele.data.h}</td>
                        <td className="p-2 border-4 border-sky-50">{ele.data.o}</td>
                        <td className="p-2 border-4 border-sky-50">{ele.data.c}</td>
                        <td className="p-2 border-4 border-sky-50">
                            <span className="flex justify-between">
                                {ele.data.pc}
                                <AiFillCloseCircle size={18} 
                                      className="inline fill-sky-300 transisation duration-500 hover:scale-125 cursor-pointer hover:fill-sky-500"
                                      onClick = {(e) => setWatchList(watchList.filter(w=> w !== ele.symbol))}
                                />
                            </span>
                        </td>
                    </tr>
                    )
                }
                </tbody>
            </table>
        </div>
        
    );
}