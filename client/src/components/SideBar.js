import React from 'react';
import Css from '../components/SideBar.module.css';
import {Link} from 'react-router-dom';
import AllMyItems from './AllMyItems';
import AllSellers from './AllSellers';
import FilterItems from './FilterItems';


const SideBar = (props) => {
    const {myItems} = props;
    
    return (
        <div className={Css.totalLeft}>
            <div className={Css.topLeftBody}>
                <h1>My Items</h1>
                <Link to='/items/new'><button className={Css.listButton}><h4>List a new item</h4></button></Link>
                <AllMyItems myItems={myItems}/>
            </div>
            <div className={Css.bottomLeftBody}>
                <FilterItems />
                <h1>Browse By Sellers</h1>
                <AllSellers />
            </div>
        </div>
    )
}

export default SideBar