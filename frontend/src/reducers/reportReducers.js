import {

    NEW_REPORT_REQUEST,
    NEW_REPORT_SUCCESS,
    NEW_REPORT_RESET,
    NEW_REPORT_FAIL,


    GET_REPORTS_REQUEST,
    GET_REPORTS_SUCCESS,
    GET_REPORTS_FAIL,

    SINGLE_REPORT_REQUEST,
    SINGLE_REPORT_SUCCESS,
    SINGLE_REPORT_FAIL,


    CLEAR_ERRORS
} from '../constants/reportConstants'


export const newReportReducer = (state = { report: {} }, action) => {
    switch (action.type) {

        case NEW_REPORT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REPORT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                report: action.payload.report
            }

        case NEW_REPORT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REPORT_RESET:
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


export const getReportsReducer = (state = { reports: [] }, action) => {
    switch (action.type) {


        case GET_REPORTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_REPORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                reports: action.payload.reports,
            }

        case GET_REPORTS_FAIL:
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

export const reportDetailsReducer = (state = { report: {} }, action) => {
    switch (action.type) {

        case SINGLE_REPORT_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case SINGLE_REPORT_SUCCESS:
            return {
                ...state,
                loadings: false,
                report: action.payload.report,
            }

        case SINGLE_REPORT_FAIL:
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

