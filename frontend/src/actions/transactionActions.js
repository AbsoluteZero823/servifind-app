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

    GET_TRANSACTIONCOURSES_REQUEST,
    GET_TRANSACTIONCOURSES_SUCCESS,
    GET_TRANSACTIONCOURSES_FAIL,

    GET_TRANSACTIONMONTH_REQUEST,
    GET_TRANSACTIONMONTH_SUCCESS,
    GET_TRANSACTIONMONTH_FAIL,

    GET_SERVICECOURSES_REQUEST,
    GET_SERVICECOURSES_SUCCESS,
    GET_SERVICECOURSES_FAIL,

    GET_SERVICELEADERBOARDS_REQUEST,
    GET_SERVICELEADERBOARDS_SUCCESS,
    GET_SERVICELEADERBOARDS_FAIL,

    GET_DASHBOARDINFO_REQUEST,
    GET_DASHBOARDINFO_SUCCESS,
    GET_DASHBOARDINFO_FAIL,

    GET_DASHBOARDCOUNTS_REQUEST,
    GET_DASHBOARDCOUNTS_SUCCESS,
    GET_DASHBOARDCOUNTS_FAIL,

    GET_TRANSACTIONUSERS_REQUEST,
    GET_TRANSACTIONUSERS_SUCCESS,
    GET_TRANSACTIONUSERS_FAIL,

    GET_TRANS_USERS_MONTH_REQUEST,
    GET_TRANS_USERS_MONTH_SUCCESS,
    GET_TRANS_USERS_MONTH_FAIL,

    GET_TRANSACTIONDASHBOARD_REQUEST,
    GET_TRANSACTIONDASHBOARD_SUCCESS,
    GET_TRANSACTIONDASHBOARD_FAIL,

    GET_PROCESSING_REQUEST,
    GET_PROCESSING_SUCCESS,
    GET_PROCESSING_FAIL,

    GET_TOPAY_REQUEST,
    GET_TOPAY_SUCCESS,
    GET_TOPAY_FAIL,

    GET_TOCONFIRM_REQUEST,
    GET_TOCONFIRM_SUCCESS,
    GET_TOCONFIRM_FAIL,

    GET_COMPLETED_REQUEST,
    GET_COMPLETED_SUCCESS,
    GET_COMPLETED_FAIL,

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



export const getTransactions = (formData) => async (dispatch) => {

    console.log(formData, 'sana')
    try {

        dispatch({ type: GET_TRANSACTIONS_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        // const { data } = await axios.get(`/api/v1/transactions`)
        const { data } = await axios.get('/api/v1/transactions', {
            params: formData // formData will be sent as query parameters
        }, config)

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
            payload: data
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
            payload: data
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
            payload: data
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
            payload: data
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
            payload: data
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


export const getTransactionPerCourses = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TRANSACTIONCOURSES_REQUEST })

        const { data } = await axios.get(`/api/v1/transactionpercourses`)

        dispatch({
            type: GET_TRANSACTIONCOURSES_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_TRANSACTIONCOURSES_FAIL,
            payload: error.response.data.message
        })
    }
}





export const getTransactionPerMonth = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TRANSACTIONMONTH_REQUEST })

        const { data } = await axios.get(`/api/v1/transactionpermonth`)

        dispatch({
            type: GET_TRANSACTIONMONTH_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_TRANSACTIONMONTH_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getTopTenServices = () => async (dispatch) => {
    try {

        dispatch({ type: GET_SERVICECOURSES_REQUEST })

        const { data } = await axios.get(`/api/v1/topservicepercourses`)

        dispatch({
            type: GET_SERVICECOURSES_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_SERVICECOURSES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getServiceLeaderboards = () => async (dispatch) => {
    try {

        dispatch({ type: GET_SERVICELEADERBOARDS_REQUEST })

        const { data } = await axios.get(`/api/v1/serviceleaderboards`)

        dispatch({
            type: GET_SERVICELEADERBOARDS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_SERVICELEADERBOARDS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDashboardInfo = () => async (dispatch) => {
    try {

        dispatch({ type: GET_DASHBOARDINFO_REQUEST })

        const { data } = await axios.get(`/api/v1/dashboardinfo`)

        dispatch({
            type: GET_DASHBOARDINFO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_DASHBOARDINFO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDashboardCounts = () => async (dispatch) => {
    try {

        dispatch({ type: GET_DASHBOARDCOUNTS_REQUEST })

        const { data } = await axios.get(`/api/v1/dashboard/counts`)

        dispatch({
            type: GET_DASHBOARDCOUNTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_DASHBOARDCOUNTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTransactionPerUsers = () => async (dispatch) => {

    try {

        dispatch({ type: GET_TRANSACTIONUSERS_REQUEST })

        const { data } = await axios.get(`/api/v1/transactionperuser`)
        // const { data } = await axios.get(`/api/v1/transactionperuser`, {
        //     params: formData // formData will be sent as query parameters
        // })
        dispatch({
            type: GET_TRANSACTIONUSERS_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_TRANSACTIONUSERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTransactionPerUsersByMonth = (formData) => async (dispatch) => {

    try {

        dispatch({ type: GET_TRANS_USERS_MONTH_REQUEST })

        // const { data } = await axios.get(`/api/v1/transactionperuser`)
        const { data } = await axios.get(`/api/v1/transactionperuserbymonth`, {
            params: formData // formData will be sent as query parameters
        })
        dispatch({
            type: GET_TRANS_USERS_MONTH_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_TRANS_USERS_MONTH_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTransactionDashboard = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TRANSACTIONDASHBOARD_REQUEST })

        const { data } = await axios.get(`/api/v1/transaction-dashboard`)

        dispatch({
            type: GET_TRANSACTIONDASHBOARD_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_TRANSACTIONDASHBOARD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProcessingData = () => async (dispatch) => {
    try {

        dispatch({ type: GET_PROCESSING_REQUEST })

        const { data } = await axios.get(`/api/v1/transaction-processing`)

        dispatch({
            type: GET_PROCESSING_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_PROCESSING_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getToPayData = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TOPAY_REQUEST })

        const { data } = await axios.get(`/api/v1/transaction-to-pay`)

        dispatch({
            type: GET_TOPAY_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_TOPAY_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getToConfirmData = () => async (dispatch) => {
    try {

        dispatch({ type: GET_TOCONFIRM_REQUEST })

        const { data } = await axios.get(`/api/v1/transaction-to-confirm`)

        dispatch({
            type: GET_TOCONFIRM_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_TOCONFIRM_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getCompletedData = () => async (dispatch) => {
    try {

        dispatch({ type: GET_COMPLETED_REQUEST })

        const { data } = await axios.get(`/api/v1/transaction-completed`)

        dispatch({
            type: GET_COMPLETED_SUCCESS,
            payload: data

        })

    } catch (error) {
        dispatch({
            type: GET_COMPLETED_FAIL,
            payload: error.response.data.message
        })
    }
}