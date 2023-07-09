import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
// import { animalsReducer, animalDetailsReducer, newAnimalReducer, UpDelAnimalReducer, allAnimalsReducer, singleAnimalReducer, adoptReducer, getAdoptReducer } from './reducers/animalReducers'
import { authReducer, getUsersReducer, userReducer, UpDelUserReducer, newUserReducer, userDetailsReducer } from './reducers/userReducers'
import { servicesReducer, freelancerServicesReducer, serviceDetailsReducer, newServiceReducer, UpDelServiceReducer } from './reducers/serviceReducers'
import { newInquiryReducer, inquiriesReducer, inquiryDetailsReducer, statusReducer } from './reducers/inquiryReducers';
import { getTransactionsReducer, newTransactionReducer, transactionDetailsReducer, paymentReducer, transactionDoneReducer, paymentReceivedReducer, reportDoneReducer, rateDoneReducer, updateTransactionReducer, getTransactionCoursesReducer, getServiceCoursesReducer, getTransactionMonthReducer, getServiceLeaderboardsReducer, getDashboardInfoReducer } from './reducers/transactionReducers';
import { freelancerDetailsReducer, newFreelancerReducer, freelancersReducer, applicationFreelancerReducer, updateFreelancerReducer } from './reducers/freelancerReducers';
import { getRequestsReducer, newRequestReducer, requestDetailsReducer } from './reducers/requestReducers';
import { getCategoriesReducer } from './reducers/categoryReducers';
import { getOffersReducer, newOfferReducer, offerDetailsReducer, getRequestOffersReducer, updateReducer } from './reducers/offerReducers';
import { chatsReducer, newChatReducer } from './reducers/chatReducers';
import { messagesReducer, newMessageReducer } from './reducers/messageReducers';
import { getReportsReducer, getUserReportsReducer } from './reducers/reportReducers';
import { getNotificationsReducer, newNotificationReducer, notificationReducer } from './reducers/notificationReducers';

// import { getTransactions } from '../../backend/controllers/transactionController';
const reducer = combineReducers({

    addUser: newUserReducer,

    freelancerServices: freelancerServicesReducer,
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
    transactionDone: transactionDoneReducer,
    paymentReceived: paymentReceivedReducer,
    reportDone: reportDoneReducer,
    rateDone: rateDoneReducer,

    updatetransaction: updateTransactionReducer,
    sectionArray: getTransactionCoursesReducer,
    completionDateTo: getTransactionMonthReducer,
    topServicesArray: getServiceCoursesReducer,
    serviLeaderboards: getServiceLeaderboardsReducer,
    dashboardInfo: getDashboardInfoReducer,

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
    newChat: newChatReducer,

    messages: messagesReducer,
    addMessage: newMessageReducer,

    reports: getReportsReducer,
    userreports: getUserReportsReducer,

    notifications: getNotificationsReducer,
    addNotification: newNotificationReducer,
    readNotification: notificationReducer,

})
let initialState = {
}
const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;

// pinalitan ko ung createStore ng configureStore