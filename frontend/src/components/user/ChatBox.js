import React from 'react'
import {
    useSelector
    // , useDispatch 
} from 'react-redux'
import SingleChat from './SingleChat'
import { ChatState } from '../../Context/ChatProvider'

const ChatBox = ({ fetchAgain, setFetchAgain, offers }) => {
    const { user, loading } = useSelector(state => state.auth)
    const { selectedChat } = ChatState();
    return (
        <div className="chat">
            {selectedChat ? (
                <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} offers={offers} />

            ) :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: 'xx-large' }}>Click on a user to start chatting</div>
            }



            {/* <!-- end chat-message --> */}

        </div>
    )
}

export default ChatBox