import React from 'react'
import { Badge, Card, CardBody, CardHeader } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperUser from '../../../Component/Swiper/SwiperUser';

export default function StudentSwiper({ Data }) {
    return (
        <>
            <Card className='border-0'>
                <CardHeader className='border-0 d-flex w-100 p-5 bg-white'>
                    <div>
                        <h1>Student <Badge>{Data.students.length}</Badge></h1>
                    </div>
                    <div className='ms-auto me-0'>
                        {Data.students.length > 4 &&
                            <div className='d-flex gap-2 gap-md-5'>
                                <div className='Swiper-Button' role='button'
                                    onClick={() => {
                                        const swiper = document.querySelector('#Student-Swiper').swiper;
                                        swiper.slidePrev(100);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                                    </svg>
                                </div>
                                <div className='Swiper-Button' role='button'
                                    onClick={() => {
                                        const swiper = document.querySelector('#Student-Swiper').swiper;
                                        swiper.slideNext(100);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                    </svg>
                                </div>
                            </div>}
                    </div>
                </CardHeader>
                <CardBody className='p-5' style={{ overflow: "hidden" }}>
                    <div>
                        {Data.students.length > 0 ? <Swiper
                            id='Student-Swiper'
                            spaceBetween={100}
                            slidesPerView={5}
                            loop={Data.students.length > 4 ? true : false}
                            className="mySwiper" style={{ overflow: "visible" }}>
                            {
                                Data.students.map((item, index) => {
                                    return (<SwiperSlide key={index}>
                                        <SwiperUser Data={item} />
                                    </SwiperSlide>)
                                })
                            }
                        </Swiper> :
                            <div>
                                <h1 className='text-center text-danger'>There are not any Student in Group {Data.name}</h1> :
                            </div>}
                    </div>
                </CardBody>
            </Card >
        </>
    )
}
