import React, { Fragment, useState, useEffect } from 'react'
import {
    Link
} from 'react-router-dom'
import {
    useSelector
    // , useDispatch 
} from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import MyChats from './MyChats'
import ChatBox from './ChatBox'
import { useDispatch } from 'react-redux'
import { getOffers } from '../../actions/offerActions'


const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const [fetchOffersAgain, setFetchOffersAgain] = useState(false);
    // const { user, loading } = useSelector(state => state.auth)
    const { offers,loading } = useSelector(state => state.offers)
    const dispatch = useDispatch();
    const fetchChats = async () => {
        // console.log(user._id);

    }
    useEffect(() => {
        dispatch(getOffers())
    }, [fetchOffersAgain]);
    return (


        <div style={{ display: 'flex' }}>
            <MetaData title={'Messages'} />

    <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} offers={offers} loading={loading} />

            




            <MyChats fetchAgain={fetchAgain} />

        </div>
    )
}

export default ChatPage
