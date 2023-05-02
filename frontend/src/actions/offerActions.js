import axios from 'axios';

import {

    NEW_OFFER_REQUEST,
    NEW_OFFER_SUCCESS,
    NEW_OFFER_FAIL,

    SINGLE_OFFER_REQUEST,
    SINGLE_OFFER_SUCCESS,
    SINGLE_OFFER_FAIL,


    GET_OFFERS_REQUEST,
    GET_OFFERS_SUCCESS,
    GET_OFFERS_FAIL,

    REQUEST_OFFERS_REQUEST,
    REQUEST_OFFERS_SUCCESS,
    REQUEST_OFFERS_FAIL,

    UPDATE_STATUS_REQUEST,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_FAIL,

    ACCEPT_OFFER_REQUEST,
    ACCEPT_OFFER_SUCCESS,
    ACCEPT_OFFER_FAIL,

    UPDATE_OFFER_REQUEST,
    UPDATE_OFFER_SUCCESS,
    UPDATE_OFFER_FAIL,

    CLEAR_ERRORS
} from '../constants/offerConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newOffer = (offerData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_OFFER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/offer/new', offerData, config)

        dispatch({
            type: NEW_OFFER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getOffers = () => async (dispatch) => {
    try {

        dispatch({ type: GET_OFFERS_REQUEST })




        const { data } = await axios.get(`/api/v1/offers`)


        dispatch({
            type: GET_OFFERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_OFFERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const SingleOffer = (id) => async (dispatch) => {
    try {


        dispatch({ type: SINGLE_OFFER_REQUEST })
        const { data } = await axios.get(`/api/v1/offer/${id}`)
        dispatch({
            type: SINGLE_OFFER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const RequestOffer = (request_id) => async (dispatch) => {
    try {


        dispatch({ type: REQUEST_OFFERS_REQUEST })
        const { data } = await axios.get(`/api/v1/offers-request/${request_id}`)
        dispatch({
            type: REQUEST_OFFERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REQUEST_OFFERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const CancelOtherOffer = (id) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_STATUS_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/cancel-offer/${id}`, config)

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


export const AcceptOffer = (id) => async (dispatch) => {
    try {

        dispatch({ type: ACCEPT_OFFER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/accept-offer/${id}`, config)

        dispatch({
            type: ACCEPT_OFFER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ACCEPT_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateOffer = (id, offerData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_OFFER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/offer/${id}`, offerData, config)

        dispatch({
            type: UPDATE_OFFER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_OFFER_FAIL,
            payload: error.response.data.message
        })
    }
}

