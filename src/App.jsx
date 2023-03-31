import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {StockOverviewPage} from './pages/StockOverviewPage.jsx'
import {StockDetailPage} from './pages/StockDetailPage.jsx'
import {AppProvider} from './AppContext.jsx'
import './index.css'

export default function App() {
    
  return (
      <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StockOverviewPage/>}/>
                <Route path="/detail/:symbol" element={<StockDetailPage/>}/> 
            </Routes>
        </BrowserRouter>
       
      </AppProvider>
  )
}
