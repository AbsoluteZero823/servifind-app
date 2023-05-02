import axios from 'axios';

import {
    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL,

    FREELANCER_SERVICES_REQUEST,
    FREELANCER_SERVICES_SUCCESS,
    FREELANCER_SERVICES_FAIL,

    //   FULL_SERVICES_REQUEST,
    //   FULL_SERVICES_SUCCESS, 
    //   FULL_SERVICES_FAIL,

    SINGLE_SERVICE_REQUEST,
    SINGLE_SERVICE_SUCCESS,
    SINGLE_SERVICE_FAIL,

    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,

    NEW_SERVICES_REQUEST,
    NEW_SERVICES_SUCCESS,
    NEW_SERVICES_FAIL,

    UPDATE_SERVICES_REQUEST,
    UPDATE_SERVICES_SUCCESS,
    UPDATE_SERVICES_FAIL,

    DELETE_SERVICES_REQUEST,
    DELETE_SERVICES_SUCCESS,
    DELETE_SERVICES_FAIL,

    CLEAR_ERRORS
} from '../constants/serviceConstants';


export const getServices = (keyword = '') => async (dispatch) => {
    try {

        dispatch({ type: ALL_SERVICES_REQUEST })

        const { data } = await axios.get(`/api/v1/services?keyword=${keyword}`)

        dispatch({
            type: ALL_SERVICES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const getServiceDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SERVICE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/service/${id}`)
        dispatch({
            type: SERVICE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SERVICE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}



export const newService = (serviceData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_SERVICES_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/service/new', serviceData, config)

        dispatch({
            type: NEW_SERVICES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateService = (id, serviceData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_SERVICES_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/service/${id}`, serviceData, config)

        dispatch({
            type: UPDATE_SERVICES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteService = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SERVICES_REQUEST })

        const { data } = await axios.delete(`/api/v1/service/${id}`)

        dispatch({
            type: DELETE_SERVICES_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }



}

export const SingleService = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_SERVICE_REQUEST })
        const { data } = await axios.get(`/api/v1/service/details/${id}`)
        dispatch({
            type: SINGLE_SERVICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_SERVICE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getFreelancerServices = (id) => async (dispatch) => {
    try {

        dispatch({ type: FREELANCER_SERVICES_REQUEST })

        const { data } = await axios.get(`/api/v1/services/${id}`)

        dispatch({
            type: FREELANCER_SERVICES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FREELANCER_SERVICES_FAIL,
            payload: error.response.data.message
        })
    }
}