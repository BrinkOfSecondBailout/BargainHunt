import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/UserReviews.module.css'

const UserReviews = (props) => {
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
            {/* { user.raters?.length.map((rater, index) => {
                return (
                    <div key={index}>
                        <h4>{rater.user.firstName}</h4>
                        <h4>{rater.rating}</h4>
                        <h4>{rater.comment}</h4>
                    </div>
                )
            })
            } */}
        </div>
    )
}

export default UserReviews