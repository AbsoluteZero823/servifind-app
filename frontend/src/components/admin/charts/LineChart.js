import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const LineChart = ({chartData}) => {
  return (
  <div style={{width: '38vw'}}>
    <Line data={chartData}/>
  </div>
  
  
  );
}

export default LineChart
