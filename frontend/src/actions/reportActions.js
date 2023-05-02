import axios from 'axios';

import {

    NEW_REPORT_REQUEST,
    NEW_REPORT_SUCCESS,
    NEW_REPORT_FAIL,

    SINGLE_REPORT_REQUEST,
    SINGLE_REPORT_SUCCESS,
    SINGLE_REPORT_FAIL,


    GET_REPORTS_REQUEST,
    GET_REPORTS_SUCCESS,
    GET_REPORTS_FAIL,

    CLEAR_ERRORS
} from '../constants/reportConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newReport = (reportData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REPORT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/report/new', reportData, config)

        dispatch({
            type: NEW_REPORT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_REPORT_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getReports = () => async (dispatch) => {
    try {

        dispatch({ type: GET_REPORTS_REQUEST })

        const { data } = await axios.get(`/api/v1/reports`)

        dispatch({
            type: GET_REPORTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_REPORTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const SingleReport = (id) => async (dispatch) => {
    try {


        dispatch({ type: SINGLE_REPORT_REQUEST })
        const { data } = await axios.get(`/api/v1/report/${id}`)
        dispatch({
            type: SINGLE_REPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_REPORT_FAIL,
            payload: error.response.data.message
        })
    }
}

