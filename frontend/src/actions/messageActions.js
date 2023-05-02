import axios from 'axios';

import {

    NEW_MESSAGE_REQUEST,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_FAIL,

    // SINGLE_CATEGORY_REQUEST,
    // SINGLE_CATEGORY_SUCCESS,
    // SINGLE_CATEGORY_FAIL,


    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,

    CLEAR_ERRORS
} from '../constants/messageConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const addMessage = (messageData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_MESSAGE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/message/new', messageData, config)

        dispatch({
            type: NEW_MESSAGE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_MESSAGE_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getMessages = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_MESSAGES_REQUEST })

        const { data } = await axios.get(`/api/v1/messages/${id}`)

        dispatch({
            type: GET_MESSAGES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_MESSAGES_FAIL,
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

