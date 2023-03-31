import {useState, useContext, useEffect, createContext} from 'react'

export const AppContext = createContext(null);

export const AppProvider = ({children}) => {

    const [watchList, setWatchList] = useState(
        JSON.parse(localStorage.getItem("watchList")) || ["GOOG", "PCAR", "AMD", "COST", "AMZN", "MSFT" ]
    )

    const [pageLoading, setPageLoading] = useState(true)
    const [apiError, setApiError] = useState("false");

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(watchList))
    }, [watchList])
    
    return(
        <AppContext.Provider value={{watchList, setWatchList, pageLoading, setPageLoading, setApiError, apiError}}>
            {children}
        </AppContext.Provider>
    );
}
export const useGlobalContext = () => {
    return useContext(AppContext);
}