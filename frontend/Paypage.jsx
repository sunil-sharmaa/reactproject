import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Paypage = (props) => {
    const [totalPrice, settotalPrice] = useState(0)

    const navigate = useNavigate()
    function handlestructure() {
        navigate('/cartdata')
    }

    useEffect(() => {
        if (props.cartArray.length > 0) {
            let total = 0;
             total = props.cartArray.reduce((result, current) => {
                return result + current.price
            },0)
            settotalPrice(total)
        }
    }, [])

    return (
        <>
            <div className='container border'>
                <h1 className='alert alert-danger text-center my-1'>Your cart item</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr.no.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.cartArray.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{e.name}</td>
                                        <td>{e.brand}</td>
                                        <td>{e.price}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <th className='text-center' colSpan='3' >TOTAL</th>
                            <th>{totalPrice}</th>
                        </tr>
                    </tfoot>
                </table>
                <div className='d-flex justify-content-around  my-5 '>
                    <button className='btn btn-warning w-25 ' onClick={handlestructure}>Go back</button>
                    <button className='btn btn-success w-25'>Pay</button>
                </div>
            </div>
        </>
    )
}

export default Paypage
