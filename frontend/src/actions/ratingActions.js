import axios from 'axios';

import {

    NEW_RATING_REQUEST,
    NEW_RATING_SUCCESS,
    NEW_RATING_FAIL,

    SINGLE_RATING_REQUEST,
    SINGLE_RATING_SUCCESS,
    SINGLE_RATING_FAIL,


    GET_RATINGS_REQUEST,
    GET_RATINGS_SUCCESS,
    GET_RATINGS_FAIL,

    CLEAR_ERRORS
} from '../constants/ratingConstants';



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}





export const newRating = (ratingData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_RATING_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/rating/new', ratingData, config)

        dispatch({
            type: NEW_RATING_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_RATING_FAIL,
            payload: error.response.data.message
        })
    }
}



export const getRatings = () => async (dispatch) => {
    try {

        dispatch({ type: GET_RATINGS_REQUEST })

        const { data } = await axios.get(`/api/v1/ratings`)

        dispatch({
            type: GET_RATINGS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_RATINGS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const SingleRating = (id) => async (dispatch) => {
    try {


        dispatch({ type: SINGLE_RATING_REQUEST })
        const { data } = await axios.get(`/api/v1/rating/${id}`)
        dispatch({
            type: SINGLE_RATING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_RATING_FAIL,
            payload: error.response.data.message
        })
    }
}

