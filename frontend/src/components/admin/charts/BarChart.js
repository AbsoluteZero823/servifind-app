import React, { Fragment, useState, useRef, useEffect } from 'react'
import dateFormat from 'dateformat';
import { Bar } from 'react-chartjs-2';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionPerMonth } from '../../../actions/transactionActions';
import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartDataLabels,
    ...registerables
)

const BarChart = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { completionDate, clearErrors, success, error, loading } = useSelector(state => state.completionDateTo);

    useEffect(() => {
        dispatch(getTransactionPerMonth());
        if (success) {
            // console.log(completionDate)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        if (appointmentDateCountLength[0]) {
            filterData1();
            filterData2();
        }

    }, [dispatch, alert, error, success])


    //----------------------------------------------------------------------
    //this is for filtering data to be regroup into months
    const groups = completionDate.reduce(
        (groups, borrow_appointment) => {
            const borroweddate = borrow_appointment.created_At;
            if (!groups[borroweddate]) {
                groups[borroweddate] = []
            }
            groups[borroweddate].push(borrow_appointment);
            return groups;
        }, {}
    )
    // console.log(groups);

    //Fetching Dates from groups
    const appointmentDate = Object.keys(groups)
    // console.log(appointmentDate);

    // Fetching Date Counts from roups -- debug
    const appointmentCount = Object.values(groups)
    const appointmentCountLength = Object.values(appointmentCount).map((testvariable) => {
        return testvariable.length
    })
    // console.log(appointmentCountLength);
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // Regrouping Books Borrowed into Month name

    const appointmentDateMonth = appointmentDate.reduce(
        (appointmentDateMonth, borrow_appointment) => {
            const appointment_date = dateFormat(borrow_appointment, "yyyy-mm-dd")
            if (!appointmentDateMonth[appointment_date]) {
                appointmentDateMonth[appointment_date] = []
            }
            appointmentDateMonth[appointment_date].push(borrow_appointment);
            return appointmentDateMonth;
        }, {}
    )
    // console.log(appointmentDateMonth);

    const appointmentDateGroup = Object.keys(appointmentDateMonth)
    // console.log(appointmentDateGroup);

    const appointmentDateCount = Object.values(appointmentDateMonth)
    const appointmentDateCountLength = Object.values(appointmentDateCount).map((appointment) => {
        return appointment.length
    })
    // console.log(appointmentDateCountLength);
    //----------------------------------------------------------------------

    // Setting States

    //Bar Chart Data
    const [appointmentDates, setAppointmentDates] = useState(appointmentDateGroup);
    const [appointmentDataPoints, setAppointmentDataPoints] = useState(appointmentDateCountLength);
    // console.log(appointmentDates, appointmentDataPoints);

    //Input Type Date Data
    const [appointmentStart, setAppointmentStart] = useState('2023-01-01');
    const [appointmentEnd, setAppointmentEnd] = useState('2023-12-31');

    const appointmentRefStart = useRef();
    const appointmentRefEnd = useRef();

    //converting Obj into Array via Entries (keys and values included)
    const arrGroups = Object.entries(groups);
    // const arrGroups = Object.entries(animalDateMonth);
    // console.log(arrGroups);

    //Function for changing the state of start date
    function filterData1() {

        let valueStart = appointmentRefStart.current.value;

        let newValueStart = new Date(valueStart)
        newValueStart.setDate(newValueStart.getDate())
        newValueStart.setMonth(newValueStart.getMonth())
        newValueStart.setFullYear(newValueStart.getFullYear())
        //    console.log(newValueEnd);
        const convertValueStart = dateFormat(newValueStart, "yyyy-mm-dd")

        setAppointmentStart(valueStart);
        let valueEnd = appointmentEnd;
        // let valueEnd = dateFormat(rescuedEnd, "mmmm");
        // console.log(valueStart);
        // console.log(valueEnd );

        // console.log(arrGroups);
        // const newgroups = arrGroups.filter(
        const newgroups = arrGroups.filter(
            (obj) => {
                return obj >= convertValueStart && obj <= valueEnd
            }
        )
        // console.log(newgroups);

        const newData = Object.fromEntries(newgroups);
        // console.log(newData);


        const appointmentDateGroup = Object.keys(newData)
        // const animalDateGroup  = Object.entries(newData)
        // console.log(appointmentDateGroup);

        const newAppointmentDateGroup = appointmentDateGroup.reduce((newAppointmentDateGroup, appointment) => {
            const appointmentdate = dateFormat(appointment, "mmmm")
            if (!newAppointmentDateGroup[appointmentdate]) {
                newAppointmentDateGroup[appointmentdate] = []
            }
            newAppointmentDateGroup[appointmentdate].push(appointment);

            // return dateFormat(item, "mmmm");
            return newAppointmentDateGroup;
            // return item;
        }, {});

        // console.log(newAppointmentDateGroup);

        const uniqueDates = Object.keys(newAppointmentDateGroup);
        // console.log(uniqueDates);
        setAppointmentDates(uniqueDates);

        const newAppointmentCount = Object.values(newAppointmentDateGroup)
        const newAppointmentCountLength = Object.values(newAppointmentCount).map((appointment) => {
            return appointment.length
        })
        // console.log(newAppointmentCountLength);
        setAppointmentDataPoints(newAppointmentCountLength);

    };

    //Function for changing the state of end date
    function filterData2() {

        let valueEnd = appointmentRefEnd.current.value;
        // let newValueEnd = valueEnd + 1;
        let newValueEnd = new Date(valueEnd);
        // console.log(newValueEnd);

        newValueEnd.setDate(newValueEnd.getDate() + 1)
        newValueEnd.setMonth(newValueEnd.getMonth())
        newValueEnd.setFullYear(newValueEnd.getFullYear())
        //    console.log(newValueEnd);
        const convertValueEnd = dateFormat(newValueEnd, "yyyy-mm-dd")
        //    console.log(convertValueEnd );
        setAppointmentEnd(valueEnd);
        // let valueStart = dateFormat(rescuedRefStart.current.value, "mmmm");
        let valueStart = appointmentStart;
        // let valueEnd = dateFormat(rescuedEnd, "mmmm");
        // console.log(valueStart);
        // console.log(convertedValueEnd );

        // console.log(arrGroups);
        // const newgroups = arrGroups.filter(
        const newgroups = arrGroups.filter(
            (obj) => {
                return obj >= valueStart && obj <= convertValueEnd
            }
        )
        // console.log(newgroups);

        const newData = Object.fromEntries(newgroups);
        // console.log(newData);


        const appointmentDateGroup = Object.keys(newData)
        // const animalDateGroup  = Object.entries(newData)
        // console.log(appointmentDateGroup);

        const newAppointmentDateGroup = appointmentDateGroup.reduce((newAppointmentDateGroup, appointment) => {
            const appointmentdate = dateFormat(appointment, "mmmm")
            if (!newAppointmentDateGroup[appointmentdate]) {
                newAppointmentDateGroup[appointmentdate] = []
            }
            newAppointmentDateGroup[appointmentdate].push(appointment);

            // return dateFormat(item, "mmmm");
            return newAppointmentDateGroup;
            // return item;
        }, {});

        // console.log(newAppointmentDateGroup);

        const uniqueDates = Object.keys(newAppointmentDateGroup);
        // console.log(uniqueDates);
        setAppointmentDates(uniqueDates);

        const newAppointmentCount = Object.values(newAppointmentDateGroup)
        const newAppointmentCountLength = Object.values(newAppointmentCount).map((appointment) => {
            return appointment.length
        })
        // console.log(newAppointmentCountLength);
        setAppointmentDataPoints(newAppointmentCountLength);

    };

    //Setting up datas to Bar chart
    const state = {
        labels: appointmentDates,
        datasets: [{
            label: 'Returned',
            data: appointmentDataPoints,
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
        // indexAxis: 'x',
        // elements: {
        //     bar: {
        //         borderWidth: 2,
        //     },
        // },
        responsive: true,
        aspectRatio: 1.5,
        scales: {
            x: {
                max: 20,
                ticks: {
                    font: {
                        size: 16,
                    },
                    display: false,

                },
                // reverse: true
            },
            y: {
                max: 20,
                ticks: {
                    font: {
                        size: 16,
                    }
                }
            },
        },
        plugins: {
            legend: {
                // labels: {
                //     // This more specific font property overrides the global property
                //     font: {
                //         size: 16
                //     }
                // }
                onClick: (e, legendItem, legend) => {
                    const index = legend.chart.data.labels.indexOf(legendItem.text);
                    legend.chart.toggleDataVisibility(index)
                    // console.log(legend.chart.getDataVisibility(index))
                    legend.chart.update();
                },

                labels: {
                    generateLabels: (chart) => {
                        let visibility = [];
                        for (let i = 0; i < chart.data.labels.length; i++) {
                            if (chart.getDataVisibility(i) === true) {
                                visibility.push(false)
                            } else {
                                visibility.push(true)
                            }
                        };

                        return chart.data.labels.map(
                            (label, index) => ({
                                text: label,
                                strokeStyle: chart.data.datasets[0].borderColor[index],
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                hidden: visibility[index]
                            })
                        )
                    }
                }
            },
            title: {
                display: true,
                text: 'Completed Transaction/Month',
                font: {
                    size: 30
                }
            },
            datalabels: {
                display: false
            }
        },

    };

    return (
        <Fragment>
            <MetaData title={'Dashboard'} />
            {loading ? <Loader /> : (
                <div className="col-md-6"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.4)',
                        flex: '0 0 48%',
                        padding: '20px'
                    }}>

                    <Bar
                        // labels={appointmentDates}
                        data={state}
                        options={options}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
                        <div className="form-group">
                            <label >From: </label>
                            <input type="date" ref={appointmentRefStart} onChange={filterData1} value={appointmentStart} />
                            <label > To: </label>
                            <input type="date" ref={appointmentRefEnd} onChange={filterData2} value={appointmentEnd} />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}
export default BarChart
