import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import  {toast} from 'react-toastify';

import s1 from '../images/s1.jpg'
import s2 from '../images/s2.jpg'
import s3 from '../images/s3.jpg'
import s4 from '../images/s4.jpg'
import s5 from '../images/s5.jpg'
import s6 from '../images/s6.jpg'
import Page from 'react-js-pagination'
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
export  default function Home(){
    const dispatch = useDispatch();
    const {products, loading, error, productsCount, resPerPage} =    useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);
 
    const setCurrentPageNo = (pageNo) =>{

        setCurrentPage(pageNo)
       
    }

    useEffect(()=>{
        if(error) {
            return toast.error(error,{
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(null, null, null, null, currentPage)) 
    }, [error, dispatch, currentPage])


    return (
        <Fragment>
            <MetaData title="Home"/>
  <div className="swip">
<Swiper  
            modules={[Pagination]}
            spaceBetween={2}
            slidesPerView={3}
        
           
            autoplay={true}
            pagination={{ clickable: true }}>
            
                <SwiperSlide >
                  <div className="testImg" >
                    <img src={s1} alt="avatar" className='sli'/>
                  </div>
                </SwiperSlide>
        
             
              <SwiperSlide>
              <div className="testImg">
                <img src={s2} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>

              <SwiperSlide>
              <div className="testImg">
                <img src={s3} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="testImg">
                <img src={s4} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="testImg">
                <img src={s5} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
              <SwiperSlide>
              <div className="testImg">
                <img src={s6} alt="avatar" className='sli'/>
              </div>
              </SwiperSlide>
              
         </Swiper>
         </div>
            {loading ? <Loader/>:
                <Fragment>
                  
            
                    <section id="products" className="container-fluid mt-1 ">

                  
        

                        <div className="row brd">
                            { products && products.map(product => (
                                <Product key={product._id}  product={product}/>
                            ))}
                        
                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resPerPage?
                    <div className="d-flex justify-content-center mt-5">
                           <Page
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                           />     
                    </div> : null }
                </Fragment>
           }
        </Fragment>
    )
}