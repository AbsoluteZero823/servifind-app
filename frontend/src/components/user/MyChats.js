import React, { Fragment, useState, useEffect } from 'react'
import {
    useSelector
    , useDispatch
} from 'react-redux'

import { getChats } from '../../actions/chatActions'
import Loader from '../layout/Loader'
import { ChatState } from '../../Context/ChatProvider'

const MyChats = ({ fetchAgain }) => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { chats, loading } = useSelector(state => state.chats)
    const { selectedChat, setSelectedChat } = ChatState();

    // const [selectedChat, setSelectedChat] = useState()
    useEffect(() => {


        dispatch(getChats());


    }, [dispatch, alert, fetchAgain])
    return (
        <div className="container clearfix" style={{ backgroundColor: '#444753', width: '25.3vw', paddingLeft: '0px' }}>
            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search" />
                    {/* <i className="fa fa-search"></i> */}
                </div>
                <ul className="list">
                    {chats ? (<Fragment>
                        {chats && chats.map((chat) => (
                            <Fragment>
                                {chat.users[0]._id === user._id && (
                                    <a
                                        onClick={() => [setSelectedChat(chat), console.log(chat)]}

                                        className={selectedChat === chat ? `chatclicked` : "chatnotclicked"}
                                        px={3}
                                        py={2}


                                    >
                                        <li className="clearfix"

                                            key={chat._id}
                                        >
                                            <figure className='avatar' style={{ float: 'left', outline: 'solid rgb(96, 96,96)' }}>
                                                <img
                                                    src={chat.users[1].avatar.url}
                                                    className='rounded-circle'
                                                    alt="avatar" /></figure>
                                            <div className="about">
                                                {chat.inquiry_id && chat.inquiry_id.customer === user._id ? (
                                                    <div className="name">Freelancer: {chat.users[1].name} - {chat.chatName}</div>
                                                ) : (
                                                    <div className="name">Client: {chat.users[1].name} - {chat.chatName}</div>
                                                )}

                                                {chat.latestMessage && chat.latestMessage.sender._id === user._id ? (
                                                    <div className="status">
                                                        {/* <i className="fa fa-circle online"></i>  */}
                                                        You :{chat.latestMessage.content}
                                                    </div>
                                                ) : (<div className="status">
                                                    {/* <i className="fa fa-circle online"></i>  */}

                                                    {chat && chat.latestMessage && (
                                                        <div> {chat.latestMessage.sender.name}:{chat.latestMessage.content}</div>
                                                    )}
                                                </div>)}

                                                {/* {chat.latestMessage.sender.name}:{chat.latestMessage.content} */}
                                            </div>
                                        </li>
                                    </a>
                                )}
                                {chat.users[1]._id === user._id && (
                                    <a
                                        onClick={() => setSelectedChat(chat)}
                                        className={selectedChat === chat ? `chatclicked` : "chatnotclicked"}

                                        px={3}
                                        py={2}


                                    >
                                        <li className="clearfix"
                                            key={chat._id}
                                        >
                                            <figure className='avatar' style={{ float: 'left', outline: 'solid rgb(96, 96,96)' }}>
                                                <img
                                                    src={chat.users[0].avatar.url}
                                                    alt="avatar"
                                                    className='rounded-circle'
                                                />
                                            </figure>


                                            <div className="about">
                                                {chat.inquiry_id && chat.inquiry_id.customer === user._id ? (
                                                    <div className="name">Freelancer: {chat.users[0].name} - {chat.chatName}</div>
                                                ) : (
                                                    <div className="name">Client: {chat.users[0].name} - {chat.chatName}</div>
                                                )}

                                                {chat.latestMessage && (
                                                    <Fragment>
                                                        {chat.latestMessage && chat.latestMessage.sender._id === user._id ? (
                                                            <div className="status">
                                                                {/* <i className="fa fa-circle online"></i>  */}
                                                                You : {chat.latestMessage.content}
                                                            </div>
                                                        ) : (<div className="status">
                                                            {/* <i className="fa fa-circle online"></i>  */}
                                                            {chat.latestMessage.sender.name} : {chat.latestMessage.content}
                                                        </div>)}
                                                    </Fragment>
                                                )}
                                            </div>
                                        </li>
                                    </a>
                                )}
                            </Fragment>

                        )

                        )}


                        {chats.length === 0 && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <h5>No Existing Chats Yet</h5>
                            </div>


                        )}

                    </Fragment>) : (<Loader />)
                    }
                    {/* // {loading ? <Loader /> : (
                        
                    // )


                    // } */}




                </ul>

            </div></div>
    )
}

export default MyChats