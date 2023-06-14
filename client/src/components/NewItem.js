import React, {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import upload from '../assets/upload.png';
import Css from './NewItem.module.css';
import axios from 'axios';
import TopNavigation from './TopNavigation';
import SideBar from './SideBar';

const NewItem = (props) => {
    const navigate = useNavigate();
    const {inbox, myItems, setMyItems, user, cart} = props;
    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [condition, setCondition] = useState("")
    const [description, setDescription] = useState("")
    const [inventory, setInventory] = useState("")
    const [category, setCategory] = useState("")
    const [postImage1, setPostImage1] = useState({})
    // const [postImage2, setPostImage2] = useState({})
    // const [postImage3, setPostImage3] = useState({})
    const [errors, setErrors] = useState([])
    
    const newItemHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/items', {
            name: name,
            price: price,
            condition: condition,
            description: description,
            inventory: inventory,
            category: category,
            userId: user._id,
            user: user,
            myFile1: postImage1.myFile
            // myFile2: postImage2.myFile,
            // myFile3: postImage3.myFile
        }) .then (response => {
            setMyItems([...myItems, response.data])
            console.log(response.data)
            navigate('/')
        }) .catch (err => {
            const errorReponse = err.response.data.errors;
            console.log(errorReponse)
            setErrors(errorReponse)
        })
    }

    const handleFileUpload1 = async (e) => {
        const file1 = e.target.files[0];
        const base64 = await convertToBase64(file1);
        setPostImage1({myFile : base64})
    }

    // const handleFileUpload2 = async (e) => {
    //     const file2 = e.target.files[0];
    //     const base64 = await convertToBase64(file2);
    //     setPostImage2({myFile : base64})
    // }

    // const handleFileUpload3 = async (e) => {
    //     const file3 = e.target.files[0];
    //     const base64 = await convertToBase64(file3);
    //     setPostImage3({myFile : base64})
    // }

    const convertToBase64 = (file) => {
        return new Promise ((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    return (
        <div>
            <div>
                <TopNavigation inbox={inbox} cart={cart} user={user}/>
            </div>
            <div className={Css.body}>
                <div className={Css.SideBar}>
                    <SideBar myItems={myItems}/>
                </div>
                <div className={Css.rightBody}>
                    <h1>List a New Item</h1>
                    <form onSubmit={newItemHandler} method="POST">
                        {errors.name? <p>{errors.name.message}</p> : null}
                        <h5>Item Name:</h5>
                        <div>
                            <input className={Css.inputField} type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                        </div>
                            {errors.price? <p>{errors.price.message}</p> : null}
                            <h5>Price:</h5>
                        <div>
                            <input className={Css.inputField} type="number" name="price" onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                            {errors.condition? <p>{errors.condition.message}</p> : null}
                            <h5>Condition:</h5>
                        <div>
                            <select className={Css.inputField} name="condition" onChange={(e) => setCondition(e.target.value)}>
                                <option value="" selected disabled hidden>
                                    Select an Option
                                </option>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                                <option value="Old">Old</option>
                            </select>
                        </div>
                            {errors.description? <p>{errors.description.message}</p> : null}
                            <h5>Description:</h5>
                        <div>
                            <textarea className={Css.inputField} rows="5" type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                            {errors.inventory? <p>{errors.inventory.message}</p> : null}
                            <h5>Inventory:</h5>
                        <div>
                            <input className={Css.inputField} type="number" name="inventory" onChange={(e) => setInventory(e.target.value)}/>
                        </div>
                            {errors.category? <p>{errors.category.message}</p> : null}
                            <h5>Category:</h5>
                        <div>
                            <select className={Css.inputField} onChange={(e) => setCategory(e.target.value)} name="category">
                                <option value="" selected disabled hidden>Select One</option>
                                <option value="electronics">Electronics</option>
                                <option value="collectibles">Collectibles</option>
                                <option value="clothings">Clothings/Accessories</option>
                                <option value="toys">Toys/Games</option>
                                <option value="furniture">Furniture</option>
                                <option value="others">Others/Misc</option>
                            </select>
                        </div>

                        <div className={Css.uploadIcons}>
                            <div>
                                <label htmlFor="file-upload1"><img className={Css.uploadIcon} src={postImage1.myFile || upload} alt="file-upload"/></label>
                                <input  type="file" accept="image/*" name="myFile1" id="file-upload1" onChange={(e) => handleFileUpload1(e)}/>
                            </div>
                            {/* <div>
                                <label htmlFor="file-upload2"><img className={Css.uploadIcon} src={postImage2.myFile || upload} alt="file-upload"/></label>
                                <input type="file" accept="image/*" name="myFile2" id="file-upload2" onChange={(e) => handleFileUpload2(e)}/>
                            </div>
                            <div>
                                <label htmlFor="file-upload3"><img className={Css.uploadIcon} src={postImage3.myFile || upload} alt="file-upload"/></label>
                                <input type="file" accept="image/*" name="myFile3" id="file-upload3" onChange={(e) => handleFileUpload3(e)}/>
                            </div> */}
                        </div>
                        <div>
                            <button className={Css.listButton}><h4>List</h4></button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    )
}

export default NewItem