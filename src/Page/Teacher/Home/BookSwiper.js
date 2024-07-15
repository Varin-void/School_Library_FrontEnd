import React, { useState } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import ModalAddBook from './ModalAddBook';
import SwiperBook from '../../../Component/Swiper/SwiperBook';
import ModalExistBook from './ModalExistBook';
import API from '../../../Ultils/API/API';
import { BOOK_REASSIGN_GROUP } from '../../../Ultils/API/URL';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import { useSelector } from 'react-redux';

export default function BookSwiper({ IsTeacher, GetData, Data }) {
    const [AddNewBookModal, setAddNewBookModal] = useState(false);
    const [AddExistBook, setAddExistBook] = useState(false);
    const token = useSelector(state => state.token);
    const role = useSelector(state => state.role);
    const HandleRemoveBook = (bookId) => {
        DSweetAlert.ShowConfirm("You are about to remove this Books from this Groups", () => {
            const Params = {
                "apiToken": token,
                "bookId": "" + bookId,
                "groupId": "" + Data.id
            };
            API.POST(BOOK_REASSIGN_GROUP, Params)
                .then(res => {
                    if (res.status === 1) {
                        DSweetAlert.ShowSuccess(res.message, () => {
                            GetData();
                        });
                    } else {
                        DSweetAlert.ShowError(res.message);
                    }
                })
                .catch(error => {
                    DSweetAlert.ShowError(error);
                })
        });
    }

    return (
        <>
            <Card className='border-0' style={{ width: "100%" }}>
                <CardHeader className='d-flex w-100 p-5 bg-white border-0'>
                    <div>
                        <h1>Book <Badge>{Data.books.length}</Badge></h1>
                    </div>
                    <div className='ms-auto me-0'>
                        {
                            Data.books.length > 4 &&
                            <div className='d-flex gap-2 gap-md-5'>
                                <div className='Swiper-Button' role='button'
                                    onClick={() => {
                                        const swiper = document.querySelector('#Book-Swiper').swiper;
                                        swiper.slidePrev(100);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                                    </svg>
                                </div>
                                <div className='Swiper-Button' role='button'
                                    onClick={() => {
                                        const swiper = document.querySelector('#Book-Swiper').swiper;
                                        swiper.slideNext(100);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>
                </CardHeader>
                <CardBody className='p-5 border-0' style={{ overflow: "hidden" }}>
                    <div>
                        {
                            Data.books.length > 0 ?
                                <Swiper
                                    id='Book-Swiper'
                                    spaceBetween={150}
                                    loop={Data.books.length > 4 ? true : false}
                                    className="mySwiper"
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                            spaceBetween: 50
                                        },
                                        480: {
                                            slidesPerView: 1,
                                            spaceBetween: 150
                                        },
                                        690: {
                                            slidesPerView: 2,
                                            spaceBetween: 100
                                        },
                                        1100: {
                                            slidesPerView: 3,
                                            spaceBetween: 100
                                        },
                                        1500: {
                                            slidesPerView: 4,
                                            spaceBetween: 100
                                        }
                                    }}
                                    style={{ overflow: "visible" }}>
                                    {
                                        Data.books.map((item, index) => {
                                            return (<SwiperSlide key={index}>
                                                <SwiperBook Data={item} HandleRemoveBook={(role === "Teacher") ? HandleRemoveBook : false} />
                                            </SwiperSlide>)
                                        })
                                    }
                                </Swiper> :
                                <div>
                                    <h1 className='text-center text-danger'>There aren`t any Book  in Group {Data.name}</h1> :
                                </div>
                        }
                    </div>
                </CardBody>
                {IsTeacher &&
                    <CardFooter className='border-0 bg-white d-flex justify-content-around p-5'>
                        <Button size='lg' onClick={() => { setAddNewBookModal(true) }}>
                            <strong>ADD New</strong>
                        </Button>
                        <Button size='lg' onClick={() => { setAddExistBook(true); }}>
                            <strong>Assign Book</strong>
                        </Button>
                    </CardFooter>
                }
            </Card >
            <ModalAddBook Data={Data} GetData={() => GetData()} show={AddNewBookModal} onHide={() => { setAddNewBookModal(false) }} />
            <ModalExistBook Data={Data} GetData={() => GetData()} Show={AddExistBook} onHide={() => { setAddExistBook(false); }} />
        </>
    )
}
