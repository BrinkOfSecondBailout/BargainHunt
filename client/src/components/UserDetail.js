import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/UserDetail.module.css'
import TopNavigation from './TopNavigation';
import avatar from '../assets/avatar.png';
import noImg from '../assets/noimage.jpg';
import message from '../assets/message.png';
import SideBar from './SideBar';
import ping from '../assets/ping.png';

const UserDetail = (props) => {
    const {myItems, inbox, user1, cart} = props;
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/show/' + id)
            .then(response => {
                setItems(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <div>
            <div>
                <TopNavigation inbox={inbox} user={user1} cart={cart}/>
            </div>
            <div className={Css.body}>
                <div className={Css.SideBar}>
                    <SideBar myItems={myItems}/>
                </div>
            
                <div className={Css.rightBody}>
                    <h1>{user.firstName} {user.lastName}</h1>
                    { user.myFile ?
                        <img className={Css.profilePic} src={user.myFile} alt="avatar"/>
                        : <img className={Css.profilePic} src={avatar} alt="no-avatar"/>
                    }
                    <div className={Css.messageTotal}>
                        <Link to={`/message/${user._id}`}><img className={Css.sendMessage} src={message} alt="send-message"/></Link>
                    </div>

                    {
                        user.location?
                        <Link><img src={ping} className={Css.pingIcon}/><h5 className={Css.locationFont}>{user.location}</h5></Link>
                        : <div><img src={ping} className={Css.pingIcon}/><h4 className={Css.locationFont}>None set yet..</h4></div>
                    }

                    <h2>Listed Items</h2>
                    <div className={Css.flex}>
                        { items.map((item, index) => {
                            return (
                                <div key={index}>
                                        
                                        <h4><Link to={`/items/${item._id}`}>{item.name}</Link></h4>
                                        <h4>${item.price}</h4>
                                        
                                        { item.myFile1 ?
                                            <Link to={`/items/${item._id}`}><img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/></Link>
                                        : <Link to={`/items/${item._id}`}><img className={Css.itemMainPic} src={noImg} alt="no-img"/></Link>
                                        }
                                </div>
                            )
                        })
                        }
                    </div>
            </div>
            </div>
        </div>
    )
}

export default UserDetail