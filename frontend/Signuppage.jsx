import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signuppage = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        contact: '',
        email: '',
        password: ''
    })
    const [error, seterror] = useState('')
    function handlechange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    async function handlesubmit() {
        if (varify()) {
            //filename at backend is multipagevs2.js and other file for data is miniprojectdata.js
            let senddata = await axios.post("http://localhost:3810/post", data)
            setData({ name: '', contact: '', email: '', password: '' });
            navigate('/homepage')
        }
    }

    function varify() {
        let mistake = ''
        let check = true;
        if (data.name.length === 0 || data.contact.length === 0 || data.email.length === 0 || data.password.length === 0) {
            check = false;
            mistake = '*Something bad'
        }
        seterror(mistake)
        return check;
    }
    function handlelogin() {
        navigate('/')
    }
    return (
        <>

            <div className='container d-flex flex-column w-25 gap-2 border rounded border-warning p-2 my-5'>
                <h1 className='fs-2 text-center'>Signup</h1>

                <label htmlFor="name">Enter your name:</label>
                <input className='form-control' type="text" id='name' name='name' value={data.name} placeholder="name" onChange={handlechange} />

                <label htmlFor="contact">Enter your contact:</label>
                <input className='form-control' type="number" id='contact' name='contact' value={data.contact} placeholder="contact" onChange={handlechange} />

                <label htmlFor="email">Enter your email:</label>
                <input className='form-control' type="email" id='email' name='email' value={data.email} placeholder="email" onChange={handlechange} />

                <label htmlFor="password">Enter your password:</label>
                <input className='form-control' type="text" id='password' name='password' value={data.password} placeholder="password" onChange={handlechange} />
                <p className='text-danger'>{error}</p>

                <button className='my-2 bg-info rounded p-2 border-0 ' onClick={handlesubmit}>Signup</button>
                <button className='my-2 bg-info rounded p-2 border-0 ' onClick={handlelogin}>Login</button>

            </div>
        </>
    )
}

export default Signuppage
