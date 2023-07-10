import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import TopNavigation from './TopNavigation';
import SideBar from './SideBar';
import Css from '../components/RateUser.module.css';
import avatar from '../assets/avatar.png';

const RateUser = (props) => {
    const {myItems, inbox, user1, cart} = props;
    const [user, setUser] = useState({});
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
                </div>
            </div>
        </div>
    )
}

export default RateUser