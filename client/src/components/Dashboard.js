import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Css from './Dashboard.module.css'
import AllItems from './AllItems';

import TopNavigation from './TopNavigation';
import axios from 'axios';
import SideBar from './SideBar';

const Dashboard = (props) => {
    const {cart, items, myItems} = props;
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({})
    const [inbox, setInbox] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/inbox/' + id)
            .then(response => {
                setInbox(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return ( 
        <div className={Css.container}>
            <div className={Css.TopNav}>
                <TopNavigation inbox={inbox} user={user} cart={cart}/>
            </div>
            <div className={Css.body}>
                    <SideBar myItems={myItems}/>
                <div className={Css.rightBody}>
                    <h1>Shop All Items</h1>
                    <div className={Css.allItemsDiv}>
                        <AllItems items={items}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard