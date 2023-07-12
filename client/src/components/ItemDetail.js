import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams , Link , useNavigate } from 'react-router-dom';
import Css from '../components/ItemDetail.module.css'
import TopNavigation from './TopNavigation';
import noImg from '../assets/noimage.jpg';
import SideBar from './SideBar';
import ping from '../assets/ping.png';
import calendar from '../assets/calendar.png';

const ItemDetail = (props) => {
    const {myItems, inbox, user1, cart, removeFromDom} = props;
    const navigate = useNavigate();
    const [item, setItem] = useState({});
    const {id} = useParams();
    const {user} = item;
    const [watchlist, setWatchlist] = useState([])
    const {items} = watchlist || {};
    const [watched, setWatched] = useState(false)
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/' + id)
            .then(response => setItem(response.data))
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        axios.get('http://localhost:8000/api/watchlist/show/' + userId)
            .then(response => setWatchlist(response.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (items && item) {
            isItemAlreadyWatched(items, item)
        }
    }, [items, item])


    const isItemAlreadyWatched = async (items, thisItem) => {
        try {
            const itemIndex = items.findIndex(item => item.item._id === thisItem._id)
            if (itemIndex === -1) {
                setWatched(false);
            } else {
                setWatched(true);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addToCart = async (item) => {
        axios.post('http://localhost:8000/api/cart/add/' + userId, {item})
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addWatchList = async (item) => {
        axios.post('http://localhost:8000/api/watchlist/add/' + userId, {item})
            .then(response => {
                console.log(response.data)
                setWatched(true);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const removeFromWatch = async (itemId) => {
        try {
            axios.delete(`http://localhost:8000/api/watchlist/remove/${userId}/${itemId}`)
                .then(response => {
                    console.log('Successfully removed item')
                    setWatched(false);
                    window.location.reload();
                })
        } catch (error) {
            console.log(error)
        }
    }


    const unlistItem = async (itemId) => {
        axios.delete('http://localhost:8000/api/items/delete/' + itemId)
            .then(response => {
                removeFromDom(itemId)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getElapsedTime = () => {
        const createdAt = new Date(item.createdAt);
        const now = new Date();
        const elapsedMilliseconds = now - createdAt;
        const elapsedSeconds = Math.floor(elapsedMilliseconds/1000);
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const elapsedHours = Math.floor(elapsedMinutes / 60);
        const elapsedDays = Math.floor(elapsedHours / 24);

        if (elapsedDays > 0) {
            return `${elapsedDays} day(s) ago`;
        } else if (elapsedHours > 0) {
            return `${elapsedHours} hour(s) ago`;
        } else if (elapsedMinutes > 0) {
            return `${elapsedMinutes} minute(s) ago`;
        } else {
            return 'Just now';
        }
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
                    <h1>{item.name}</h1>
                    <h3 className={Css.green}><i>${item.price}</i></h3>
                    <h3>{item.condition}</h3>
                    <img src={calendar} className={Css.calendarIcon}/>
                    <div>
                        <h4><u>Posted:</u></h4>
                        <h4>{getElapsedTime()}</h4>
                    </div>
                    
                    <div className={Css.descriptionBox}>
                        <i><h4>{item.description}</h4></i>
                        <h4><u>Category:</u> {item.category}</h4>
                        <h4><u>Sold By:</u> <Link to={`/users/${user?._id}`}>{user?.firstName}</Link></h4>
                        <h4><u>Location:</u></h4>
                        <Link to={`/users/map/${user?._id}`}><img src={ping} className={Css.pingIcon}/></Link> {
                            user?.location? 
                            <Link to={`/users/map/${user?._id}`}><h5 className={Css.locationFont}>{user.location}</h5></Link>
                            : <h5 className={Css.locationFont}>N/A</h5>
                        }

                    </div>
                    <div>
                        { item.inventory >= 1 && item.userId !== userId ?
                            <div className={Css.buttons}>
                                <button className={Css.itemButton} onClick={() => {addToCart(item)}}><h4>Add to Cart</h4></button>
                                { watched ?
                                    <button className={Css.itemButton} onClick={() => removeFromWatch(item._id)}><h4>Remove from Watch</h4></button>
                                    : <button className={Css.itemButton} onClick={() => {addWatchList(item)}}><h4>Watchlist</h4></button>
                                }
                            </div>
                            : item.userId === userId ? (
                                <div>
                                    <button className={Css.itemButton} onClick={() => {unlistItem(item._id)}}><h4>Unlist </h4></button>
                                    <Link to={`/items/edit/${item._id}`}><button className={Css.itemButton}><h4>Edit</h4></button></Link>
                                </div>
                            )
                            : ( <h4>Currently Sold Out! :(</h4>
                        )}
                    </div>
                    {
                        item.myFile1 ?
                            <img className={Css.itemPicture} src={item.myFile1}/>
                        : <img className={Css.itemPicture} src={noImg}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemDetail