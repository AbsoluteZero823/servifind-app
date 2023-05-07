import axios from 'axios';

import {

    NEW_CHAT_REQUEST,
    NEW_CHAT_SUCCESS,
    NEW_CHAT_FAIL,

    // SINGLE_CATEGORY_REQUEST,
    // SINGLE_CATEGORY_SUCCESS,
    // SINGLE_CATEGORY_FAIL,


    GET_CHATS_REQUEST,
    GET_CHATS_SUCCESS,
    GET_CHATS_FAIL,

    CLEAR_ERRORS
} from '../constants/chatConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const accessChat = (chatData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_CHAT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/chat', chatData, config)

        dispatch({
            type: NEW_CHAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_CHAT_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getChats = () => async (dispatch) => {
    try {

        dispatch({ type: GET_CHATS_REQUEST })

        const { data } = await axios.get(`/api/v1/chat`)

        dispatch({
            type: GET_CHATS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_CHATS_FAIL,
            payload: error.response.data.message
        })
    }
}


// export const SingleCategory = (id) => async (dispatch) => {
//     try {


//         dispatch({ type: SINGLE_CATEGORY_REQUEST })
//         const { data } = await axios.get(`/api/v1/category/${id}`)
//         dispatch({
//             type: SINGLE_CATEGORY_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: SINGLE_CATEGORY_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

