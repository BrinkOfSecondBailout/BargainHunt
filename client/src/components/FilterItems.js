import React, {useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Css from '../components/FilterItems.module.css'
import noImg from '../assets/noimage.jpg';

const FilterItems = () => {

    const [category, setCategory] = useState("")
    const [items, setItems] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const userId = localStorage.getItem('userId')

    const filterByCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.get('http://localhost:8000/api/items/filter/' + category)
                .then(response => {
                    const filteredItems = (response.data.filter(item => item.userId !== userId))
                    setItems(filteredItems)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const searchByName = async (e) => {
        e.preventDefault();
        try {
            await axios.get('http://localhost:8000/api/items/search/' + searchQuery)
                .then(response => {
                    const filteredItems = (response.data.filter(item => item.userId !== userId))
                    setItems(filteredItems)
                })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <form onSubmit={filterByCategory}>
                <select className={Css.selectField} onChange={(e) => setCategory(e.target.value)} name="category">
                    <option value="" selected disabled hidden>Select One</option>
                    <option value="electronics">Electronics</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="clothings">Clothings/Accessories</option>
                    <option value="toys">Toys/Games</option>
                    <option value="furniture">Furniture</option>
                    <option value="sports">Sports</option>
                    <option value="others">Others/Misc</option>
                </select>
                <button className={Css.filterButton}><h4>Filter</h4></button>
            </form>
            <form onSubmit={searchByName}>
                <input placeholder="Search by name or keywords" type="text" onChange={(e) => setSearchQuery(e.target.value)}/>
                <button className={Css.filterButton}><h4>Search</h4></button>
            </form>

            <div>
                {items?.length !== 0 ?
                    <div className={Css.flex}>
                        { items?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className={Css.oneItem}>
                                    <h4 className={Css.shortenedName}><Link to={`/items/${item._id}`}>{item.name}</Link></h4>
                                    <p>${item.price}</p>
                                    { item.myFile1 ?
                                    <img className={Css.itemPictureSmall} src={item.myFile1} alt="item-pic"/>
                                    : <img className={Css.itemPictureSmall} src={noImg}/>
                                    }
                                </div>

                                </div>
                            )
                        }) 
                    }
                    </div>
                : <h3>No results found...</h3>
                }
            </div>
        </div>
    )
}

export default FilterItems