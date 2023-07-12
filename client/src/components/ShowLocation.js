import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import avatar from '../assets/avatar.png';
import axios from 'axios';
import Css from '../components/ShowLocation.module.css'
import SideBar from './SideBar';
import TopNavigation from './TopNavigation';
import ping from '../assets/ping.png';
import Map from './Map';

const ShowLocation = (props) => {
    const {myItems, inbox, user1, cart} = props;
    const [user, setUser] = useState({});
    const [coordinates, setCoordinates] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data)
                setCoordinates(response.data.coordinates)
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
                        <Link to={`/users/${user._id}`}><img className={Css.profilePic} src={user.myFile} alt="avatar"/></Link>
                        : <Link to={`/users/${user._id}`}><img className={Css.profilePic} src={avatar} alt="no-avatar"/></Link>
                    }

                    <div>
                        {
                            user.location?
                            <Link to={`/users/map/${user._id}`}><img src={ping} className={Css.pingIcon}/><h5 className={Css.locationFont}>{user.location}</h5></Link>
                            : <div><img src={ping} className={Css.pingIcon}/><h4 className={Css.locationFont}>None set yet..</h4></div>
                        }
                    </div>

                    <Map coordinates={coordinates}/>

                </div>
            </div>
        </div>
    )
}

export default ShowLocation