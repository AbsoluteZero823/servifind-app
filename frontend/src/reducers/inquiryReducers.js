
import {
    NEW_INQUIRY_REQUEST,
    NEW_INQUIRY_SUCCESS,
    NEW_INQUIRY_RESET,
    NEW_INQUIRY_FAIL,

    ALL_INQUIRY_REQUEST,
    ALL_INQUIRY_SUCCESS,
    ALL_INQUIRY_RESET,
    ALL_INQUIRY_FAIL,

    MY_INQUIRY_REQUEST,
    MY_INQUIRY_SUCCESS,
    MY_INQUIRY_RESET,
    MY_INQUIRY_FAIL,

    CLIENT_INQUIRY_REQUEST,
    CLIENT_INQUIRY_SUCCESS,
    CLIENT_INQUIRY_RESET,
    CLIENT_INQUIRY_FAIL,

    SINGLE_INQUIRY_REQUEST,
    SINGLE_INQUIRY_SUCCESS,
    SINGLE_INQUIRY_RESET,
    SINGLE_INQUIRY_FAIL,

    UPDATE_STATUS_REQUEST,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_RESET,
    UPDATE_STATUS_FAIL,

    CLEAR_ERRORS
} from '../constants/inquiryConstants'


export const newInquiryReducer = (state = { inquiry: {} }, action) => {
    switch (action.type) {

        case NEW_INQUIRY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_INQUIRY_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                inquiry: action.payload.inquiry
            }

        case NEW_INQUIRY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_INQUIRY_RESET:
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

export const inquiriesReducer = (state = { inquiries: [] }, action) => {
    switch (action.type) {

        case ALL_INQUIRY_REQUEST:
        case MY_INQUIRY_REQUEST:   
        case CLIENT_INQUIRY_REQUEST: 
            return {
                ...state,
                loading: true,
            }

        case ALL_INQUIRY_SUCCESS:
        case MY_INQUIRY_SUCCESS:
        case CLIENT_INQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                inquiries: action.payload.inquiries,
            }

        case ALL_INQUIRY_FAIL:
        case MY_INQUIRY_FAIL:
        case CLIENT_INQUIRY_FAIL:
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

export const inquiryDetailsReducer = (state = { inquiry: {} }, action) => {
    switch (action.type) {
        // case SERVICE_DETAILS_REQUEST:
        case SINGLE_INQUIRY_REQUEST:
            return {
                ...state,
                loading: true
            }
        // case SERVICE_DETAILS_SUCCESS:
        case SINGLE_INQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                inquiry: action.payload.inquiry,
            }
        // case SERVICE_DETAILS_FAIL:
        case SINGLE_INQUIRY_FAIL:
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



export const statusReducer = (state = {}, action) => {
    switch (action.type) {

        
        case UPDATE_STATUS_REQUEST:
            default:
            return {
                
                ...state,
                loading: true
            }

     
        case UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_STATUS_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case UPDATE_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        }
    }