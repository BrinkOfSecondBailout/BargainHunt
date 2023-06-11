import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Css from '../components/AllSellers.module.css'
import avatar from '../assets/avatar.png';

const AllSellers = () => {
    const [users, setUsers] = useState([]);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={Css.flex}>
            { users.filter(user => user._id !== userId).map((user, index) => {
                return (
                    <div key={index}>
                        <div className={Css.oneUser}>
                            <Link to={`/users/${user._id}`}><h4>{user.firstName} {user.lastName}</h4></Link>
                            { user.myFile ?
                                <Link to={`/users/${user._id}`}><img className={Css.profilepic} src={user.myFile} alt="avatar"/></Link>
                                : <Link to={`/users/${user._id}`}><img className={Css.profilepic} src={avatar} alt="no-avatar"/></Link>
                            }
                        </div>
                    </div>
                )
            })

            }
        </div>
    )
}

export default AllSellers