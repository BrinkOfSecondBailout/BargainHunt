import React from 'react';
import Css from '../components/AllItems.module.css';
import {Link} from 'react-router-dom';
import noImg from '../assets/noimage.jpg';

const AllMyItems = (props) => {
    const {myItems} = props;

    return (
        <div className={Css.myItemsDiv}>
            { myItems.length !== 0
                ? <div className={Css.allMyItems}>
                    { myItems.map((item, index) => {
                        return (
                            <div key={index}>
                                <div>
                                    <h4><Link to={`/items/${item._id}`}>{item.name}</Link></h4>
                                    <h5>${item.price}</h5>
                                <div>
                                { item.myFile1 ?
                                    <Link to={`/items/${item._id}`}><img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/></Link>
                                : <Link to={`/items/${item._id}`}><img className={Css.itemMainPic} src={noImg} alt="no-img"/></Link>
                                }
                                </div>
                                </div>
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

export default AllMyItems