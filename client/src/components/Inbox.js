import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import TopNavigation from './TopNavigation';
import avatar from '../assets/avatar.png';
import Css from '../components/Inbox.module.css'
import SideBar from './SideBar';
import trashIcon from '../assets/trash.png';

const Inbox = (props) => {
    const {myItems, user, cart} = props;
    const userId = localStorage.getItem('userId')
    const {id} = useParams();
    const [inbox, setInbox] = useState([])
    const {messageThreads} = inbox || {};

    useEffect(() => {
        axios.get('http://localhost:8000/api/inbox/' + id)
            .then(response => {
                setInbox(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/inbox/reset/' + id)
            .then(response => {
                console.log(response.data);
                
            })
            .catch(err => console.log(err))
    }, [])

    const deleteThread = async (userId, threadId) => {
        axios.delete(`http://localhost:8000/api/inbox/delete/${userId}/${threadId}`)
            .then(response => {
                console.log(response.data)
                removeFromDom(threadId)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const removeFromDom = async (threadId) => {
        setInbox(inbox.messageThreads.filter(thread => thread._id !== threadId))
    }


    return (
        <div className={Css.container}>
            <TopNavigation inbox={inbox} user={user} cart={cart}/>
            <div className={Css.body}>
                <div className={Css.SideBar}>
                    <SideBar myItems={myItems}/>
                </div>
                <div className={Css.rightBody}>
                        <h1>Inbox</h1>
                        { messageThreads
                            ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                            .map((thread, index) => {
                            return (
                                <div>
                                    <div className={Css.oneCorr}>
                                        <div className={Css.logoAndName}>
                                            <div className={Css.logo}>
                                                <div key={index}>
                                                    { thread.correspondence.myFile ?
                                                        <img className={Css.profilePic} src={thread.correspondence.myFile} alt="avatar"/>
                                                        : <img className={Css.profilePic} src={avatar} alt="no-avatar"/>
                                                    }
                                                <div className={Css.name}>
                                                    <h4>{thread.correspondence.firstName} {thread.correspondence.lastName}</h4>
                                                </div>
                                            </div> 
                                        </div>
                                        <div className={Css.messagePreview}>
                                            {thread.messages && thread.messages.length > 0 ? 
                                                thread.messages[thread.messages.length - 1].message.unread === "true"
                                                    ? (<div className={Css.messageTotal}>
                                                            <div className={Css.message}>
                                                                <p className={Css.preview}><b><Link to={`/inbox/correspondence/${thread.correspondence._id}/${userId}`}>{thread.messages[thread.messages.length - 1].message.message}</Link></b></p>
                                                            </div>
                                                            <div className={Css.trash}>
                                                                <button className={Css.trashButton} onClick={() => {deleteThread(userId, thread._id)}}><img className={Css.trashIcon} src={trashIcon} alt='delete-thread'/></button>
                                                            </div>
                                                        </div>)
                                                    : (<div className={Css.messageTotal}>
                                                            <div className={Css.message}>
                                                                <p className={Css.preview}><Link to={`/inbox/correspondence/${thread.correspondence._id}/${userId}`}>{thread.messages[thread.messages.length - 1].message.message}</Link></p>
                                                            </div>
                                                            <div className={Css.trash}>
                                                                <button className={Css.trashButton} onClick={() => {deleteThread(userId, thread._id)}}><img className={Css.trashIcon} src={trashIcon} alt='delete-thread'/></button>
                                                            </div>
                                                        </div>)
                                                    
                                                : ""
                                                }
                                        </div>
                                    </div>
                                </div>
                </div>
                                
                            )
                        })
                        }
            </div>

        </div>
        </div>
    )
}

export default Inbox