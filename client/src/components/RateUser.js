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
                    <div>
                        <form>
                            <div>
                                <input type="textarea" className={Css.textArea}/>
                            </div>
                            <input type="radio" name="rating" id="star1" value="1"/><label name="rating" for="star1"/>
                            <input type="radio" name="rating" id="star2" value="2"/><label name="rating" for="star2"/>
                            <input type="radio" name="rating" id="star3" value="3"/><label name="rating" for="star3"/>
                            <input type="radio" name="rating" id="star4" value="4"/><label name="rating" for="star4"/>
                            <input type="radio" name="rating" id="star5" value="5"/><label name="rating" for="star5"/>
                            <div>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateUser