import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import TopNavigation from './TopNavigation';
import SideBar from './SideBar';
import Css from '../components/RateUser.module.css';
import avatar from '../assets/avatar.png';

const RateUser = (props) => {
    const {myItems, inbox, user1, cart} = props;
    const [user, setUser] = useState({});
    const {id} = useParams();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const [rated, setRated] = useState(false);

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
        axios.get('http://localhost:8000/api/users/rating/check/' + id + '/' + user1._id)
            .then(response => {
                if(response.data == true) {
                    setRated(true)
                    console.log(response.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [user1])

    const newRatingHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/rating/' + id, {
            rater: user1,
            rating: rating,
            comment: comment
        }). then(response => {
            console.log(response.data)
            navigate('/users/' + id)
        }). catch(err => {
            console.log(err.response.data.errors)
        })
    }

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
                        <form onSubmit={newRatingHandler} method="POST" className={Css.ratingForm}>
                            <div className={Css.red}>
                                <h4>How was your experience with {user.firstName}?</h4>
                            </div>
                            <div>
                                {
                                    rated ?
                                        <h4 className={Css.smallFont}>Note: You have already rated {user.firstName} before, so this new review will replace the previous one</h4>
                                    : null
                                }
                            </div>
                            <div className={Css.padding}>
                                <textarea rows="6" className={Css.textArea} onChange={(e) => setComment(e.target.value)}/>
                            </div>
                            <div className={Css.ratings}>
                                <input type="radio" name="rating" id="star5" value="5" onClick={(e) => setRating(e.target.value)}/><label name="rating" for="star5"/>
                                <input type="radio" name="rating" id="star4" value="4" onClick={(e) => setRating(e.target.value)}/><label name="rating" for="star4"/>
                                <input type="radio" name="rating" id="star3" value="3" onClick={(e) => setRating(e.target.value)}/><label name="rating" for="star3"/>
                                <input type="radio" name="rating" id="star2" value="2" onClick={(e) => setRating(e.target.value)}/><label name="rating" for="star2"/>
                                <input type="radio" name="rating" id="star1" value="1" onClick={(e) => setRating(e.target.value)}/><label name="rating" for="star1"/>
                            </div>
                            <div className={Css.submitButton}>
                                <button className={Css.updateButton}><h4>Submit</h4></button>
                            </div>
                        </form>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default RateUser