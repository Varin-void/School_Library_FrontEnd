import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import SwiperGroup from '../../../Component/Swiper/SwiperGroup';

export default function Home() {
  const User = useSelector(state => state.User);
  return (
    <div className='R-Shadow'>
      <Card>
        <CardHeader className='text-center text-primary p-5'>
          <h2>Home</h2>
        </CardHeader>
        <CardBody className='p-5'>
          {
            User.group.length > 0 ? 
            <>
              <div className='text-primary'>
                <h1>Your Current Group</h1>
              </div>
              <Row className='mt-5'>
                {User.group.map((item, index) => {
                  return <Col key={item.id} lg={4} md={6} className={index > 2 ? 'mt-5' : ""}>
                    <SwiperGroup Data={item} />
                  </Col>
                })}
              </Row>
            </> : <h1 className='text-center text-primary'>You are not in any Group</h1>
          }
      </CardBody>
    </Card>
    </div >
  )
}
