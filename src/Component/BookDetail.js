import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import { Server } from '../Ultils/API/URL'
import PdfDetail from './PdfDetail'

export default function BookDetail({ GetData, InGroup, Assign, IsRow, pdf, value, imagePath, id, title, author, description, HandleEdit, HandleDelete }) {
    const [ModalShow, setModalShow] = useState(false);
    return (
        <div>
            <div className="User-Detail-Container" style={{ border: "1px solid", borderTop: (IsRow === false) ? "1px solid" : "" }}>
                <div className='h-100 d-flex'>
                    <div style={{ width: "5%", borderRight: "1px solid" }} className='h-100 d-flex justify-content-center align-items-center'>
                        <strong>
                            <span>
                                {value}
                            </span>
                        </strong>
                    </div>
                    <div className='h-100' style={{ width: "100px", borderRight: "1px solid" }} onClick={() => {
                        if (IsRow !== false) {
                            setModalShow(true);
                        }
                    }} role={IsRow === true ? 'button' : ""}>
                        {
                            IsRow === true ?
                                < Image src={Server + imagePath} className='h-100 object-fit-center' style={{ width: "100px", borderRight: "1px solid" }} />
                                : <div className='h-100 d-flex justify-content-center align-items-center' style={{ width: "100px" }}>
                                    <div className='text-center text-primary'>
                                        <strong>IMAGE</strong><br />
                                        <strong>PDF</strong>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className='d-flex justify-content-center align-items-center' style={{ width: "25%", borderRight: "1px solid", overflow: "hidden" }}>
                        <p className='text-primary p-0 m-0'><strong>{title}</strong></p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center' style={{ width: "15%", borderRight: "1px solid", overflow: "hidden" }}>
                        <p className='text-primary p-0 m-0'><strong>{author}</strong></p>
                    </div>
                    <div className={"d-flex justify-content-center align-items-center"} style={{ width: "40%", overflow: "hidden" }}>
                        <p className='text-primary p-0 m-0 M-Description text-center w-100' style={{overflow:"hidden"}}><strong>{description}</strong></p>
                    </div>
                    {IsRow === false ?
                        <div className='ms-auto me-0 d-flex justify-content-center align-items-center p-3' style={{ borderLeft: "1px solid", width: "15%" }}>
                            <strong className='text-primary'>Action</strong>
                        </div> :
                        <div className='ms-auto me-0 d-flex justify-content-center align-items-center p-3' style={{ borderLeft: "1px solid", width: "15%" }}>
                            {Assign ?
                                <div className='me-3' role={(!InGroup ? 'button' : "")} onClick={() => { if (!InGroup) Assign.HandleAssign(id, GetData) }}>
                                    {InGroup ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-bookmark-check-fill text-success" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-bookmark-plus-fill text-primary" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z" />
                                        </svg>
                                    }
                                </div> :
                                <>
                                    <div className='me-3' role='button' onClick={() => HandleEdit(id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-pencil-square text-primary" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </div>
                                    <div role='button' onClick={() => HandleDelete(id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-trash3-fill text-danger" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>

                                    </div>
                                </>}
                        </div>
                    }
                </div>
            </div>
            <PdfDetail isShow={ModalShow} onHide={() => { setModalShow(false); }} Title={title} pdf={pdf} />
        </div >
    )
}
