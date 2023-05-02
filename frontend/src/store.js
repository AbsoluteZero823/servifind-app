import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
// import { animalsReducer, animalDetailsReducer, newAnimalReducer, UpDelAnimalReducer, allAnimalsReducer, singleAnimalReducer, adoptReducer, getAdoptReducer } from './reducers/animalReducers'
import { authReducer, getUsersReducer, userReducer, UpDelUserReducer, newUserReducer, userDetailsReducer } from './reducers/userReducers'
import { servicesReducer, serviceDetailsReducer, newServiceReducer, UpDelServiceReducer } from './reducers/serviceReducers'
import { newInquiryReducer, inquiriesReducer, inquiryDetailsReducer, statusReducer } from './reducers/inquiryReducers';
import { getTransactionsReducer, newTransactionReducer, transactionDetailsReducer, paymentReducer, updateTransactionReducer } from './reducers/transactionReducers';
import { freelancerDetailsReducer, newFreelancerReducer, freelancersReducer, applicationFreelancerReducer, updateFreelancerReducer } from './reducers/freelancerReducers';
import { getRequestsReducer, newRequestReducer, requestDetailsReducer } from './reducers/requestReducers';
import { getCategoriesReducer } from './reducers/categoryReducers';
import { getOffersReducer, newOfferReducer, offerDetailsReducer, getRequestOffersReducer, updateReducer } from './reducers/offerReducers';
import { chatsReducer } from './reducers/chatReducers';
import { messagesReducer, newMessageReducer } from './reducers/messageReducers';

// import { getTransactions } from '../../backend/controllers/transactionController';
const reducer = combineReducers({

    addUser: newUserReducer,


    services: servicesReducer,
    serviceDetails: serviceDetailsReducer,
    userDetails: userDetailsReducer,
    addService: newServiceReducer,
    updelService: UpDelServiceReducer,
    auth: authReducer,
    user: userReducer,
    users: getUsersReducer,
    updelUser: UpDelUserReducer,

    inquiry: newInquiryReducer,
    inquiries: inquiriesReducer,
    singleInquiry: inquiryDetailsReducer,
    updateStatus: statusReducer,

    transaction: newTransactionReducer,
    transactions: getTransactionsReducer,
    transactionDetails: transactionDetailsReducer,
    updatePayment: paymentReducer,
    updateTransaction: updateTransactionReducer,

    freelancerDetails: freelancerDetailsReducer,
    addFreelancer: newFreelancerReducer,
    freelancers: freelancersReducer,
    applying: applicationFreelancerReducer,
    updateFreelancer: updateFreelancerReducer,

    requests: getRequestsReducer,
    addRequest: newRequestReducer,

    categories: getCategoriesReducer,

    offers: getOffersReducer,
    updateoffer: updateReducer,
    addOffer: newOfferReducer,
    singleOffer: offerDetailsReducer,


    requestoffers: getRequestOffersReducer,
    requestDetails: requestDetailsReducer,

    chats: chatsReducer,

    messages: messagesReducer,
    addMessage: newMessageReducer,

})
let initialState = {
}
const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;

// pinalitan ko ung createStore ng configureStore