import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import {useState, useEffect} from 'react';
import axios from 'axios';
import EditProfile from './components/EditProfile';
import NewItem from './components/NewItem';
import ItemDetail from './components/ItemDetail';
import UserDetail from './components/UserDetail';
import Cart from './components/Cart';
import Watchlist from './components/Watchlist';
import EditItem from './components/EditItem';
import Inbox from './components/Inbox';
import NewMessage from './components/NewMessage';
import MessageThread from './components/MessageThread';
import RateUser from './components/RateUser';
import UserReviews from './components/UserReviews';

function App() {
    const isLogged = window.localStorage.getItem('isLogged');
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [myItems, setMyItems] = useState([]);
    const [inbox, setInbox] = useState([]);
    const [cart, setCart] = useState({});


    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8000/api/items/shownot/' + id)
            .then(response => {
            setItems(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/show/' + id)
            .then(response => {
                setMyItems(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/cart/show/' + id)
            .then(response => {
                setCart(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const removeFromDom = itemId => {
        setMyItems(myItems.filter(item => item._id != itemId));
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/inbox/' + id)
            .then(response => {
                setInbox(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={isLogged? <Dashboard inbox={inbox} cart={cart} items={items} myItems={myItems} /> : <Login/>} />
                    <Route path='/logout' element={<Logout/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/users/edit" element={isLogged? <EditProfile myItems={myItems} inbox={inbox} user1={user} cart={cart}/> : <Login/>} />
                    <Route path="/users/:id" element={isLogged? <UserDetail myItems={myItems} inbox={inbox}  user1={user} cart={cart} /> : <Login/>} />
                    <Route path="/users/rate/:id" element={isLogged? <RateUser myItems={myItems} inbox={inbox}  user1={user} cart={cart} /> : <Login/>} />
                    <Route path="/users/reviews/:id" element={isLogged? <UserReviews myItems={myItems} inbox={inbox}  user1={user} cart={cart} /> : <Login/>} />
                    <Route path="/items/new" element={isLogged? <NewItem inbox={inbox}  user={user} cart={cart} myItems={myItems} setMyItems={setMyItems}/> : <Login/>} />
                    <Route path="/items/:id" element={isLogged? <ItemDetail myItems={myItems} inbox={inbox} user1={user} cart={cart} removeFromDom={removeFromDom} /> : <Login/>} />
                    <Route path="/items/edit/:id" element={isLogged? <EditItem myItems={myItems} inbox={inbox}  user={user} cart={cart} /> : <Login/>} />
                    <Route path="/cart" element={isLogged? <Cart myItems={myItems} inbox={inbox}  user={user} /> : <Login/>} />
                    <Route path="/favorites" element={isLogged? <Watchlist myItems={myItems} inbox={inbox} user={user} cart={cart}/> : <Login/>} />
                    <Route path="/message/:id" element={isLogged? <NewMessage myItems={myItems} inbox={inbox} user={user} cart={cart}/> : <Login/>} />
                    <Route path="/inbox/:id" element={isLogged? <Inbox myItems={myItems} inbox={inbox} user={user} cart={cart}/> : <Login/>} />
                    <Route path="/inbox/correspondence/:id/:userId" element={isLogged? <MessageThread myItems={myItems}inbox={inbox}  user={user} cart={cart}/> : <Login/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
