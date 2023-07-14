import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Css from '../components/Watchlist.module.css'
import TopNavigation from './TopNavigation';
import noImg from '../assets/noimage.jpg';
import SideBar from './SideBar';

const Watchlist = (props) => {
    const {myItems, inbox, user, cart} = props;
    const id = localStorage.getItem('userId');
    const [watchlist, setWatchlist] = useState([])
    const {items} = watchlist || {};

    useEffect(() => {
        axios.get('http://localhost:8000/api/watchlist/show/' + id)
            .then(response => {
                setWatchlist(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const removeFromWatchlist = async (itemId) => {
        console.log(itemId)
        try {
            axios.delete(`http://localhost:8000/api/watchlist/remove/${id}/${itemId}`)
                .then(response => {
                    console.log('Successfully removed item')
                    window.location.reload();
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div>
                <TopNavigation inbox={inbox} user={user} cart={cart}/>
            </div>
            <div className={Css.body}>
                <div className={Css.SideBar}>
                    <SideBar myItems={myItems}/>
                </div>
                <div className={Css.rightBody}>
                    <h1>Watchlist</h1>
                    <div className={Css.watchItems}>
                        { items?.map((item, index) => {
                            return (
                                <div key={index} >
                                    <div>
                                        <h4><Link to={`/items/${item.item._id}`}>{item.item.name}</Link></h4>
                                        <h4>${item.item.price}</h4>
                                        
                                    </div>
                                    { item.item.myFile1 ?
                                        <Link to={`/items/${item.item._id}`}><img className={Css.itemPicture} src={item.item.myFile1} alt="item-pic"/></Link>
                                    : <Link to={`/items/${item.item._id}`}><img className={Css.itemPicture} src={noImg} alt="no-img"/></Link>
                                    }
                                    <div>
                                        <button className={Css.removeButton} onClick={() => removeFromWatchlist(item.item._id)}><h5>Remove</h5></button>
                                    </div>
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

export default Watchlist