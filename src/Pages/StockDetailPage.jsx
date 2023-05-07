import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import finnHub from '../apis/finnHub';

import StockChart from '../components/StockChart';
import StockData from '../components/StockData';

const formatData = (data) => {
  return data.t.map((ele, index) => {
    return {
      x: ele * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = new Date();
        const currentTime = Math.floor(date.getTime() / 1000);
        let oneDay;
        if (date.getDay() === 6) {
          oneDay = currentTime - 2 * 24 * 60 * 60;
        } else if (date.getDay() === 0) {
          oneDay = currentTime - 3 * 24 * 60 * 60;
        } else {
          oneDay = currentTime - 24 * 60 * 60;
        }
        const oneWeek = currentTime - 7 * 24 * 60 * 60;
        const oneYear = currentTime - 365 * 24 * 60 * 60;
        const response = await Promise.all([
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30
            }
          }),
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60
            }
          }),
          await finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W"
            }
          })
        ])
        console.log(response);
        setChartData({
          day: formatData(response[0].data),
          week: formatData(response[1].data),
          year: formatData(response[2].data),
        })
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return <div>
    {chartData && (
      <div>
        <StockChart chartData={chartData} symbol={symbol} />
        <StockData symbol={symbol} />
      </div>
    )}
  </div>
}

export default StockDetailPage;