import './App.css'

import StockOverview from './Pages/StockOverview';
import StockDetailPage from './Pages/StockDetailPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverview />} />
          <Route path="/detail/:symbol" element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
