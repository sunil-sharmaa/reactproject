import React, { useEffect, useState } from 'react'
import { GrClose } from "react-icons/gr";
import { BsCart } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";


const Homepage = (props) => {
  const navigate = useNavigate();
  const [productdata, setProductdata] = useState([])
  const [check, setCheck] = useState(true)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState([])
  const [rangeimg, setRangeimg] = useState([])
  const [rangevalue, setrangevalue] = useState()
  const [cartcount, setcartcount] = useState(0)

  const datarec = async () => {
    let jsondata = await fetch('http://localhost:3300');
    let dataobj = await jsondata.json();
    setProductdata(dataobj);
  }

  useEffect(() => {
    datarec();
  }, [])

  function handlechange(e) {
    setSearch((e.target.value));
  }

  function handleclick() {

    let searcharr = productdata.filter(element => {
      let nametrim = element.name.replaceAll(/\s/g, '')
      let name = nametrim.toLowerCase();
      let brand = element.brand.toLowerCase();
      let namebrand = name + brand;
      let searchspaceremove = search.replaceAll(/\s/g, '');
      console.log(name)
      return namebrand.includes(searchspaceremove.toLowerCase())
    })

    setCheck(false);
    setShow(searcharr)
    setRangeimg(searcharr)
  }

  function handleclose() {
    setCheck(true);
  }

  function handlerange(e) {
    setrangevalue(e.target.value);
    // console.log(e.target.value)
    let rangearr = show.filter(e => {
      return e.price <= rangevalue
    })
    setRangeimg(rangearr)
  }

  function handleaddtocart(e) {
    props.setcount(props.count + 1)
    props.setcartArray([...props.cartArray, e])
  }

  useEffect(() => {
    if (props.count >= 10) {
      setcartcount('9+')
    }
    else {
      setcartcount(props.count)
    }
  }, [props.count])

  function handleshowcartdata() {
    navigate('/Cartdata')
  }

  function handlelogout() {
    navigate('/')
  }

  return (
    <>
      <div className="container-fluid d-flex px-4 mb-4 py-4 bg-dark justify-content-between ">
        <h1 className='' style={{ backgroundImage: "linear-gradient(to left, yellow, green, white,yellow)", color: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Web Design</h1>

        <div className='d-flex w-75 justify-content-center '>

          <div className='d-flex w-50'>
            <input className="form-control w-75  me-3 border-primary" type="search" onChange={handlechange} placeholder="Search product..." aria-label="Search" />
            <button className="btn btn-outline-primary  w-25 " type="submit" onClick={handleclick}>Search </button>
          </div>

          <div className='text-center w-25'>
            <div className='position-relative m-auto text-light' style={{ width: 'fit-content' }}><button onClick={handleshowcartdata} className='btn fs-2 p-0 text-light '><BsCart /></button>cart
              <div className='position-absolute text-warning' style={{ left: '8px', top: '0' }} >{cartcount}</div>
            </div>
          </div>

        </div>

        <div className='my-auto d-flex justify-content-center align-items-center gap-2 '>
          <div className='fs-3 mt-0 d-flex align-items-center text-secondary'><FaRegCircleUser /></div>
          <button className='rounded p-2 ' onClick={handlelogout}>Logout</button>
        </div>
      </div>

      {check ?
        <div className='container d-flex flex-wrap gap-4 justify-content-center  '>
          {
            productdata.map((e, i) => {
              return (
                <div className='w-25 rounded border border-warning shadow text-center p-3' key={i}>
                  <img src={e.url} height={'100px'} alt="" />
                  <h4>Name:{e.name}</h4>
                  <h4>Brand:{e.brand}</h4>
                  <h4>Price:{e.price}</h4>
                  <button className='btn btn-primary ' onClick={() => handleaddtocart(e)}>Add to cart</button>
                </div>
              )
            })
          }
        </div>
        :

        show.length === 0
          ?
          <div>
            <div className='text-end container w-50'><p className='text-danger btn btn-light pt-0 my-1' onClick={handleclose}><GrClose /></p></div>
            <h1 className='container w-50 text-warning text-center my-2'><h1 className='text-danger d-inline-block '>404</h1> ITEM NOT FOUND !</h1>
          </div>
          :

          <div className='container d-flex flex-wrap gap-4 justify-content-center mb-3  '>
            <input type="range" min="400" max="1500" defaultValue="1500" onChange={handlerange} />
            <b>RS/-{rangevalue}</b>
            <div className='text-end w-100'><p className='text-light btn btn-secondary pt-0 my-1' onClick={handleclose}><GrClose /></p></div>

            {
              rangeimg.map((e, i) => {
                return (
                  <div className='w-25 rounded border border-primary text-center p-3' key={i}>
                    <img src={e.url} height={'100px'} alt="" />
                    <h4>Name:{e.name}</h4>
                    <h4>Brand:{e.brand}</h4>
                    <h4>Price:{e.price}</h4>
                    <button className='btn btn-primary ' onClick={() => handleaddtocart(e)}>Add to cart</button>
                  </div>
                )
              })
            }
          </div>
      }


      <div>
        <footer className="footer-section">
          <div className="container">
            <div className="footer-cta pt-2 pb-2 mt-5">
              <div className="row">
                <div className="col-xl-4 col-md-4 mb-30">
                  <div className="single-cta">
                    <i className="fas fa-map-marker-alt" />
                    <div className="cta-text">
                      <h4>Find us</h4>
                      <span>plot no.3 patel marg mansrover jaipur</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-30">
                  <div className="single-cta">
                    <i className="fas fa-phone" />
                    <div className="cta-text">
                      <h4>Call us</h4>
                      <span>91+9876543210</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-30">
                  <div className="single-cta">
                    <i className="far fa-envelope-open" />
                    <div className="cta-text">
                      <h4>Mail us</h4>
                      <span>Sks@info.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-content pt-3 pb-3">
              <div className="row">
                <div className="col-xl-4 col-lg-4 mb-50">
                  <div className="footer-widget">
                    <div className="footer-logo">
                      <a href="#">
                        <img
                          src="https://t3.ftcdn.net/jpg/02/20/98/96/360_F_220989602_EFK6efkAaIdyXMxy6toaAjCbSYu9SzSX.jpg"
                          className="img-fluid rounded " style={{ boxShadow: "0px 1px 15px rgba(255, 0, 0, 0.35)" }}

                          alt="logo"
                        />
                      </a>
                    </div>
                    <div className="footer-text">
                      <p>
                        Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed
                        do eiusmod tempor incididuntut consec tetur adipisicing
                        elit,Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                    <div className="footer-social-icon">
                      <span>Follow us</span>
                      <a href="#">
                        <i className="fab fa-facebook-f facebook-bg" />
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter twitter-bg" />
                      </a>
                      <a href="#">
                        <i className="fab fa-google-plus-g google-bg" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                  <div className="footer-widget">
                    <div className="footer-widget-heading">
                      <h3>Useful Links</h3>
                    </div>
                    <ul>
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">about</a>
                      </li>
                      <li>
                        <a href="#">services</a>
                      </li>
                      <li>
                        <a href="#">portfolio</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                      <li>
                        <a href="#">About us</a>
                      </li>
                      <li>
                        <a href="#">Our Services</a>
                      </li>
                      <li>
                        <a href="#">Expert Team</a>
                      </li>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                      <li>
                        <a href="#">Latest News</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                  <div className="footer-widget">
                    <div className="footer-widget-heading">
                      <h3>Subscribe</h3>
                    </div>
                    <div className="footer-text mb-25">
                      <p>
                        Don’t miss to subscribe to our new feeds, kindly fill the form
                        below.
                      </p>
                    </div>
                    <div className="subscribe-form">
                      <form action="#">
                        <input type="text" placeholder="Email Address" />
                        <button>
                          <i className="fab fa-telegram-plane" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-area">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                  <div className="copyright-text">
                    <p>
                      Copyright © 2023, All Right Reserved{" "}
                      <a href="#">Sunil</a>
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                  <div className="footer-menu">
                    <ul>
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Terms</a>
                      </li>
                      <li>
                        <a href="#">Privacy</a>
                      </li>
                      <li>
                        <a href="#">Policy</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>

    </>
  )
}

export default Homepage


