import axios from 'axios';

import {

    NEW_TRANSACTION_REQUEST,
    NEW_TRANSACTION_SUCCESS,
    NEW_TRANSACTION_FAIL,

    SINGLE_TRANSACTION_REQUEST,
    SINGLE_TRANSACTION_SUCCESS,
    SINGLE_TRANSACTION_FAIL,


    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,

    UPDATE_PSENT_REQUEST,
    UPDATE_PSENT_SUCCESS,
    UPDATE_PSENT_FAIL,

    UPDATE_PRECEIVED_REQUEST,
    UPDATE_PRECEIVED_SUCCESS,
    UPDATE_PRECEIVED_FAIL,

    UPDATE_TRANSACTIONDONE_REQUEST,
    UPDATE_TRANSACTIONDONE_SUCCESS,
    UPDATE_TRANSACTIONDONE_FAIL,

    UPDATE_RATEDONE_REQUEST,
    UPDATE_RATEDONE_SUCCESS,
    UPDATE_RATEDONE_FAIL,

    UPDATE_REPORTDONE_REQUEST,
    UPDATE_REPORTDONE_SUCCESS,
    UPDATE_REPORTDONE_FAIL,

    UPDATE_TRANSACTION_REQUEST,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_FAIL,

    CLEAR_ERRORS
} from '../constants/transactionConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newTransaction = (transactionData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_TRANSACTION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/transaction/new', transactionData, config)

        dispatch({
            type: NEW_TRANSACTION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TRANSACTION_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getTransactions = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TRANSACTIONS_REQUEST })

        const { data } = await axios.get(`/api/v1/transactions`)

        dispatch({
            type: GET_TRANSACTIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_TRANSACTIONS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const SingleTransaction = (id) => async (dispatch) => {
    try {


        dispatch({ type: SINGLE_TRANSACTION_REQUEST })
        const { data } = await axios.get(`/api/v1/transaction/${id}`)
        dispatch({
            type: SINGLE_TRANSACTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_TRANSACTION_FAIL,
            payload: error.response.data.message
        })
    }
}


export const PaymentSent = (id, statusData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PSENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/transaction/${id}`, statusData, config)

        dispatch({
            type: UPDATE_PSENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PSENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const PaymentReceived = (id, statusData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRECEIVED_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/transaction/received/${id}`, statusData, config)

        dispatch({
            type: UPDATE_PRECEIVED_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRECEIVED_FAIL,
            payload: error.response.data.message
        })
    }
}

export const TransactionDone = (id, formData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_TRANSACTIONDONE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/transaction/done/${id}`, formData, config)

        dispatch({
            type: UPDATE_TRANSACTIONDONE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TRANSACTIONDONE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const RateDone = (id, rateData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_RATEDONE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/transaction/rated/${id}`, rateData, config)

        dispatch({
            type: UPDATE_RATEDONE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_RATEDONE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const ReportDone = (id, formData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_REPORTDONE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/transaction/reported/${id}`, formData, config)

        dispatch({
            type: UPDATE_REPORTDONE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_REPORTDONE_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateTransaction = (id, transactionData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_TRANSACTION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/transaction-update/${id}`, transactionData, config)

        dispatch({
            type: UPDATE_TRANSACTION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TRANSACTION_FAIL,
            payload: error.response.data.message
        })
    }
}
