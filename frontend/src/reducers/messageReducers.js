import {

    NEW_MESSAGE_REQUEST,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_RESET,
    NEW_MESSAGE_FAIL,


    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,

    // SINGLE_CATEGORY_REQUEST,
    // SINGLE_CATEGORY_SUCCESS,
    // SINGLE_CATEGORY_FAIL,


    CLEAR_ERRORS
} from '../constants/messageConstants'


export const newMessageReducer = (state = { message: {} }, action) => {
    switch (action.type) {

        case NEW_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_MESSAGE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }

        case NEW_MESSAGE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_MESSAGE_RESET:
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


export const messagesReducer = (state = { messages: [] }, action) => {
    switch (action.type) {


        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.payload.messages,
            }

        case GET_MESSAGES_FAIL:
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

// export const categoryDetailsReducer = (state = { category: {} }, action) => {
//     switch (action.type) {

//         case SINGLE_CATEGORY_REQUEST:
//             return {
//                 ...state,
//                 loadings: true
//             }

//         case SINGLE_CATEGORY_SUCCESS:
//             return {
//                 ...state,
//                 loadings: false,
//                 category: action.payload.category,
//             }

//         case SINGLE_CATEGORY_FAIL:
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }
//         default:
//             return state
//     }
// }

