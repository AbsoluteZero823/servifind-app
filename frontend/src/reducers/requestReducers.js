import {

    NEW_REQUEST_REQUEST,
    NEW_REQUEST_SUCCESS,
    NEW_REQUEST_RESET,
    NEW_REQUEST_FAIL,


    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_FAIL,

    SINGLE_REQUEST_REQUEST,
    SINGLE_REQUEST_SUCCESS,
    SINGLE_REQUEST_FAIL,


    CLEAR_ERRORS
} from '../constants/requestConstants'


export const newRequestReducer = (state = { request: {} }, action) => {
    switch (action.type) {

        case NEW_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REQUEST_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                request: action.payload.request
            }

        case NEW_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REQUEST_RESET:
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


export const getRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {


        case GET_REQUESTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action.payload.requests,
            }

        case GET_REQUESTS_FAIL:
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

export const requestDetailsReducer = (state = { singlerequest: {} }, action) => {
    switch (action.type) {

        case SINGLE_REQUEST_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case SINGLE_REQUEST_SUCCESS:
            return {
                ...state,
                loadings: false,
                singlerequest: action.payload.singlerequest,
            }

        case SINGLE_REQUEST_FAIL:
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

