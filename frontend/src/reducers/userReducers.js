import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_RESET,

    APPLICATION_USER_REQUEST,
    APPLICATION_USER_SUCCESS,
    APPLICATION_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

    ACTIVATE_USER_REQUEST,
    ACTIVATE_USER_SUCCESS,
    ACTIVATE_USER_RESET,
    ACTIVATE_USER_FAIL,

    DEACTIVATE_USER_REQUEST,
    DEACTIVATE_USER_SUCCESS,
    DEACTIVATE_USER_RESET,
    DEACTIVATE_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,



    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    ALL_FREELANCERS_REQUEST,
    ALL_FREELANCERS_SUCCESS,
    ALL_FREELANCERS_FAIL,



    NEW_USERS_REQUEST,
    NEW_USERS_SUCCESS,
    NEW_USERS_FAIL,
    NEW_USERS_RESET,



    // NEW_FREELANCERS_REQUEST,
    // NEW_FREELANCERS_SUCCESS,
    // NEW_FREELANCERS_FAIL,
    // NEW_FREELANCERS_RESET,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    CLEAR_ERRORS
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case LOGIN_REQUEST:
        // case REGISTER_USER_REQUEST:
        case APPLICATION_USER_REQUEST:
        case LOAD_USER_REQUEST:


            return {
                loading: true,
                isAuthenticated: false,
            }

        case LOGIN_SUCCESS:
        // case REGISTER_USER_SUCCESS:
        case APPLICATION_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                success: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LOGIN_FAIL:
        // case REGISTER_USER_FAIL:
        case APPLICATION_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
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


export const newUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case NEW_USERS_REQUEST:

        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_USERS_SUCCESS:

        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                user: action.payload.user
            }

        case NEW_USERS_FAIL:

        case REGISTER_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_USERS_RESET:

        case REGISTER_USER_RESET:

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

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case DEACTIVATE_USER_REQUEST:
        case ACTIVATE_USER_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:

            return {
                ...state,
                loading: true
            }
        case DEACTIVATE_USER_SUCCESS:
        case ACTIVATE_USER_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:

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
        case DEACTIVATE_USER_RESET:
        case ACTIVATE_USER_RESET:
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:

            return {
                ...state,
                isUpdated: false
            }

        // case DELETE_USER_RESET:
        //     return {
        //         ...state,
        //         isDeleted: false
        //     }
        case DEACTIVATE_USER_FAIL:
        case ACTIVATE_USER_FAIL:
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:

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

export const getUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {


        case ALL_USERS_REQUEST:

        case ALL_FREELANCERS_REQUEST:
            return {
                ...state,
                loading: true,
            }


        case ALL_USERS_SUCCESS:

        case ALL_FREELANCERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            }


        case ALL_USERS_FAIL:

        case ALL_FREELANCERS_FAIL:
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
export const UpDelUserReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
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

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload

            }
        case USER_DETAILS_FAIL:
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