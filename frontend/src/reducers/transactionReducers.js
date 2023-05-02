import {
    NEW_TRANSACTION_REQUEST,
    NEW_TRANSACTION_SUCCESS,
    NEW_TRANSACTION_RESET,
    NEW_TRANSACTION_FAIL,


    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,

    SINGLE_TRANSACTION_REQUEST,
    SINGLE_TRANSACTION_SUCCESS,
    SINGLE_TRANSACTION_FAIL,

    UPDATE_PSENT_REQUEST,
    UPDATE_PSENT_SUCCESS,
    UPDATE_PSENT_RESET,
    UPDATE_PSENT_FAIL,

    UPDATE_PRECEIVED_REQUEST,
    UPDATE_PRECEIVED_SUCCESS,
    UPDATE_PRECEIVED_RESET,
    UPDATE_PRECEIVED_FAIL,

    UPDATE_TRANSACTIONDONE_REQUEST,
    UPDATE_TRANSACTIONDONE_SUCCESS,
    UPDATE_TRANSACTIONDONE_RESET,
    UPDATE_TRANSACTIONDONE_FAIL,

    UPDATE_RATEDONE_REQUEST,
    UPDATE_RATEDONE_SUCCESS,
    UPDATE_RATEDONE_RESET,
    UPDATE_RATEDONE_FAIL,

    UPDATE_REPORTDONE_REQUEST,
    UPDATE_REPORTDONE_SUCCESS,
    UPDATE_REPORTDONE_RESET,
    UPDATE_REPORTDONE_FAIL,

    UPDATE_TRANSACTION_REQUEST,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_RESET,
    UPDATE_TRANSACTION_FAIL,

    CLEAR_ERRORS
} from '../constants/transactionConstants'


export const newTransactionReducer = (state = { transaction: {} }, action) => {
    switch (action.type) {

        case NEW_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_TRANSACTION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                transaction: action.payload.transaction
            }

        case NEW_TRANSACTION_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_TRANSACTION_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const getTransactionsReducer = (state = { transactions: [] }, action) => {
    switch (action.type) {


        case GET_TRANSACTIONS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload.transactions,
            }

        case GET_TRANSACTIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const transactionDetailsReducer = (state = { transaction: {} }, action) => {
    switch (action.type) {

        case SINGLE_TRANSACTION_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case SINGLE_TRANSACTION_SUCCESS:
            return {
                ...state,
                loadings: false,
                transaction: action.payload.transaction,
            }

        case SINGLE_TRANSACTION_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const paymentReducer = (state = {}, action) => {
    switch (action.type) {


        case UPDATE_PSENT_REQUEST:
        case UPDATE_PRECEIVED_REQUEST:
        case UPDATE_TRANSACTIONDONE_REQUEST:
        case UPDATE_RATEDONE_REQUEST:
        case UPDATE_REPORTDONE_REQUEST:
        default:
            return {

                ...state,
                loadingpayment: true
            }


        case UPDATE_PSENT_SUCCESS:
        case UPDATE_PRECEIVED_SUCCESS:
        case UPDATE_TRANSACTIONDONE_SUCCESS:
        case UPDATE_RATEDONE_SUCCESS:
        case UPDATE_REPORTDONE_SUCCESS:
            return {
                ...state,
                loadingpayment: false,
                isUpdated: action.payload
            }

        case UPDATE_PSENT_RESET:
        case UPDATE_PRECEIVED_RESET:
        case UPDATE_TRANSACTIONDONE_RESET:
        case UPDATE_RATEDONE_RESET:
        case UPDATE_REPORTDONE_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case UPDATE_PSENT_FAIL:
        case UPDATE_PRECEIVED_FAIL:
        case UPDATE_TRANSACTIONDONE_FAIL:
        case UPDATE_RATEDONE_FAIL:
        case UPDATE_REPORTDONE_FAIL:
            return {
                ...state,
                error: action.payload
            }
    }
}


export const updateTransactionReducer = (state = {}, action) => {
    switch (action.type) {



        case UPDATE_TRANSACTION_REQUEST:

        default:
            return {

                ...state,
                loadingUptTrans: true
            }



        case UPDATE_TRANSACTION_SUCCESS:

            return {
                ...state,
                loadingUptTrans: false,
                isUpdated: action.payload
            }


        case UPDATE_TRANSACTION_RESET:

            return {
                ...state,
                isUpdated: false
            }


        case UPDATE_TRANSACTION_FAIL:

            return {
                ...state,
                error: action.payload
            }
    }
}