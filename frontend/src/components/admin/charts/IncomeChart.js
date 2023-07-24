import React, { Fragment, useState, useRef, useEffect } from 'react'
import dateFormat from 'dateformat';
import { Line } from 'react-chartjs-2'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getPremiumFreelancersPerMonth } from '../../../actions/freelancerActions';
// import { getTransactionPerMonth } from '../../../actions/transactionActions';
import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, registerables } from 'chart.js'
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    ChartDataLabels,
    ...registerables
)
const IncomeChart = () => {
    const dispatch = useDispatch();
    const { monthlyPremiumCounts, clearErrors, success, error, loading } = useSelector(state => state.premiumFreelancers);

    useEffect(() => {
        dispatch(getPremiumFreelancersPerMonth());
        if (success) {
            console.log(monthlyPremiumCounts)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }




    }, [dispatch, alert, error, success])
    const state = {
        labels: monthlyPremiumCounts.map((data) => data.month),
        title: {
            display: true,
            text: 'Monthly Income',
            font: {
                size: 30
            }
        },
        datasets: [{
            label: "Monthly Income",

            data: monthlyPremiumCounts.map((data) => data.count),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            fill: false,
            tension: 0.1,
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            hoverBackgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(201, 203, 207, 0.5)'
            ],
            borderWidth: 5
        }],


    }
    const options = {

        responsive: true,
        aspectRatio: 1.5,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Monthly Income',
                font: {
                    size: 30
                }
            },
            datalabels: {
                formatter: (value, context) => {
                    const datapoints = context.chart.data.datasets[0].data;

                    function totalSum(total, datapoint) {
                        return datapoint;
                    }
                    const totalValue = datapoints.reduce(totalSum, 0);
                    // const percentageValue = (value / totalValue * 100).toFixed(1);

                    return `₱${totalValue}`;
                },
                font: {
                    size: 12
                }

            }
        },
        hoverOffset: 4,
    };
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <div className="col-md-6"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.4)',
                        flex: '0 0 48%',
                        margin: '25px 0px'
                    }} >
                    <Line data={state} options={options} />

                </div>
            )}
        </Fragment>
    );
}

export default IncomeChart
