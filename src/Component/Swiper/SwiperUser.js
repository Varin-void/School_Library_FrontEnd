import React from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from 'react-bootstrap'
import { Server } from '../../Ultils/API/URL';

export default function SwiperUser(props) {
  const { Data, HandleRemoveUser } = props;
  return (
    <>
      <Card className='pb-0 p-3 rounded-5 M-Shadow-Box' style={{ width: "230px" }}>
        <CardHeader className='p-0 m-0 border-0 bg-white' >
          <Image src={Server + Data.image} style={{ objectFit: "cover", width: "200px", height: "200px", borderRadius: "50%" }} alt="Teacher Image" />
        </CardHeader>
        <CardBody className='p-0 m-0 d-flex justify-content-center align-items-center' style={{ borderTop: "1px solid", borderColor: "lightgrey" }}>
          <h5 className='text-primary mt-3'><strong>{Data.username}</strong></h5>
        </CardBody>
        {
          HandleRemoveUser &&
          <CardFooter className='bg-transparent d-flex justify-content-center align-items-center' onClick={() => { HandleRemoveUser(Data.id) }}>
            <Button className='bg-danger border-0'><strong>REMOVE</strong></Button>
          </CardFooter>
        }
      </Card>
    </>
  )
}