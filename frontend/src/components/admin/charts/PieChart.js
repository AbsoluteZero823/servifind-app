import React, { Fragment, useState, useRef, useEffect } from 'react'
// import dateFormat from 'dateformat';
import { Pie } from 'react-chartjs-2';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionPerCourses } from '../../../actions/transactionActions';
import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    ChartDataLabels,
    ...registerables
)

const PieChart = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {
        loading,
        sectionArr, error
    } = useSelector(state => state.sectionArray);

    useEffect(() => {
        dispatch(getTransactionPerCourses());

        if (error) {
            alert.error(error);
            // dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    // initial value for charts
    const Coursegroups = sectionArr.reduce(
        (Coursegroups, borrow_course) => {
            const borrowedCourse = borrow_course.section;
            if (!Coursegroups[borrowedCourse]) {
                Coursegroups[borrowedCourse] = []
            }
            Coursegroups[borrowedCourse].push(borrow_course);
            return Coursegroups;
        }, {}
    )
    //fetching key value pair for datasets
    const courseCount = Object.keys(Coursegroups)
    const courseCountLength = Object.values(Object.values(Coursegroups)).map((data) => {
        return data.length
    })


    const [sectionData, setSectionData] = useState(courseCount);
    const [sectionDataPoints, setSectionDataPoints] = useState(courseCountLength);

    const [startDate, setStartDate] = useState('2023-01-01');
    const [endDate, setEndDate] = useState('2023-12-31');

    const refStart = useRef();
    const refEnd = useRef();

    const Dategroups = sectionArr.reduce(
        (Dategroups, borrow_date) => {
            const borrowedDate = borrow_date.returnedDate;
            if (!Dategroups[borrowedDate]) {
                Dategroups[borrowedDate] = []
            }
            Dategroups[borrowedDate].push(borrow_date);
            return Dategroups;
        }, {}
    )
    console.log(Dategroups);

    const arrGroups = Object.entries(Dategroups)
    console.log(arrGroups);
    //----------------------------------------------------------------------
    function filterData1() {
        let valueStart = refStart.current.value;
        setStartDate(valueStart);
        let valueEnd = endDate;
        //filtering of data from the array of dates with attached array of Section data
        const filtered_arr = arrGroups.filter(
            (obj) => {
                return obj >= valueStart && obj <= valueEnd
            }
        )
        //fetching data values to be filtered
        const fil_arr_val = Object.values(filtered_arr);
        //creating an array for the filtered data of section to be stored
        let new_fil_arr = []
        for (let i = 0; fil_arr_val.length > i; i++) {
            new_fil_arr.push([fil_arr_val[i][1][0].section])
        }
        // recude and count duplicate data
        const reduced_arr = new_fil_arr.reduce((reduced_arr, data) => {
            if (!reduced_arr[data]) {
                reduced_arr[data] = []
            }
            reduced_arr[data].push(data);
            return reduced_arr;
        }, {});
        //geting the key and value counts for the datasets
        const filter1_datasets = Object.keys(reduced_arr)
        const filter1_datacounts = Object.values(reduced_arr).map((data) => {
            return data.length
        })
        setSectionData(filter1_datasets)
        setSectionDataPoints(filter1_datacounts)
    };
    //----------------------------------------------------------------------
    function filterData2() {
        let valueEnd = refEnd.current.value;
        setEndDate(valueEnd);
        let valueStart = startDate;
        //filtering of data from the array of dates with attached array of Section data
        const filtered_arr = arrGroups.filter(
            (obj) => {
                return obj >= valueStart && obj <= valueEnd
            }
        )
        //fetching data values to be filtered
        const fil_arr_val = Object.values(filtered_arr);
        //creating an array for the filtered data of section to be stored
        let new_fil_arr = []
        for (let i = 0; fil_arr_val.length > i; i++) {
            new_fil_arr.push([fil_arr_val[i][1][0].section])
        }
        // recude and count duplicate data
        const reduced_arr = new_fil_arr.reduce((reduced_arr, data) => {
            if (!reduced_arr[data]) {
                reduced_arr[data] = []
            }
            reduced_arr[data].push(data);
            return reduced_arr;
        }, {});
        //geting the key and value counts for the datasets
        const filter2_datasets = Object.keys(reduced_arr)
        const filter2_datacounts = Object.values(reduced_arr).map((data) => {
            return data.length
        })
        setSectionData(filter2_datasets)
        setSectionDataPoints(filter2_datacounts)
    };

    //Setting up datas to Bar chart
    const state = {
        labels: sectionData,
        datasets: [{
            label: 'Times Borrowed',
            data: sectionDataPoints,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
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
            borderWidth: 1
        }],
        plugins: [ChartDataLabels]
    };

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
                text: 'Borrowed Books Per Course',
                font: {
                    size: 30
                }
            },
            datalabels: {
                formatter: (value, context) => {
                    const datapoints = context.chart.data.datasets[0].data;

                    function totalSum(total, datapoint) {
                        return total + datapoint;
                    }
                    const totalValue = datapoints.reduce(totalSum, 0);
                    const percentageValue = (value / totalValue * 100).toFixed(1);

                    return `${percentageValue}%`;
                },
                font: {
                    size: 16
                }

            }
        },
        hoverOffset: 4,
    };

    return (<Fragment >
        <MetaData title={'Dashboard'} />
        {loading ? < Loader /> : (
            <div className="col-md-6" >
                <Pie
                    // labels={sectionData}
                    data={state}
                    options={options}
                />
                <div className="form-group" >
                    <label > From: </label> {
                        <div>
                            <input type="date" ref={refStart} onChange={filterData1} value={startDate} />
                            <label> To: </label>
                            <input type="date" ref={refEnd} onChange={filterData2} value={endDate} />
                        </div>
                    } </div>
            </div>
        )
        }
    </Fragment>
    )
}
export default PieChart