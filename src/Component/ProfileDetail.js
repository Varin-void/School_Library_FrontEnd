import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Image, Row } from 'react-bootstrap'
import { Server } from '../Ultils/API/URL'
import ChangePassword from './ChangePassword';

export default function ProfileDetail({ Data }) {
  const [ModalShow, setModalShow] = useState(false);
  const HandleChangePassword = () => {
    setModalShow(true);
  }
  return (
    <>
      <Card>
        <CardHeader className='d-flex justify-content-center p-3'>
          <div>
            <h2 className='w-100 text-center text-primary'>PROFILE</h2>
          </div>
          <svg onClick={() => { HandleChangePassword() }} role='button' xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="currentColor"
            className="bi bi-pencil-square text-danger position-absolute" style={{ right: "20" }} viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </CardHeader>
        <CardBody className='p-5'>
          <div>
            <Row>
              <Col lg={5} sm={12} className='d-flex justify-content-center align-items-center'>
                <Image src={(Data.imagePath !== "") ? (Server + Data.imagePath) : ""} style={{ objectFit: "cover", width: "100%", maxWidth: "500px", maxHeight: "500px", borderRadius: "50%" }}>
                </Image>
              </Col>
              <Col lg={7} sm={12} className='mt-5 mt-lg-0 d-flex justify-content-center justify-content-lg-start align-items-lg-center'>
                <div className='ms-3'>
                  <h2>ID : <span className='text-primary'>{Data.id}</span> </h2>
                  <h2 className='mt-3'>Username : <span className='text-primary'>{Data.username}</span> </h2>
                  <h2 className='mt-3'>Role : <span className='text-primary'>{Data.role.name}</span> </h2>
                  {(Data.role.name !== "Librarian") && <h2 className='mt-3'>Group <div className='text-primary mt-3'>{Data.group.length === 0 ? "You are not in any group" : Data.group.map((item, index) => { return <div key={index}>{item.name}</div> })}</div> </h2>}
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
      <ChangePassword Data={Data} show={ModalShow} onHide={() => { setModalShow(false); }} />
    </>
  )
}
