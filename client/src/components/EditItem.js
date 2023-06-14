import React, {useState, useEffect} from 'react'
import TopNavigation from './TopNavigation';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/EditItem.module.css'
import upload from '../assets/upload.png';
import SideBar from './SideBar';
import backArrow from '../assets/backarrow.png';

const EditItem = (props) => {
    const navigate = useNavigate();
    const {myItems, inbox, user, cart} = props;
    const {id} = useParams();
    const [item, setItem] = useState({})
    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [condition, setCondition] = useState("")
    const [description, setDescription] = useState("")
    const [inventory, setInventory] = useState("")
    const [category, setCategory] = useState("")
    const [postImage1, setPostImage1] = useState("")
    // const [postImage2, setPostImage2] = useState("")
    // const [postImage3, setPostImage3] = useState("")
    const [errors, setErrors] = useState([])


    useEffect(() => {
        const fetchItem = async () => {
            try {
                axios.get('http://localhost:8000/api/items/' + id)
                .then(response => {
                    setItem(response.data)
                })
                .catch(err => console.log(err))
            } catch (err) {
                console.log(err)
            }
        };
        fetchItem();
    }, [])

    useEffect(() => {
        setName(item.name || "");
        setPrice(item.price || "");
        setDescription(item.description || "");
        setInventory(item.inventory || "");
        setPostImage1({myFile: item.myFile1} || "");
        // setPostImage2({myFile: item.myFile2} || "");
        // setPostImage3({myFile: item.myFile3} || "");
    }, [item]);


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

    const updateItem = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/items/' + id, {
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
        })
            .then(response => {
                console.log(response)
                navigate('/')
                window.location.reload()
            })
            .catch(err => {
                const errorReponse = err.response.data.errors;
                console.log(errorReponse)
                setErrors(errorReponse)
            })
    }

    return (
        <div>
            <div>
                <TopNavigation inbox={inbox} user={user} cart={cart}/>
            </div>
            <div className={Css.body}>
                <div className={Css.SideBar}>
                    <SideBar myItems={myItems} />
                </div>
                <div className={Css.rightBody}>
                    <form onSubmit={updateItem} method="POST">
                        <h1>{item.name}</h1>
                        <Link to={`/items/${item._id}`}><img className={Css.backArrow} src={backArrow} alt='go-back'/></Link>
                        {errors.name? <p>{errors.name.message}</p> : null}
                        <h4>Item Name:</h4>
                        <div>
                            <input className={Css.inputField} type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                            {errors.price? <p>{errors.price.message}</p> : null}
                            <h4>Price:</h4>
                        <div>
                            <input className={Css.inputField} type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                            {errors.condition? <p>{errors.condition.message}</p> : null}
                            <h4>Condition:</h4>
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
                            <h4>Description:</h4>
                        <div>
                            <textarea className={Css.inputField} rows="5" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                            {errors.inventory? <p>{errors.inventory.message}</p> : null}
                            <h4>Inventory:</h4>
                        <div>
                            <input className={Css.inputField} type="number" name="inventory" value={inventory} onChange={(e) => setInventory(e.target.value)}/>
                        </div>
                            {errors.category? <p>{errors.category.message}</p> : null}
                            <h4>Category:</h4>
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
                            <button className={Css.listButton}><h4>Update</h4></button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default EditItem