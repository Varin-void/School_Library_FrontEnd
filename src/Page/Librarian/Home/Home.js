import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Image, Row } from 'react-bootstrap'
import API from '../../../Ultils/API/API'
import { LIBRARIAN_GET_SUMMARY } from '../../../Ultils/API/URL';
import { useSelector } from 'react-redux';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';

export default function Home() {
  const token = useSelector(state => state.token);
  const [Data, setData] = useState({
    books: 0,
    downloadeds: 0,
    groups: 0,
    students: 0,
    teachers: 0
  });
  useEffect(() => {
    if (token !== "") {
      try {
        API.POST(LIBRARIAN_GET_SUMMARY, { "apiToken": token })
          .then(res => {
            setData({ ...res.data });
          })
          .catch(err => {
            DSweetAlert.ShowError(err);
          });
      } catch {
        DSweetAlert.ShowError("Internal Server Error");
      }
    }
  }, [token])
  return (
    <>
      <Card>
        <CardHeader className='text-center text-primary p-5'>
          <h1>HOME</h1>
        </CardHeader>
        <CardBody>
          <Row className='d-flex justify-content-center'>
            <Col md={12} lg={6} className='p-5'>
              <Card className='text-white border-5' style={{backgroundColor:"grey"}}>
                <CardHeader className='border-3 p-5 d-flex align-items-center position-relative'>
                  <div className='Home-Icon-Container'>
                    <Image src={"/Image/Teacher-Icon.png"} className='Home-Icon' />
                  </div>
                  <h3 className='text-end w-100'>Teachers</h3>
                </CardHeader>
                <CardBody className='ps-5 pt-4 pb-4'>
                  <h3>
                    {Data.teachers}
                  </h3>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={6} className='p-5'>
              <Card className='text-dark border-5' style={{ backgroundColor: "white" }}>
                <CardHeader className='border-3 p-5 d-flex align-items-center position-relative'>
                  <div className='Home-Icon-Container'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill  Home-Icon text-dark" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                  </div>
                  <h3 className='text-end w-100'>Students</h3>
                </CardHeader>
                <CardBody className='ps-5 pt-4 pb-4'>
                  <h3>
                    {Data.students}
                  </h3>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={6} className='p-5'>
              <Card className='text-white border-5' style={{ backgroundColor: "green" }}>
                <CardHeader className='border-3 p-5 d-flex align-items-center position-relative'>
                  <div className='Home-Icon-Container'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-collection Home-Icon text-dark" viewBox="0 0 16 16">
                      <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z" />
                    </svg>
                    {/* <Image src={"/Image/Teacher-Icon.png"} className='Home-Icon' /> */}
                  </div>
                  <h3 className='text-end w-100'>Groups</h3>
                </CardHeader>
                <CardBody className='ps-5 pt-4 pb-4'>
                  <h3>
                    {Data.groups}
                  </h3>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={6} className='p-5'>
              <Card className='text-white border-5' style={{ backgroundColor: "blue" }}>
                <CardHeader className='border-3 p-5 d-flex align-items-center position-relative'>
                  <div className='Home-Icon-Container'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-book Home-Icon text-dark" viewBox="0 0 16 16">
                      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                    </svg>
                    {/* <Image src={"/Image/Teacher-Icon.png"} className='Home-Icon' /> */}
                  </div>
                  <h3 className='text-end w-100'>Books</h3>
                </CardHeader>
                <CardBody className='ps-5 pt-4 pb-4'>
                  <h3>
                    {Data.books}
                  </h3>
                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={6} className='p-5'>
              <Card className='text-white border-5' style={{ backgroundColor: "red" }}>
                <CardHeader className='border-3 p-5 d-flex align-items-center position-relative'>
                  <div className='Home-Icon-Container'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor text-dark Home-Icon" className="bi bi-download Home-Icon" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    {/* <Image src={"/Image/Teacher-Icon.png"} className='Home-Icon' /> */}
                  </div>
                  <h3 className='text-end w-100'>Downloaded Books</h3>
                </CardHeader>
                <CardBody className='ps-5 pt-4 pb-4'>
                  <h3>
                    {Data.downloadeds}
                  </h3>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}
