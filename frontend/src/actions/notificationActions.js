import axios from 'axios';

import {

    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
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

    READ_ALLMYNOTIFICATION_REQUEST,
    READ_ALLMYNOTIFICATION_SUCCESS,
    READ_ALLMYNOTIFICATION_FAIL,

    CLEAR_ERRORS
} from '../constants/notificationConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newNotification = (formData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_NOTIFICATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/notification/new', formData, config)

        dispatch({
            type: NEW_NOTIFICATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getNotifications = () => async (dispatch) => {
    try {

        dispatch({ type: GET_NOTIFICATIONS_REQUEST })

        const { data } = await axios.get(`/api/v1/notifications`)

        dispatch({
            type: GET_NOTIFICATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_NOTIFICATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyUnreadNotifications = () => async (dispatch) => {
    try {

        dispatch({ type: GET_MYNOTIFICATIONS_REQUEST })

        const { data } = await axios.get(`/api/v1/my-notifications`)

        dispatch({
            type: GET_MYNOTIFICATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_MYNOTIFICATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const readMyNotification = (id) => async (dispatch) => {
    try {

        dispatch({ type: READ_MYNOTIFICATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/read-notification/${id}`, config)

        dispatch({
            type: READ_MYNOTIFICATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: READ_MYNOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}

export const ReadAllMyNotif = () => async (dispatch) => {
    try {

        dispatch({ type: READ_ALLMYNOTIFICATION_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/read-all-notification`, config)

        dispatch({
            type: READ_ALLMYNOTIFICATION_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: READ_ALLMYNOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}