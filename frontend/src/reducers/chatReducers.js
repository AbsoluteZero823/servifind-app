import {

    // NEW_CATEGORY_REQUEST,
    // NEW_CATEGORY_SUCCESS,
    // NEW_CATEGORY_RESET,
    // NEW_CATEGORY_FAIL,


    GET_CHATS_REQUEST,
    GET_CHATS_SUCCESS,
    GET_CHATS_FAIL,

    // SINGLE_CATEGORY_REQUEST,
    // SINGLE_CATEGORY_SUCCESS,
    // SINGLE_CATEGORY_FAIL,


    CLEAR_ERRORS
} from '../constants/chatConstants'


// export const newCategoryReducer = (state = { category: {} }, action) => {
//     switch (action.type) {

//         case NEW_CATEGORY_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case NEW_CATEGORY_SUCCESS:
//             return {
//                 loading: false,
//                 success: action.payload.success,
//                 category: action.payload.category
//             }

//         case NEW_CATEGORY_FAIL:
//             return {
//                 ...state,
//                 error: action.payload
//             }

//         case NEW_CATEGORY_RESET:
//             return {
//                 ...state,
//                 success: false
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


export const chatsReducer = (state = { chats: [] }, action) => {
    switch (action.type) {


        case GET_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload.chats,
            }

        case GET_CHATS_FAIL:
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

