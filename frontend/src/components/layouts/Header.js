import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import {useDispatch, useSelector} from 'react-redux';
import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
import { logout } from '../../actions/userActions';


export default function Header () {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items:cartItems } = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
      dispatch(logout);
    }


    return (
    <nav className="navbar row wrap">
        <div className="col-12 col-md-2">
          <div className="navbar-brand">
            <Link to="/">
              <img  alt='JVLcart Logo' className='logo_main' width={110} height={40} src="/images/logo_amz.png" />
            </Link>
            </div>
        </div>
  
        <div className="col-12 col-md-4 mt-2 mt-md-0">
           <Search/>
        </div>
  
        <div className="col-12 col-md-6 mt-4 mt-md-0 pro text-center ">
          <div className='prof'>
          { isAuthenticated ? 
            (
             
              <Dropdown className='d-inline ' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                      <Image width="50px" src={user.avatar??'./images/default_avatar.png'}  />
                    </figure>
                    <span className='bla'>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'>Orders</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            )
          
          :
            <Link to="/login"  className="btn" id="login_btn">Login</Link>
           
          }
           </div>
           <Link to='/orders' className="pri">My Orders</Link>
           <Link  className="pri">Prime</Link>
          <Link to="/cart" className='prim'><span id="car" className="ml-3 sp">Cart</span><span className="ct ml-3" id="cart_count">{cartItems.length}</span></Link>
          
        </div>
    </nav>
    )
}