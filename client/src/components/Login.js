import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/Login.module.css';
import saleIcon from '../assets/sale.png';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email,
            password
        })
            .then(response=>{
                window.localStorage.setItem('isLogged', true)
                window.localStorage.setItem('userId', response.data.id)
                window.location.reload();
                navigate('/')
            })
            .catch(err => {
                const errorReponse = err.response.data;
                console.log(err.response.data);
                setErrors(errorReponse);
            })
    }


    return (
        <div>
            <div className={Css.loginBody}>
                <div className={Css.wholeLogo}><img className={Css.saleIcon} src={saleIcon} /><h1 className={Css.logo}>BargainHunt</h1></div>
                <div className={Css.loginBox}>
                    {errors ? <p className={Css.red}>{errors}</p> : null}
                    <form onSubmit={loginUser} method="POST">
                        <div className={Css.oneField}>
                            <u><h5>Demo Account:</h5></u>
                            <p>sample@gmail.com</p>
                            <p>sample123</p>
                        </div>
                        <div className={Css.oneField}>
                            <h4>Email:</h4>
                            <div>
                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className={Css.inputField}/>
                            </div>
                        </div>
                        <div className={Css.oneField}>
                            <h4>Password</h4>
                            <div>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className={Css.inputField}/>
                            </div>
                        </div>
                        <button className={Css.loginButton}><h4>Login</h4></button>
                    </form>
                </div>
                <Link to='/register'><h4>Register an account</h4></Link>
            </div>
        </div>
    )
}

export default Login