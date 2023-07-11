import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/UserReviews.module.css'

const UserReviews = (props) => {

    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/ratings/' + id)
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <div>
            { user.raters?.length != 0 ?
                <div>
                    { user.raters?.map((rater, index) => {
                        return (
                            <div key={index}>
                                <h4>{rater.rater.firstName} {rater.rater.lastName}</h4>
                                <h4>{rater.rating}</h4>
                                <h4>{rater.comment}</h4>
                            </div>
                        )
                    })
                    }
                </div>
            : <h4>No reviews yet...</h4>
            }
        </div>
    )
}

export default UserReviews