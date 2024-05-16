import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
    let navigate = useNavigate();
    const [error, seterror] = useState('')
    const [getdata, setgetdata] = useState([])
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    function handlechange(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    function handlelogin() {
        if (varify()) {
            getdata.map((e, i) => {
                if (data.email === e.email && data.password === e.password) {
                    navigate('/homepage')
                    seterror('');
                    setData({ email: '', password: '' });
                }
                else {
                    seterror('*Please enter valid credential or if you not till signed then please firt signup the page')
                }
            })
        }
    }

    function varify() {
        let mistake = ''
        let check = true;
        if (data.email.length === 0 || data.password.length === 0) {
            check = false;
            mistake = '*Something bad'
        }
        seterror(mistake)
        return check;
    }

    async function recdata() {
        let dataget = await axios.get("http://localhost:3810");
        setgetdata(dataget.data);//we use here data this is not obj clg krne pr dataget me data k andr apna array pda h usko fetch kiya .data lgakr
    }
    useEffect(() => {
        recdata();
    }, [])

    function handlesignup() {
        navigate('/signuppage')
    }

    return (
        <>
            <div className='container d-flex flex-column w-25 gap-2 border border-warning p-3 my-5 rounded'>
                <h1 className='fs-2 text-center'>Login</h1>

                <label htmlFor="email">Enter your email:</label>
                <input className='form-control' type="email" id='email' name='email' value={data.email} placeholder="email" onChange={handlechange} />

                <label htmlFor="password">Enter your password:</label>
                <input className='form-control' type="text" id='password' name='password' value={data.password} placeholder="password" onChange={handlechange} />

                <p className='text-danger'>{error}</p>

                {error.length>20 && <button className='my-2 bg-info rounded p-2 border-0 ' onClick={handlesignup}>Click here for signup !</button>}
                <button className='my-2 bg-info rounded p-2 border-0 ' onClick={handlelogin}>Login</button>
            </div>
        </>
    )
}

export default Loginpage

//localhost me to data jese bhejte h wesa hi receive ho jata h but database se data array me store ho rha h so apn ko map method ki help se object nikalne pdenge or phir usme se email and password ki value nikalni pdegi or wo compaire krenge apne data k sath but ynha map function error show kr rhi h

// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const Loginroute = () => {
//     let navigate = useNavigate();
//     const [error, seterror] = useState('')
//     const [getdata, setgetdata] = useState([])
//     const [data, setData] = useState({
//         email: '',
//         password: ''
//     })
//     function handlechange(e) {
//         setData({ ...data, [e.target.name]: e.target.value })
//     }
//     function handlelogin() {
//         if (varify()) {
//             getdata.map((e, i) => {
//                 if (data.email === e.email && data.password === e.password) {
//                     navigate('/homepage')
//                     seterror('');
//                 }
//                 else {
//                     seterror('*Please enter valid credential')
//                 }
//         })
//     }

// }

// function varify() {
//     let mistake = ''
//     let check = true;
//     if (data.email.length === 0 || data.password.length === 0) {
//         check = false;
//         mistake = '*Something bad'
//     }
//     seterror(mistake)
//     return check;
// }

// async function recdata() {
//     let dataget = await axios.get("http://localhost:3810");
//     setgetdata(dataget);
// }
// useEffect(() => {
//     recdata();
// }, [])


// return (
//     <>
//         <div className='container d-flex flex-column w-25 gap-2 '>
//             <h1 className='fs-2 text-center'>Login</h1>

//             <label htmlFor="email">Enter your email:</label>
//             <input className='form-control' type="email" id='email' name='email' value={data.email} placeholder="email" onChange={handlechange} />

//             <label htmlFor="password">Enter your password:</label>
//             <input className='form-control' type="text" id='password' name='password' value={data.password} placeholder="password" onChange={handlechange} />

//             <p className='text-danger'>{error}</p>

//             <button className='my-2 bg-info rounded p-2 border-0 ' onClick={handlelogin}>Login</button>

//         </div>
//     </>
// )
// }
// export default Loginroute


// //solution
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const Loginroute = () => {
//     let navigate = useNavigate();
//     const [error, seterror] = useState('');
//     const [getdata, setgetdata] = useState([]);
//     const [data, setData] = useState({
//         email: '',
//         password: ''
//     });

//     function handlechange(e) {
//         setData({ ...data, [e.target.name]: e.target.value });
//     }

//     async function handlelogin() {
//         if (varify()) {
//             const foundUser = getdata.find(user => user.email === data.email && user.password === data.password);
//             if (foundUser) {
//                 navigate('/homepage');
//                 seterror('');
//             } else {
//                 seterror('*Please enter valid credentials');
//             }
//         }
//     }

//     function varify() {
//         let mistake = '';
//         let check = true;
//         if (data.email.length === 0 || data.password.length === 0) {
//             check = false;
//             mistake = '*Something bad';
//         }
//         seterror(mistake);
//         return check;
//     }

//     async function recdata() {
//         try {
//             const response = await axios.get("http://localhost:3810");
//             setgetdata(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect(() => {
//         recdata();
//     }, []);

//     return (
//         <>
//             <div className='container d-flex flex-column w-25 gap-2 '>
//                 <h1 className='fs-2 text-center'>Login</h1>

//                 <label htmlFor="email">Enter your email:</label>
//                 <input className='form-control' type="email" id='email' name='email' value={data.email} placeholder="email" onChange={handlechange} />

//                 <label htmlFor="password">Enter your password:</label>
//                 <input className='form-control' type="text" id='password' name='password' value={data.password} placeholder="password" onChange={handlechange} />

//                 <p className='text-danger'>{error}</p>

//                 <button className='my-2 bg-info rounded p-2 border-0 ' onClick={handlelogin}>Login</button>

//             </div>
//         </>
//     );
// }
// export default Loginroute;
