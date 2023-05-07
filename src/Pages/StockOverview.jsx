import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";

import trading from '../images/trading.png';

import { useState, useEffect } from 'react';

const StockOverview = () => {
  const [watchList, setWatchList] = useState(localStorage.getItem("watchList")?.split(",") || ['GOOGL', 'MSFT', 'AMZN']);

  useEffect(() => {
    localStorage.setItem("watchList", watchList)
  }, [watchList])

  const addToStockList = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock])
    }
  }

  const removeStock = (stock) => {
    setWatchList(watchList.filter((ele) => {
      return ele !== stock
    }))
  }

  return (
    <div>
      <div className="text-center">
        <img src={trading} />
      </div>
      <AutoComplete addToStockList={addToStockList} />
      <StockList watchList={watchList} removeStock={removeStock} />
      {/* {(watchList.length > 0) ? <StockList watchList={watchList} removeStock={removeStock} /> : <div>No Stocks Found</div>} */}
    </div>
  )
}

export default StockOverview;