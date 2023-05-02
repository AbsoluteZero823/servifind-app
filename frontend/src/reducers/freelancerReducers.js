
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
    NEW_FREELANCER_RESET,

    GET_APPLICATION_REQUEST,
    GET_APPLICATION_SUCCESS,
    GET_APPLICATION_FAIL,

    APPROVE_APPLICATION_REQUEST,
    APPROVE_APPLICATION_SUCCESS,
    APPROVE_APPLICATION_FAIL,
    APPROVE_APPLICATION_RESET,

    REJECT_APPLICATION_REQUEST,
    REJECT_APPLICATION_SUCCESS,
    REJECT_APPLICATION_FAIL,
    REJECT_APPLICATION_RESET,

    AVAIL_PREMIUM_REQUEST,
    AVAIL_PREMIUM_SUCCESS,
    AVAIL_PREMIUM_FAIL,
    AVAIL_PREMIUM_RESET,

    GET_APPLICATIONPREMIUM_REQUEST,
    GET_APPLICATIONPREMIUM_SUCCESS,
    GET_APPLICATIONPREMIUM_FAIL,

    APPROVE_APPLICATIONPREMIUM_REQUEST,
    APPROVE_APPLICATIONPREMIUM_SUCCESS,
    APPROVE_APPLICATIONPREMIUM_FAIL,
    APPROVE_APPLICATIONPREMIUM_RESET,

    REJECT_APPLICATIONPREMIUM_REQUEST,
    REJECT_APPLICATIONPREMIUM_SUCCESS,
    REJECT_APPLICATIONPREMIUM_FAIL,
    REJECT_APPLICATIONPREMIUM_RESET,

    AVAILABILITY_UPDATE_REQUEST,
    AVAILABILITY_UPDATE_SUCCESS,
    AVAILABILITY_UPDATE_FAIL,
    AVAILABILITY_UPDATE_RESET,

    FREELANCER_SETUP_REQUEST,
    FREELANCER_SETUP_SUCCESS,
    FREELANCER_SETUP_FAIL,
    FREELANCER_SETUP_RESET,

    CLEAR_ERRORS
} from '../constants/freelancerConstants'



export const freelancersReducer = (state = { freelancers: [] }, action) => {
    switch (action.type) {


        case GET_FREELANCERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_FREELANCERS_SUCCESS:

            return {
                ...state,
                loading: false,
                success: action.payload.success,
                freelancers: action.payload.freelancers,
            }

        case GET_FREELANCERS_FAIL:

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

export const freelancerDetailsReducer = (state = { freelancer: {} }, action) => {
    switch (action.type) {

        case SINGLE_FREELANCER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SINGLE_FREELANCER_SUCCESS:
            return {
                ...state,
                loading: false,
                freelancer: action.payload.freelancer,
            }

        case SINGLE_FREELANCER_FAIL:
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


export const newFreelancerReducer = (state = { freelancer: {} }, action) => {
    switch (action.type) {

        case NEW_FREELANCER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_FREELANCER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                freelancer: action.payload.freelancer
            }

        case NEW_FREELANCER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_FREELANCER_RESET:
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


export const applicationFreelancerReducer = (state = { applyingfreelancers: [] }, action) => {
    switch (action.type) {


        case GET_APPLICATION_REQUEST:
        case GET_APPLICATIONPREMIUM_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_APPLICATION_SUCCESS:
        case GET_APPLICATIONPREMIUM_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                applyingfreelancers: action.payload.applyingfreelancers,
            }

        case GET_APPLICATION_FAIL:
        case GET_APPLICATIONPREMIUM_FAIL:
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


export const updateFreelancerReducer = (state = {}, action) => {
    switch (action.type) {


        case APPROVE_APPLICATION_REQUEST:
        case REJECT_APPLICATION_REQUEST:
        case AVAIL_PREMIUM_REQUEST:
        case APPROVE_APPLICATIONPREMIUM_REQUEST:
        case REJECT_APPLICATIONPREMIUM_REQUEST:
            case AVAILABILITY_UPDATE_REQUEST:
                case FREELANCER_SETUP_REQUEST:
            return {
                ...state,
                loading: true
            }


        case APPROVE_APPLICATION_SUCCESS:
        case REJECT_APPLICATION_SUCCESS:
        case AVAIL_PREMIUM_SUCCESS:
        case APPROVE_APPLICATIONPREMIUM_SUCCESS:
        case REJECT_APPLICATIONPREMIUM_SUCCESS:
            case AVAILABILITY_UPDATE_SUCCESS:
                case FREELANCER_SETUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        // case DELETE_USER_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         isDeleted: action.payload
        //     }

        case APPROVE_APPLICATION_RESET:
        case REJECT_APPLICATION_RESET:
        case AVAIL_PREMIUM_RESET:
        case APPROVE_APPLICATIONPREMIUM_RESET:
        case REJECT_APPLICATIONPREMIUM_RESET:
            case AVAILABILITY_UPDATE_RESET:
                case FREELANCER_SETUP_RESET:
            return {
                ...state,
                isUpdated: false
            }

        // case DELETE_USER_RESET:
        //     return {
        //         ...state,
        //         isDeleted: false
        //     }

        case APPROVE_APPLICATION_FAIL:
        case REJECT_APPLICATION_FAIL:
        case AVAIL_PREMIUM_FAIL:
        case APPROVE_APPLICATIONPREMIUM_FAIL:
        case REJECT_APPLICATIONPREMIUM_FAIL:
            case AVAILABILITY_UPDATE_FAIL:
                case FREELANCER_SETUP_FAIL:
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

