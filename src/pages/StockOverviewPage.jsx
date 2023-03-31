import {PageLoading} from "../components/PageLoading.jsx"
import {AutoComplete} from '../components/AutoComplete.jsx'
import {StockList} from '../components/StockList.jsx'
import {useGlobalContext} from '../AppContext.jsx'
import { APIError } from "../components/APIError.jsx"


export const StockOverviewPage = () => {

    const {pageLoading,apiError} = useGlobalContext();
    
    return(
        <div className="container bg-stone-50 w-[80vw] h-[90vh] mx-auto my-10 shadow-xl ring-1 ring-gray-900/5 rounded-md">
            {apiError !== "false" && <APIError/>}
            {pageLoading && <PageLoading /> }
            <AutoComplete />
            <StockList />
        </div>
    );
}