import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/Register.module.css';
import saleIcon from '../assets/sale.png';

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
                firstName,
                lastName,
                email,
                password
            })
            .then(response => {
                console.log(response.data)
                window.localStorage.setItem('isLogged', true)
                window.localStorage.setItem('userId', response.data.id)
                navigate('/')
                window.location.reload();
            })
            .catch(err => {
                const errorReponse = err.response.data.errors;
                console.log(err.response.data.errors);
                setErrors(errorReponse);
            })
    }


    return (
        <div>
            <div className={Css.registerBody}>
                <div className={Css.wholeLogo}><img className={Css.saleIcon} src={saleIcon} /><h1 className={Css.logo}>BargainHunt</h1></div>
                <div className={Css.loginBox}>
                <form onSubmit={registerUser} method="POST">
                    {errors.firstName? <p className={Css.red}>{errors.firstName.message}</p> : null}
                    <div className={Css.oneField}>
                        <h4>First Name:</h4>
                        <div>
                            <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} className={Css.inputField}/>
                        </div>
                    </div>
                        {errors.lastName? <p className={Css.red}>{errors.lastName.message}</p> : null}
                    <div className={Css.oneField}>
                        <h4>Last Name:</h4>
                        <div>
                            <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} className={Css.inputField}/>
                        </div>
                    </div>
                        {errors.email? <p className={Css.red}>{errors.email.message}</p> : null}
                    <div className={Css.oneField}>
                        <h4>Email:</h4>
                        <div>
                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className={Css.inputField}/>
                        </div>
                    </div>
                        {errors.password? <p className={Css.red}>{errors.password.message}</p> : null}
                    <div className={Css.oneField}>
                        <h4>Password</h4>
                        <div>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className={Css.inputField}/>
                        </div>
                    </div>
                    <button className={Css.registerButton}><h4>Register</h4></button>
                </form>
                </div>
                    <Link to='/'><h4>Go to Login</h4></Link>
            </div>
        </div>
    )
}

export default Register