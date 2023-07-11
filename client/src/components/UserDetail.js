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
import fivestars from '../assets/5stars.png';
import fourstars from '../assets/4stars.png';
import threestars from '../assets/3stars.png';
import twostars from '../assets/2stars.png';
import onestar from '../assets/1star.png';

const UserDetail = (props) => {
    const {myItems, inbox, user1, cart} = props;
    const [user, setUser] = useState({});
    const [average, setAverage] = useState(0);
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
        axios.get('http://localhost:8000/api/users/average/' + id)
            .then(response => {
                setAverage(response.data)
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
                    <div>
                        { average == 5 ? <img src={fivestars} className={Css.stars}/> : null }
                        { average == 4 ? <img src={fourstars} className={Css.stars}/> : null }
                        { average == 3 ? <img src={threestars} className={Css.stars}/> : null }
                        { average == 2 ? <img src={twostars} className={Css.stars}/> : null }
                        { average == 1 ? <img src={onestar} className={Css.stars}/> : null }
                    </div>

                    <div>
                        {
                            user.raters.length != 0 ? <h5><u><a href={`/users/reviews/${user._id}`}>{user.raters?.length} review(s)</a></u></h5>
                            : <h5>No reviews yet...</h5>
                        }
                    </div>

                    <div>
                        <Link to={`/users/rate/${user._id}`}><button className={Css.updateButton}><h4>Rate this user</h4></button></Link>
                    </div>
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