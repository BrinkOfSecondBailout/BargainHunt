import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png';
import cartIcon from '../assets/cart.png';
import Css from './TopNavigation.module.css'
import ping from '../assets/ping.png';
import saleIcon from '../assets/sale.png';
import inboxIcon from '../assets/inbox.png';
import homeIcon from '../assets/home.png';
import editIcon from '../assets/edit.png';
import watchIcon from '../assets/watch.png';
import logoutIcon from '../assets/logout.png';

const TopNavigation = (props) => {
    const {inbox, user, cart} = props;

    return (
        <div className={Css.topNav}>
            <div className={Css.topLeft}>
                <div className={Css.wholeLogo}><img className={Css.saleIcon} src={saleIcon} /><h1 className={Css.logo}>BargainHunt</h1></div>
                { user.myFile ?
                    <Link to='/'><img className={Css.profilepic} src={user.myFile} alt="avatar"/></Link>
                    : <Link to='/'><img className={Css.profilepic} src={avatar} alt="no-avatar"/></Link>
                }
            </div>
            <div className={Css.topRight}>
                <div className={Css.twoTopIcons}>
                    <div className={Css.totalCart}>
                        <Link to='/cart'><button className={Css.cartButton}><img className={Css.cartPic} src={cartIcon} alt="cart"/><div className={Css.cartTotal}><h6>{cart.count}</h6></div></button></Link>
                    </div>
                    <div className={Css.totalInbox}>
                        <Link to={`/inbox/${user._id}`}><button className={Css.inboxButton}><img className={Css.inboxIcon} src={inboxIcon} alt='inbox'/><div className={Css.inboxTotal}><h6>{inbox.newMessageCount}</h6></div></button></Link>
                    </div>
                </div>
                <div className={Css.navLinks}>
                    {
                        user.location?
                        <Link to='/users/edit'><img src={ping} className={Css.pingIcon}/><h6 className={Css.locationFont}>{user.location}</h6></Link>
                        : <Link to='/users/edit'><img src={ping} className={Css.pingIcon}/><h6 className={Css.locationFont}>None set yet..</h6></Link>

                    }
                    <Link to='/'><h4 className={Css.spaceOut}>home</h4></Link>
                    <Link to='/users/edit'><h4 className={Css.spaceOut}>edit profile</h4></Link>
                    <Link to='/favorites'><h4 className={Css.spaceOut}>watchlist</h4></Link>
                    <Link to='/logout'><h4 className={Css.spaceOut}>logout</h4></Link>
                </div>
                <div className={Css.navLinksSmall}>
                    <Link to='/'><img src={homeIcon} className={Css.smallIcon}/></Link>
                    <Link to='/users/edit'><img src={editIcon} className={Css.smallIcon}/></Link>
                    <Link to='/favorites'><img src={watchIcon} className={Css.smallIcon}/></Link>
                    <Link to='/logout'><img src={logoutIcon} className={Css.smallIcon}/></Link>
                </div>
            </div>
        </div>
    )
}

export default TopNavigation