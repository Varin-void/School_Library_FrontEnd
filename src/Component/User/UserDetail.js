import React from 'react'
import { Image } from 'react-bootstrap'
import { Server } from '../../Ultils/API/URL'

export default function UserDetail({ HandleAssign, value, username, Role, id, imagePath, HandleEdit, HandleDelete }) {
    return (
        <div className="User-Detail-Container" style={{ border: "1px solid" }}>
            <div className='h-100 d-flex'>
                <div style={{ width: "95px", borderRight: "1px solid" }} className='h-100 d-flex justify-content-center align-items-center'>
                    <strong>
                        <span>
                            {value}
                        </span>
                    </strong>
                </div>
                <div className='h-100' style={{ borderRight: "1px solid" }}>
                    <Image src={Server + imagePath} className='h-100 object-fit-cover' style={{ width: "100px" }} />
                </div>
                <div className='ms-3 p-3 w-100 text-primary' role='button'>
                    <p className='p-0 m-0'><strong>ID : {id}</strong></p>
                    <p className='p-0 m-0'><strong>Username : {username}</strong></p>
                    <p className='p-0 m-0'><strong>Role : {Role}</strong></p>
                </div>
                <div className='ms-auto me-0 d-flex justify-content-center align-items-center p-3' style={{ borderLeft: "1px solid", width: "20%" }}>
                    {Role !== "Librarian" &&
                        <div className='me-3' role='button' onClick={() => HandleAssign(id, username, Role)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-people-fill text-success" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                            </svg>
                        </div>
                    }
                    <div className='me-3' role='button' onClick={() => HandleEdit(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-pencil-square text-primary" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                    </div>
                    {
                        HandleDelete &&
                        <div role='button' onClick={() => HandleDelete(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-trash3-fill text-danger" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
