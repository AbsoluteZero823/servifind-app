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
                success: action.payload.success
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

        default:
            return {

                ...state,
                loadingpayment: true,
            }


        case UPDATE_PSENT_SUCCESS:

            return {
                ...state,
                loadingpayment: false,

                success: action.payload.success,
                updatedTransaction: action.payload.updatedTransaction
            }

        case UPDATE_PSENT_RESET:

            return {
                ...state,
                success: false
            }

        case UPDATE_PSENT_FAIL:

            return {
                ...state,
                error: action.payload
            }
    }
}

export const reportDoneReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_REPORTDONE_REQUEST:
        default:
            return {

                ...state,
                loading: true,
            }


        case UPDATE_REPORTDONE_SUCCESS:
            return {
                ...state,
                loading: false,

                success: action.payload.success,
                updatedTransaction: action.payload.updatedTransaction
            }

        case UPDATE_REPORTDONE_RESET:
            return {
                ...state,
                success: false
            }


        case UPDATE_REPORTDONE_FAIL:
            return {
                ...state,
                error: action.payload
            }
    }
}
export const rateDoneReducer = (state = {}, action) => {
    switch (action.type) {




        case UPDATE_RATEDONE_REQUEST:

        default:
            return {

                ...state,
                loading: true,
            }




        case UPDATE_RATEDONE_SUCCESS:

            return {
                ...state,
                loading: false,

                success: action.payload.success,
                updatedTransaction: action.payload.updatedTransaction
            }



        case UPDATE_RATEDONE_RESET:

            return {
                ...state,
                success: false
            }

        case UPDATE_RATEDONE_FAIL:

            return {
                ...state,
                error: action.payload
            }
    }
}

//not done
export const paymentReceivedReducer = (state = {}, action) => {
    switch (action.type) {



        case UPDATE_PRECEIVED_REQUEST:

        default:
            return {

                ...state,
                loading: true,
            }



        case UPDATE_PRECEIVED_SUCCESS:


            return {
                ...state,
                loading: false,

                success: action.payload.success,
                updatedTransaction: action.payload.updatedTransaction
            }


        case UPDATE_PRECEIVED_RESET:



            return {
                ...state,
                success: false
            }


        case UPDATE_PRECEIVED_FAIL:


            return {
                ...state,
                error: action.payload
            }
    }
}
export const transactionDoneReducer = (state = {}, action) => {
    switch (action.type) {



        case UPDATE_TRANSACTIONDONE_REQUEST:


        default:
            return {

                ...state,
                loading: true,
            }


        case UPDATE_TRANSACTIONDONE_SUCCESS:

            return {
                ...state,
                loading: false,

                success: action.payload.success,
                updatedTransaction: action.payload.updatedTransaction
            }

        case UPDATE_TRANSACTIONDONE_RESET:

            return {
                ...state,
                success: false
            }


        case UPDATE_TRANSACTIONDONE_FAIL:

            return {
                ...state,
                error: action.payload
            }
    }
}
//pag hiwalayin para maayos ang notif
//pag hiwalayin para maayos ang notif

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
                isUpdatedTrans: action.payload
            }


        case UPDATE_TRANSACTION_RESET:

            return {
                ...state,
                isUpdatedTrans: false

            }


        case UPDATE_TRANSACTION_FAIL:

            return {
                ...state,
                error: action.payload
            }
    }
}


export const getTransactionCoursesReducer = (state = { sectionArr: [] }, action) => {
    switch (action.type) {


        case GET_TRANSACTIONCOURSES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_TRANSACTIONCOURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                sectionArr: action.payload.sectionArr,
                success: action.payload.success,
            }

        case GET_TRANSACTIONCOURSES_FAIL:
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


export const getServiceCoursesReducer = (state = { topServicesArr: [] }, action) => {
    switch (action.type) {


        case GET_SERVICECOURSES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_SERVICECOURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                topServicesArr: action.payload.topServicesArr,
                success: action.payload.success,
            }

        case GET_SERVICECOURSES_FAIL:
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
export const getTransactionMonthReducer = (state = { completionDate: [] }, action) => {
    switch (action.type) {
        case GET_TRANSACTIONMONTH_REQUEST:
            return {
                ...state,
                loading: true,
                // borrowedDate: []
            }
        case GET_TRANSACTIONMONTH_SUCCESS:
            return {
                ...state,
                loading: false,
                completionDate: action.payload.completionDate,
                success: action.payload.success,
            }
        case GET_TRANSACTIONMONTH_FAIL:
            return {
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

export const getServiceLeaderboardsReducer = (state = { sortedService: [] }, action) => {
    switch (action.type) {
        case GET_SERVICELEADERBOARDS_REQUEST:
            return {
                ...state,
                loading: true,
                // borrowedDate: []
            }
        case GET_SERVICELEADERBOARDS_SUCCESS:
            return {
                ...state,
                loading: false,
                sortedService: action.payload.sortedService,
                success: action.payload.success,
            }
        case GET_SERVICELEADERBOARDS_FAIL:
            return {
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


export const getDashboardInfoReducer = (state = { result: [] }, action) => {
    switch (action.type) {
        case GET_DASHBOARDINFO_REQUEST:
        case GET_DASHBOARDCOUNTS_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case GET_DASHBOARDINFO_SUCCESS:
        case GET_DASHBOARDCOUNTS_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.payload.result,
                success: action.payload.success,
            }
        case GET_DASHBOARDINFO_FAIL:
        case GET_DASHBOARDCOUNTS_FAIL:
            return {
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

export const getTransactionUsersReducer = (state = { sectionArr: [] }, action) => {
    switch (action.type) {
        case GET_TRANSACTIONUSERS_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case GET_TRANSACTIONUSERS_SUCCESS:
            return {
                ...state,
                loading: false,
                sectionArr: action.payload.sectionArr,
                success: action.payload.success,
            }
        case GET_TRANSACTIONUSERS_FAIL:
            return {
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