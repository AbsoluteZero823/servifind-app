import {

    NEW_RATING_REQUEST,
    NEW_RATING_SUCCESS,
    NEW_RATING_RESET,
    NEW_RATING_FAIL,


    GET_RATINGS_REQUEST,
    GET_RATINGS_SUCCESS,
    GET_RATINGS_FAIL,

    SINGLE_RATING_REQUEST,
    SINGLE_RATING_SUCCESS,
    SINGLE_RATING_FAIL,


    CLEAR_ERRORS
} from '../constants/ratingConstants'


export const newRatingReducer = (state = { rating: {} }, action) => {
    switch (action.type) {

        case NEW_RATING_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_RATING_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                rating: action.payload.rating
            }

        case NEW_RATING_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_RATING_RESET:
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


export const getRatingsReducer = (state = { ratings: [] }, action) => {
    switch (action.type) {


        case GET_RATINGS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_RATINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: action.payload.ratings,
            }

        case GET_RATINGS_FAIL:
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

export const ratingDetailsReducer = (state = { rating: {} }, action) => {
    switch (action.type) {

        case SINGLE_RATING_REQUEST:
            return {
                ...state,
                loadings: true
            }

        case SINGLE_RATING_SUCCESS:
            return {
                ...state,
                loadings: false,
                rating: action.payload.rating,
            }

        case SINGLE_RATING_FAIL:
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

