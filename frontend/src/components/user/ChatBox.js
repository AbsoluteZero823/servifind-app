import React, { Fragment } from 'react'
import {
    useSelector
    // , useDispatch 
} from 'react-redux'
import SingleChat from './SingleChat'
import { ChatState } from '../../Context/ChatProvider'
import Loader from '../layout/Loader'

const ChatBox = ({ fetchAgain, setFetchAgain, offers, loading, setFetchOffersAgain, fetchOffersAgain }) => {
    // const { user, loading } = useSelector(state => state.auth)
    const { selectedChat } = ChatState();
    return (
        <div className="chat">
            {/* {selectedChat ? ( */}
            <Fragment>
                {loading ? <Loader /> : (
                    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} offers={offers} setFetchOffersAgain={setFetchOffersAgain} fetchOffersAgain={fetchOffersAgain} />
                )}
            </Fragment>


            {/* ) :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: 'xx-large' }}>Click on a user to start chatting</div>
            } */}



            {/* <!-- end chat-message --> */}

        </div>
    )
}

export default ChatBox