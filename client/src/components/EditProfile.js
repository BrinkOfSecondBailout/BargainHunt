import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import avatar from '../assets/avatar.png';
import axios from 'axios';
import Css from './EditProfile.module.css';
import TopNavigation from './TopNavigation';
import SideBar from './SideBar';
import EditLocation from './EditLocation';

const EditProfile = (props) => {
    const navigate = useNavigate();
    // user1 is pulled from the parent in order to pre-populate the form, 
    // the user is for the profilepicture. this is the only way to go around it
    const {myItems, inbox, user1, cart} = props;
    const [user, setUser] = useState({})
    const [postImage, setPostImage] = useState({myFile: user.myFile});
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState(user1.firstName);
    const [lastName, setLastName] = useState(user1.lastName);
    const [email, setEmail] = useState(user1.email);
    const [location, setLocation] = useState(user1.location);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                axios.get('http://localhost:8000/api/users/' + userId)
                .then(response => {
                    setUser(response.data);
                })
                .catch(err => console.log(err));
            } catch (err) {
                console.log(err)
            }
        };
        fetchUser();
    }, []);

    const createPost = async (newImage) => {
        try {
            await axios.patch('http://localhost:8000/api/users/profile/' + userId, newImage)
            setMessage("Success! Profile photo updated!")
            navigate('/')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = (e) => {
        e.preventDefault();
        createPost(postImage);
        console.log("Uploaded");
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({myFile : base64})
    }

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

    const updateUser = async (e) => {
        try {
            e.preventDefault();
            await axios.patch('http://localhost:8000/api/users/update/' + userId, {
                firstName: firstName,
                lastName: lastName,
                email: email
            })
                .then(response => {
                    console.log(response);
                    navigate('/')
                })
                .catch(err => {
                    const errorReponse = err.response.data.errors;
                    console.log(err.response.data.errors);
                    setErrors(errorReponse);
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
                    <SideBar myItems={myItems} />
                </div>
                <div className={Css.rightBody}>
                    <h1>Edit Your Profile, {user.firstName}</h1>
                        <h3>Upload profile picture</h3>
                        <form onSubmit={uploadImage} encType="multipart/form-data">
                            <div><label htmlFor="file-upload"><img className={Css.customUpload} src={postImage.myFile || avatar} alt=""/></label></div>
                            <input type="file" accept="image/*" name="myFile" id="file-upload" required  onChange={(e) => handleFileUpload(e)}/>
                            <button className={Css.updateButton}><h4>Upload</h4></button>
                        </form>
                        { message ? <p>{message}</p> : null }

                        <form className={Css.form} onSubmit={updateUser}>
                                {errors.firstName? <p>{errors.firstName.message}</p> : null}
                                <h5>First Name:</h5>
                            <div>
                                <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={Css.inputField}/>
                            </div>
                                {errors.lastName? <p>{errors.lastName.message}</p> : null}
                                <h5>Last Name:</h5>
                            <div>
                                <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className={Css.inputField}/>
                            </div>
                                {errors.email? <p>{errors.email.message}</p> : null}
                                <h5>Email:</h5>
                            <div>
                                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={Css.inputField}/>
                            </div>
                            <div>
                                <button className={Css.updateButton}><h4>Update</h4></button>
                            </div>
                        </form>
                    <EditLocation location={location}/>
                    </div>
                </div>
            
        </div>
    )
}

export default EditProfile