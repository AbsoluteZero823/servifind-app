import React from 'react'
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';
import {
    useSelector
    , useDispatch
} from 'react-redux'
const ScrollableChat = ({ messages }) => {
    const { user } = useSelector(state => state.auth)

    const updateIsAtBottomState = (result) => {
        this.setState({
            isAtBottom: result
        });
    }


    return (
        <ScrollableFeed
        // ref={React.createRef()}
        // forceScroll
        // onScroll={isAtBottom => isAtBottom(true)}
        >
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {
                            (isSameSender(messages, m, i, user._id)
                                || isLastMessage(messages, i, user._id)
                            ) && (

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}><img className='small-circle' id='tooltiptext' src={m.sender.avatar.url} data-toggle="tooltip" data-placement="bottom" title={m.sender.name} />
                                    {/* <p>dadawaw</p> */}
                                </div>

                            )
                        }


                        <span style={{
                            backgroundColor: `${m.sender._id === user._id ? "#38B2AC" : "rgb(215 215 215)"}`,
                            color: `${m.sender._id === user._id ? "white" : "black"}`,
                            borderRadius: '20px',
                            padding: '5px 15px',
                            maxWidth: '75%',
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                        }}>
                            {m.content}
                        </span>
                    </div>
                ))
            }

        </ScrollableFeed>

    )
}

export default ScrollableChat