import {

    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
    NEW_NOTIFICATION_RESET,
    NEW_NOTIFICATION_FAIL,


    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAIL,


    GET_MYNOTIFICATIONS_REQUEST,
    GET_MYNOTIFICATIONS_SUCCESS,
    GET_MYNOTIFICATIONS_FAIL,

    READ_MYNOTIFICATION_REQUEST,
    READ_MYNOTIFICATION_SUCCESS,
    READ_MYNOTIFICATION_FAIL,
    READ_MYNOTIFICATION_RESET,

    READ_ALLMYNOTIFICATION_REQUEST,
    READ_ALLMYNOTIFICATION_SUCCESS,
    READ_ALLMYNOTIFICATION_FAIL,
    READ_ALLMYNOTIFICATION_RESET,

    CLEAR_ERRORS
} from '../constants/notificationConstants'


export const newNotificationReducer = (state = { notification: {} }, action) => {
    switch (action.type) {

        case NEW_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_NOTIFICATION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                notification: action.payload.notification
            }

        case NEW_NOTIFICATION_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_NOTIFICATION_RESET:
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


export const getNotificationsReducer = (state = { notifications: [] }, action) => {
    switch (action.type) {


        case GET_NOTIFICATIONS_REQUEST:
            case GET_MYNOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_NOTIFICATIONS_SUCCESS:
            case GET_MYNOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload.notifications,
            }

        case GET_NOTIFICATIONS_FAIL:
            case GET_MYNOTIFICATIONS_FAIL:
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


export const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case READ_MYNOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            }
            case READ_MYNOTIFICATION_SUCCESS:

            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
            case READ_MYNOTIFICATION_RESET:
            return {
                ...state,
                isUpdated: false
            }
            case READ_MYNOTIFICATION_FAIL:
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

export const readAllMyNotificationReducer = (state = {}, action) => {
    switch (action.type) {
        case READ_ALLMYNOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true
            }
            case READ_ALLMYNOTIFICATION_SUCCESS:

            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
            case READ_ALLMYNOTIFICATION_RESET:
            return {
                ...state,
                isUpdated: false
            }
            case READ_ALLMYNOTIFICATION_FAIL:
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