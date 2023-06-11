import React, {useEffect, useState} from 'react'
import { Link, useParams , useNavigate} from 'react-router-dom';
import TopNavigation from './TopNavigation'
import Css from '../components/NewMessage.module.css'
import axios from 'axios';
import SideBar from './SideBar';
import avatar from '../assets/avatar.png';
import messageIcon from '../assets/message.png';

const NewMessage = (props) => {
    const {myItems, inbox, user, cart} = props;
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState({});
    const [errors ,setErrors] = useState([])
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                axios.get('http://localhost:8000/api/users/' + id)
                .then(response => {
                    setReceiver(response.data)
                })
                .catch(err => console.log(err))
            } catch (err) {
                console.log(err)
            }
        };
        fetchUser();
    }, []);

    const newMessageHandler = (e) => {
        e.preventDefault();
        if (message.length <= 0) {
            setErrors("Please type a message")
        } else {
            axios.post('http://localhost:8000/api/inbox/new/' + id, {
                message: message,
                user: user
            }) .then(response => {
                console.log(response.data)
                navigate('/')
            }) .catch(err => {
                console.log(err.response.data.errors);
            })
        }
    }


    return (
        <div>
            <div>
                <TopNavigation inbox={inbox} user={user} cart={cart}/>
            </div>
            <div className={Css.body}>
                <div className={Css.SideBar}>
                    <SideBar myItems={myItems}/>
                </div>
            
            <div className={Css.rightBody}>
                <h1>Message {receiver.firstName}</h1>
                { receiver.myFile ?
                    <Link to={`/users/${receiver._id}`}><img className={Css.profilePic} src={receiver.myFile} alt="avatar"/></Link>
                    : <Link to={`/users/${receiver._id}`}><img className={Css.profilePic} src={avatar} alt="no-avatar"/></Link>
                }
                <form onSubmit={newMessageHandler} method="POST">
                    {errors? <p>{errors}</p> : null}
                    <textarea placeholder='Type something...' className={Css.messageBox} rows="10" type="text" name="description" onChange={(e) => setMessage(e.target.value)}/>
                    <div>
                        <button className={Css.sendButton}><img className={Css.sendMessage} src={messageIcon} alt='send'/></button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default NewMessage