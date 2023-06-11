import React from 'react'
import Css from '../components/AllItems.module.css'
import {Link} from 'react-router-dom';
import noImg from '../assets/noimage.jpg';

const AllItems = (props) => {
    const {items} = props;

    return (
        <div className={Css.totalAllItems}>
            {items.length !== 0 ?
                <div className={Css.allItems}>
                    { items.map((item, index) => {
                        return (
                            <div className={Css.oneItem} key={index}>
                                <h4><Link to={`/items/${item._id}`}>{item.name}</Link></h4>
                                <h4>${item.price}</h4>
                                { item.myFile1 ?
                                    <Link to={`/items/${item._id}`}><img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/></Link>
                                : <Link to={`/items/${item._id}`}><img className={Css.itemMainPic} src={noImg} alt="no-img"/></Link>
                                }
                            </div>
                        )
                    })
                    }
                </div>
            : <div className={Css.noItems}><h3>No Items Listed Yet</h3></div>
            }
        </div>
    )
}

export default AllItems