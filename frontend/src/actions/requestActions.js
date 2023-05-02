import axios from 'axios';

import {

    NEW_REQUEST_REQUEST,
    NEW_REQUEST_SUCCESS,
    NEW_REQUEST_FAIL,

    SINGLE_REQUEST_REQUEST,
    SINGLE_REQUEST_SUCCESS,
    SINGLE_REQUEST_FAIL,


    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_FAIL,

    CLEAR_ERRORS
} from '../constants/requestConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newRequest = (requestData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REQUEST_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/request/new', requestData, config)

        dispatch({
            type: NEW_REQUEST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_REQUEST_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getRequests = (categoryId) => async (dispatch) => {
    try {

        dispatch({ type: GET_REQUESTS_REQUEST })

        let link = `/api/v1/requests?`

        if (categoryId) {
            link = `/api/v1/requests?category=${categoryId}`

            // const { data } = await axios.get(`/api/v1/requests`)
        }
        const { data } = await axios.get(link)

        dispatch({
            type: GET_REQUESTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_REQUESTS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const SingleRequest = (id) => async (dispatch) => {
    try {


        dispatch({ type: SINGLE_REQUEST_REQUEST })
        const { data } = await axios.get(`/api/v1/request/${id}`)
        dispatch({
            type: SINGLE_REQUEST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_REQUEST_FAIL,
            payload: error.response.data.message
        })
    }
}

