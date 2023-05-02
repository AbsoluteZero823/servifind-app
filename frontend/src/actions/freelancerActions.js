import axios from 'axios';

import {

    GET_FREELANCERS_REQUEST,
    GET_FREELANCERS_SUCCESS,
    GET_FREELANCERS_FAIL,

    SINGLE_FREELANCER_REQUEST,
    SINGLE_FREELANCER_SUCCESS,
    SINGLE_FREELANCER_FAIL,

    NEW_FREELANCER_REQUEST,
    NEW_FREELANCER_SUCCESS,
    NEW_FREELANCER_FAIL,

    GET_APPLICATION_REQUEST,
    GET_APPLICATION_SUCCESS,
    GET_APPLICATION_FAIL,

    APPROVE_APPLICATION_REQUEST,
    APPROVE_APPLICATION_SUCCESS,
    APPROVE_APPLICATION_FAIL,

    REJECT_APPLICATION_REQUEST,
    REJECT_APPLICATION_SUCCESS,
    REJECT_APPLICATION_FAIL,

    AVAIL_PREMIUM_REQUEST,
    AVAIL_PREMIUM_SUCCESS,
    AVAIL_PREMIUM_FAIL,

    GET_APPLICATIONPREMIUM_REQUEST,
    GET_APPLICATIONPREMIUM_SUCCESS,
    GET_APPLICATIONPREMIUM_FAIL,

    APPROVE_APPLICATIONPREMIUM_REQUEST,
    APPROVE_APPLICATIONPREMIUM_SUCCESS,
    APPROVE_APPLICATIONPREMIUM_FAIL,

    REJECT_APPLICATIONPREMIUM_REQUEST,
    REJECT_APPLICATIONPREMIUM_SUCCESS,
    REJECT_APPLICATIONPREMIUM_FAIL,

    AVAILABILITY_UPDATE_REQUEST,
    AVAILABILITY_UPDATE_SUCCESS,
    AVAILABILITY_UPDATE_FAIL,

    FREELANCER_SETUP_REQUEST,
    FREELANCER_SETUP_SUCCESS,
    FREELANCER_SETUP_FAIL,

    CLEAR_ERRORS
} from '../constants/freelancerConstants';




export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}




export const getFreelancers = () => async (dispatch) => {
    try {

        dispatch({ type: GET_FREELANCERS_REQUEST })

        const { data } = await axios.get(`/api/v1/freelancers`)

        dispatch({
            type: GET_FREELANCERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_FREELANCERS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const SingleFreelancer = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_FREELANCER_REQUEST })
        const { data } = await axios.get(`/api/v1/freelancer/details/${id}`)
        dispatch({
            type: SINGLE_FREELANCER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_FREELANCER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const newFreelancer = (freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_FREELANCER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/freelancer/new', freelancerData, config)

        dispatch({
            type: NEW_FREELANCER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_FREELANCER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getApplicationEntries = () => async (dispatch) => {
    try {

        dispatch({ type: GET_APPLICATION_REQUEST })

        const { data } = await axios.get(`/api/v1/application-entries`)

        dispatch({
            type: GET_APPLICATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_APPLICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const approveApplication = (id, freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: APPROVE_APPLICATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/application-approve/${id}`, freelancerData, config)

        dispatch({
            type: APPROVE_APPLICATION_SUCCESS,
            // payload: data.success,
            payload: data.isUpdated
        })

    } catch (error) {
        dispatch({
            type: APPROVE_APPLICATION_FAIL,
            payload: error.response.data.message
        })
    }
}
export const rejectApplication = (id, freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: REJECT_APPLICATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/application-reject/${id}`, freelancerData, config)

        dispatch({
            type: REJECT_APPLICATION_SUCCESS,
            // payload: data.success
            payload: data.isUpdated
        })

    } catch (error) {
        dispatch({
            type: REJECT_APPLICATION_FAIL,
            payload: error.response.data.message
        })
    }
}


export const availPremium = (freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: AVAIL_PREMIUM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/avail-premium`, freelancerData, config)

        dispatch({
            type: AVAIL_PREMIUM_SUCCESS,
            // payload: data.success
            payload: data.isUpdated
        })

    } catch (error) {
        dispatch({
            type: AVAIL_PREMIUM_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getApplicationPremium = () => async (dispatch) => {
    try {

        dispatch({ type: GET_APPLICATIONPREMIUM_REQUEST })

        const { data } = await axios.get(`/api/v1/application-premium`)

        dispatch({
            type: GET_APPLICATIONPREMIUM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_APPLICATIONPREMIUM_FAIL,
            payload: error.response.data.message
        })
    }
}

export const approveApplicationPremium = (id, freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: APPROVE_APPLICATIONPREMIUM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/approve-premium/${id}`, freelancerData, config)

        dispatch({
            type: APPROVE_APPLICATIONPREMIUM_SUCCESS,
            // payload: data.success,
            payload: data.isUpdated
        })

    } catch (error) {
        dispatch({
            type: APPROVE_APPLICATIONPREMIUM_FAIL,
            payload: error.response.data.message
        })
    }
}
export const rejectApplicationPremium = (id, freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: REJECT_APPLICATIONPREMIUM_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/reject-premium/${id}`, freelancerData, config)

        dispatch({
            type: REJECT_APPLICATIONPREMIUM_SUCCESS,
            // payload: data.success
            payload: data.isUpdated
        })

    } catch (error) {
        dispatch({
            type: REJECT_APPLICATIONPREMIUM_FAIL,
            payload: error.response.data.message
        })
    }
}

export const availabilityUpdate = (freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: AVAILABILITY_UPDATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/availability-update`, freelancerData, config)

        dispatch({
            type: AVAILABILITY_UPDATE_SUCCESS,
            // payload: data.success
            payload: data.isUpdated
        })

    } catch (error) {
        dispatch({
            type: AVAILABILITY_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const completeFreelancerSetup = (freelancerData) => async (dispatch) => {
    try {

        dispatch({ type: FREELANCER_SETUP_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/complete-setup`, freelancerData, config)

        dispatch({
            type: FREELANCER_SETUP_SUCCESS,
            // payload: data.success
            payload: data.isUpdated
        })

    } catch (error) {
        dispatch({
            type: FREELANCER_SETUP_FAIL,
            payload: error.response.data.message
        })
    }
}