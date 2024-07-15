import React, { useState } from 'react'

export default function GroupDetail({ GetData, NotAssignYet, Assign, HandleView, value, id, Name, TeacherCount, BookCount, StudentCount, HandleEdit, HandleDelete, Row }) {
    const [CheckAssign, setCheckAssign] = useState(NotAssignYet);
    return (
        <div>
            <div className="User-Detail-Container" style={{ border: "1px solid", borderTop: (Row ? "0px" : "1px solid") }}>
                <div className='h-100 d-flex'>
                    <div style={{ width: "10%", borderRight: "1px solid" }} className='h-100 d-flex justify-content-center align-items-center'>
                        <strong>
                            {value}
                        </strong>
                    </div>
                    <div style={{ width: "30%", borderRight: "1px solid" }} className='h-100 d-flex justify-content-center align-items-center'>
                        <strong  className='text-primary'>
                            {Name}
                        </strong>
                    </div>
                    <div role={HandleView && 'button'} onClick={() => {
                        if (HandleView) {
                            HandleView(id, "Teachers");
                        }
                    }} style={{ width: "15%", borderRight: "1px solid" }} className='h-100 d-flex justify-content-center align-items-center'>
                        <strong  className='text-primary'>
                            {TeacherCount}
                        </strong>
                    </div>
                    <div role={HandleView && 'button'} onClick={() => {
                        if (HandleView) {
                            HandleView(id, "Students");
                        }
                    }} style={{ width: "15%", borderRight: "1px solid" }} className='h-100 d-flex justify-content-center align-items-center'>
                        <strong  className='text-primary'>
                            {StudentCount}
                        </strong>
                    </div>
                    <div role={HandleView && 'button'} onClick={() => {
                        if (HandleView) {
                            HandleView(id, "Books");
                        }
                    }} style={{ width: "15%", borderRight: "1px solid" }} className='h-100 d-flex justify-content-center align-items-center'>
                        <strong  className='text-primary'>
                            {BookCount}
                        </strong>
                    </div>
                    {Row ?
                        <div className='ms-auto me-0 d-flex justify-content-center align-items-center p-3' style={{ width: "15%" }}>
                            {(Assign !== undefined && CheckAssign === false) &&
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-person-fill-check text-success" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                    </svg>
                                </div>}

                            {(Assign !== undefined && CheckAssign === true) &&
                                <div onClick={() => { Assign.HandleAssign(id, () => { setCheckAssign(false); GetData(); }) }} role='button'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-person-fill-add text-primary" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                    </svg>
                                </div>}
                            {Assign === undefined && <div className='d-flex'>
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
                            </div>}
                        </div>
                        : <div className='d-flex justify-content-center align-items-center' style={{ width: "15%" }}><strong  className='text-primary'>Action</strong></div>}
                </div>
            </div>
        </div >
    )
}
