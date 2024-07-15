import React from 'react'
import { Button, Card, CardFooter, CardHeader, CardTitle } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function SwiperGroup({ Data }) {
    const Navigate = useNavigate();
    return (
        <div>
            <Card>
                <CardHeader className='border-0 text-center text-primary p-5'>
                    <CardTitle>
                        <h1>
                            {Data.name}
                        </h1>
                    </CardTitle>
                </CardHeader>
                <CardFooter className='d-flex justify-content-center p-3'>
                    <Button onClick={() => { Navigate(`/Teacher/Group/${Data.id}`, { state: { id: Data.id } }) }}>
                        <strong>
                            VIEW
                        </strong>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
