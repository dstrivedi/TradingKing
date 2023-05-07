import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import finnHub from '../apis/finnHub';

import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';

const StockList = ({ watchList, removeStock }) => {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  const changeIcon = (value) => {
    return (value > 0) ? <BsCaretUpFill /> : <BsCaretDownFill />;
  }

  const goToStockDetailPage = (symbol) => {
    navigate(`detail/${symbol}`)
  }


  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get('/quote', {
            params: {
              symbol: stock
            }
          })
        }));

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        })

        console.log(data);
        if (isMounted) setStocks(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()

    return () => (isMounted = false)
  }, [watchList])

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79, 89, 102)" }}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chg</th>
            <th scope='col'>Chg%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {
            stocks.map((stock) => {
              const { c: last, d: chg, dp: percentage, h: high, l: low, o: open, pc: previous } = stock.data;
              return (
                <tr style={{ cursor: 'pointer' }} onClick={() => goToStockDetailPage(stock.symbol)} className="table-row" key={stock.symbol}>
                  <th scope='row'>{stock.symbol}</th>
                  <td>{last}</td>
                  <td className={chg > 0 ? 'text-success' : 'text-danger'}>{chg} {changeIcon(chg)}</td>
                  <td className={percentage > 0 ? 'text-success' : 'text-danger'}>{percentage} {changeIcon(percentage)}</td>
                  <td>{high}</td>
                  <td>{low}</td>
                  <td>{open}</td>
                  <td>{previous} <button className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeStock(stock.symbol)
                    }}>Remove</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div >
  )
}

export default StockList;