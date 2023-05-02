import axios from 'axios';

import {

    NEW_INQUIRY_REQUEST,
    NEW_INQUIRY_SUCCESS,
    NEW_INQUIRY_FAIL,

    ALL_INQUIRY_REQUEST,
    ALL_INQUIRY_SUCCESS,
    ALL_INQUIRY_FAIL,

    MY_INQUIRY_REQUEST,
    MY_INQUIRY_SUCCESS,
    MY_INQUIRY_FAIL,

    CLIENT_INQUIRY_REQUEST,
    CLIENT_INQUIRY_SUCCESS,
    CLIENT_INQUIRY_FAIL,

    SINGLE_INQUIRY_REQUEST,
    SINGLE_INQUIRY_SUCCESS,
    SINGLE_INQUIRY_FAIL,

    UPDATE_STATUS_REQUEST,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_FAIL,

    CLEAR_ERRORS
} from '../constants/inquiryConstants';




export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newInquiry = (inquiryData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_INQUIRY_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/inquiry/new', inquiryData, config)

        dispatch({
            type: NEW_INQUIRY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getInquiries = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_INQUIRY_REQUEST })

        const { data } = await axios.get(`/api/v1/inquiries`)

        dispatch({
            type: ALL_INQUIRY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyInquiries = () => async (dispatch) => {
    try {

        dispatch({ type: MY_INQUIRY_REQUEST })

        const { data } = await axios.get(`/api/v1/my-inquiries`)

        dispatch({
            type: MY_INQUIRY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MY_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getClientInquiries = () => async (dispatch) => {
    try {

        dispatch({ type: CLIENT_INQUIRY_REQUEST })

        const { data } = await axios.get(`/api/v1/client-inquiries`)

        dispatch({
            type: CLIENT_INQUIRY_SUCCESS,

            payload: data
        })

    } catch (error) {
        dispatch({
            type: CLIENT_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSingleInquiry = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_INQUIRY_REQUEST })
        const { data } = await axios.get(`/api/v1/inquiry/${id}`)
        dispatch({
            type: SINGLE_INQUIRY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}



export const updateStatus = (id, statusData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_STATUS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/inquiry/${id}`, statusData, config)

        dispatch({
            type: UPDATE_STATUS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_STATUS_FAIL,
            payload: error.response.data.message
        })
    }
}