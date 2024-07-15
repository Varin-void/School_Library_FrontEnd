import React, { useState } from 'react'
import { Badge, Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import API from '../../Ultils/API/API';
import { GROUP_GET_BY_ID, USER_REASSIGN_GROUP } from '../../Ultils/API/URL';
import { DSweetAlert } from '../Alert/DSweetAlert';
import MLoading from '../MLoading';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperUser from '../Swiper/SwiperUser';
import SwiperBook from '../Swiper/SwiperBook';

export default function ViewObjectModel(props) {
    const [Loading, setLoading] = useState(false);
    const token = useSelector(state => state.token);
    const { ViewDataModal } = props;
    const { ID, Type } = ViewDataModal;
    const [Data, setData] = useState([]);
    const [Name, setName] = useState();
    const HandleRemoveUser = (userId) => {
        DSweetAlert.ShowConfirm("You are want about to remove this user from this group!", () => {
            try {
                const Params = {
                    apiToken: token,
                    userId: "" + userId,
                    groupId: "" + ID
                };
                API.POST(USER_REASSIGN_GROUP, Params)
                    .then(res => {
                        if (res.status === 1) {
                            DSweetAlert.ShowSuccess(res.message, () => {
                                GetData();
                            })
                        } else {
                            DSweetAlert.ShowError(res.message);
                        }
                    })
                    .catch(err => {
                        DSweetAlert.ShowError(err);
                    });
            }
            catch {
                DSweetAlert.ShowError("Internal Server Error");
            }
        });
    }
    const GetData = () => {
        if (ID !== "" && token !== "") {
            const params = {
                "apiToken": token,
                "id": ID
            }
            try {
                setLoading(true);
                API.POST(GROUP_GET_BY_ID, params)
                    .then(res => {
                        setLoading(false);
                        if (res.status === 1) {
                            setData([...res.data[Type.toLowerCase()]]);
                            setName(res.data.name);
                        } else {
                            DSweetAlert.ShowError(res.message);
                        }
                    }).catch(err => {
                        setLoading(false);
                        DSweetAlert.ShowError(err);
                    });
            }
            catch {
                setLoading(false);
                DSweetAlert.ShowError("Internal Server Error!");
            }
        }
    }
    return (
        <>
            <Modal
                onShow={() => GetData()}
                show={props.show}
                onHide={props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='w-100 bg-white'>
                    <Modal.Title id="contained-modal-title-vcenter" className='w-100 d-flex'>
                        <div className='p-3'>
                            <h4 className='text-warning'>
                                <strong>
                                    {Type}
                                </strong>
                                <Badge className='ms-3'>{Data.length}</Badge>
                            </h4>
                            <h2 className='text-primary'>
                                <strong>
                                    Group&nbsp;
                                    {Name}
                                </strong>
                            </h2>
                        </div>
                        <div className='me-3 ms-auto'>
                            {
                                Data.length <= 3 ? "" :
                                    <div className='d-flex me-4 mt-4 ms-auto gap-2 gap-md-5'>
                                        <div className='Swiper-Button' role='button'
                                            onClick={() => {
                                                const swiper = document.querySelector('.swiper').swiper;
                                                swiper.slidePrev(100);
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                                            </svg>
                                        </div>
                                        <div className='Swiper-Button' role='button'
                                            onClick={() => {
                                                const swiper = document.querySelector('.swiper').swiper;
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
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        Data.length <= 0 ? <h1 className='text-center text-danger'>There aren`t any {Type} in Group {Name}</h1> :
                            <div className='p-5' style={{ overflow: "hidden" }}>
                                <Swiper spaceBetween={100}
                                    slidesPerView={3}
                                    loop={Data.length > 3 ? true : false}
                                    className="mySwiper" style={{ overflow: "visible" }}>
                                    {
                                        Data.map((item, index) => {
                                            return (<SwiperSlide key={index}>
                                                {Type === "Teachers" || Type === "Students" ?
                                                    <SwiperUser Data={item} HandleRemoveUser={HandleRemoveUser}></SwiperUser>
                                                    : <SwiperBook Data={item}/>}
                                            </SwiperSlide>)
                                        })
                                    }
                                </Swiper>
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer className='bg-white d-flex justify-content-center' onClick={() => { props.onHide() }}>
                    <Button>
                        <span>
                            <strong>
                                CLOSE
                            </strong>
                        </span>
                    </Button>
                </Modal.Footer>
                <div>
                    {Loading && <MLoading />}
                </div>
            </Modal >

        </>
    )
}
