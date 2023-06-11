import React from 'react'


const Logout = () => {
    window.localStorage.removeItem('isLogged')
    window.localStorage.removeItem('userId')
    window.location.href = '/';
}

export default Logout