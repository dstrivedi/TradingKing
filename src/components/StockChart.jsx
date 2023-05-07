import Chart from "react-apexcharts";

import { useState } from 'react';

const StockChart = ({ chartData, symbol }) => {
  const { day, week, year } = chartData;
  const [selectedDateFormat, setSelectedDateFormat] = useState("24h")

  const determineDateFormat = () => {
    switch (selectedDateFormat) {
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }


  const color = determineDateFormat()[determineDateFormat().length - 1].y - determineDateFormat()[0].y > 0 ? "#26C281" : "#ed3419"

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }

  const series = [{
    name: symbol,
    data: determineDateFormat()
  }]

  const renderButton = (button) => {
    const classes = "btn m-1 ";
    if (button === selectedDateFormat) {
      return classes + "btn-primary"
    } else {
      return classes + "btn-outline-primary"
    }
  }

  return <div className="mt-5 p-4 shadow-sm bg-white">
    <Chart options={options} series={series} width="100%" type="area" />
    <div>
      <button className={renderButton("24h")} onClick={() => setSelectedDateFormat("24h")}>24h</button>
      <button className={renderButton("7d")} onClick={() => setSelectedDateFormat("7d")}>7d</button>
      <button className={renderButton("1y")} onClick={() => setSelectedDateFormat("1y")}>1y</button>
    </div>
  </div>
}

export default StockChart;