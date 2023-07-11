import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/UserReviews.module.css'
import TopNavigation from './TopNavigation';
import SideBar from './SideBar';
import fivestars from '../assets/5stars.png';
import fourstars from '../assets/4stars.png';
import threestars from '../assets/3stars.png';
import twostars from '../assets/2stars.png';
import onestar from '../assets/1star.png';
import avatar from '../assets/avatar.png';

const UserReviews = (props) => {
    const {myItems, inbox, user1, cart} = props;
    const [user, setUser] = useState({});
    const {id} = useParams();
    const [average, setAverage] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/ratings/' + id)
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
                        { average === 5 ? <img src={fivestars} className={Css.stars}/> : null }
                        { average === 4 ? <img src={fourstars} className={Css.stars}/> : null }
                        { average === 3 ? <img src={threestars} className={Css.stars}/> : null }
                        { average === 2 ? <img src={twostars} className={Css.stars}/> : null }
                        { average === 1 ? <img src={onestar} className={Css.stars}/> : null }
                    </div>

                    { user.raters?.length != 0 ?
                        <div>
                            { user.raters?.map((rater, index) => {
                                return (
                                    <div className={Css.oneRating} key={index}>
                                        <div className={Css.nameAndLogo}>
                                            <h4><Link to={`/users/${rater.rater._id}`}>{rater.rater.firstName} {rater.rater.lastName}</Link></h4>
                                            <div>
                                                { rater.rater.myFile ?
                                                <Link to={`/users/${rater.rater._id}`}><img className={Css.profilePicSm} src={rater.rater.myFile} alt="avatar"/></Link>
                                                : <Link to={`/users/${rater.rater._id}`}><img className={Css.profilePicSm} src={avatar} alt="no-avatar"/></Link>
                                                }
                                            </div>
                                        </div>
                                        <div className={Css.starsAndComment}>
                                            <div>
                                                { rater.rating === 5 ? <img src={fivestars} className={Css.starsSm}/> : null }
                                                { rater.rating === 4 ? <img src={fourstars} className={Css.starsSm}/> : null }
                                                { rater.rating === 3 ? <img src={threestars} className={Css.starsSm}/> : null }
                                                { rater.rating === 2 ? <img src={twostars} className={Css.starsSm}/> : null }
                                                { rater.rating === 1 ? <img src={onestar} className={Css.starsSm}/> : null }
                                            </div>
                                            <h5>{rater.comment}</h5>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    : <h4>No reviews yet...</h4>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserReviews