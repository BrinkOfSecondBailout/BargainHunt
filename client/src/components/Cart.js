import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Css from '../components/Cart.module.css'
import TopNavigation from './TopNavigation';
import noImg from '../assets/noimage.jpg';
import SideBar from './SideBar';

const Cart = (props) => {
    const {myItems, inbox, user} = props;
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const {items} = cart || {};
    const id = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:8000/api/cart/show/' + id)
            .then(response => {
                setCart(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    useEffect(() => {
        calculateTotal(items);
    }, [items]);


    const calculateTotal = (items) => {
        if (!items) {
            return 0;
        }
        let total = 0
        for (let i = 0; i<items.length; i++) {
            let productTotal = items[i].item.price * items[i].quantity
            total += productTotal;
        }
        setTotal(total)
        return total;
    }

    const quantityChange = async (item, itemId, newQuantity, direction) => {
        try {
            axios.patch('http://localhost:8000/api/cart/update/' + id, {
                item: item,
                itemId: itemId,
                quantity: newQuantity,
                direction: direction
            })
            console.log('Quantity successfully updated')
            calculateTotal(items);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFromCart = async (cartId, itemId) => {
        try {
            axios.delete(`http://localhost:8000/api/cart/removeItem/${id}/${cartId}/${itemId}`)
                .then(response => {
                    console.log('Successfully removed item')
                })
        } catch (error) {
            console.log(error)
        }
    }

    const decreaseQuantity = (item, cartId, itemQuantity) => {
        const itemId = item._id
        console.log(itemId)
        console.log(cartId)
        if (itemQuantity === 1) {
            deleteFromCart(cartId, itemId);
        } else {
            const newQuantity = itemQuantity - 1;
            quantityChange(item, cartId, newQuantity, "down");
        }
    };

    const increaseQuantity = (item, itemId, itemQuantity) => {
        const newQuantity = itemQuantity + 1;
        quantityChange(item, itemId, newQuantity, "up");
    };


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
                <h1>Cart</h1>
                <div className={Css.allCartItems} >
                { items?.map((item, index) => {
                    return (
                        <div>
                            <div className={Css.oneItem} key={index}>
                                <div className={Css.itemDiv}>
                                    { item.item.myFile1 ?
                                        <Link to={`/items/${item.item._id}`}><img className={Css.itemPicture} src={item.item.myFile1} alt="item-pic"/></Link>
                                    : <Link to={`/items/${item.item._id}`}><img className={Css.itemPicture} src={noImg} alt="no-img"/></Link>
                                    }
                                </div>
                                <div className={Css.nameDiv}>
                                    <h4><Link to={`/items/${item.item._id}`}>{item.item.name}</Link></h4>
                                    <h4>${item.item.price}</h4>
                                </div>
                                <div className={Css.quantityDiv}>
                                    <form>
                                        <h5>Quantity:</h5>
                                        <button className={Css.quantityButton} onClick={() => decreaseQuantity(item.item, item._id, item.quantity)}><h4>-</h4></button>
                                        <input className={Css.smallInput} type="text" value={item.quantity} readOnly/>
                                        <button className={Css.quantityButton} onClick={() => increaseQuantity(item.item, item._id, item.quantity)}><h4>+</h4></button>
                                        <div>
                                            <button className={Css.removeButton} onClick={() => deleteFromCart(item._id, item.item._id)}><h5>Remove</h5></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className={Css.totalDiv}><h2>Total: ${total}</h2></div>
            
            {   total > 0 ? 
                (<div className={Css.checkoutDiv}>
                    <button className={Css.checkoutButton}><h3>Checkout</ h3></button>
                </div>)
                : null
            }
            </div>

            </div>
            </div>
            
        </div>
    )
}

export default Cart