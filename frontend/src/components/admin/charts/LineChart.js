import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const LineChart = ({ chartData }) => {
  return (


    <div className="col-md-6"
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.4)',
        flex: '0 0 48%'
      }} >
      <Line data={chartData} />
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="form-group" >
          <label > From: </label> {
            <div>
              <input type="date" ref={refStart} onChange={filterData1} value={startDate} />
              <label> To: </label>
              <input type="date" ref={refEnd} onChange={filterData2} value={endDate} />
            </div>
          } </div>
      </div> */}
    </div>
    // <div style={{width: '38vw'}}>
    //   <Line data={chartData}/>
    // </div>


  );
}

export default LineChart
