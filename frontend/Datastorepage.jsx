import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Signuppage from './Signuppage'
import Loginpage from './Loginpage'
import Homepage from './Homepage'
import Cartdata from './Cartdata'
import Paypage from './Paypage'

const Datastorepage = () => {
    const [cartArray, setcartArray] = useState([])
    const [count, setcount] = useState(0)

    return (
        <div>
            <Routes>
                <Route path='/' element={<Loginpage/>} />
                <Route path='/signuppage' element={<Signuppage/>} />
                <Route path='/homepage' element={<Homepage cartArray={cartArray} setcartArray={setcartArray} setcount={setcount} count ={count}/>} />
                <Route path='/cartdata' element={<Cartdata cartArray={cartArray} setcartArray={setcartArray} setcount={setcount} count ={count}/>} />
                <Route path='/paypage' element={<Paypage cartArray={cartArray}/>} />

            </Routes>
        </div>
    )
}

export default Datastorepage
