import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import API from '../../../Ultils/API/API';
import { GROUP_GET_BY_ID } from '../../../Ultils/API/URL';
import { useSelector } from 'react-redux';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import StudentSwiper from './StudentSwiper';
import BookSwiper from './BookSwiper';

export default function GroupDetail() {
    const token = useSelector(state => state.token);
    const Location = useLocation();
    const [Data, setData] = useState({});
    useEffect(() => {
        if (Location.state !== null) {
            try {
                API.POST(GROUP_GET_BY_ID, { apiToken: token, id: "" + Location.state.id })
                    .then(res => {
                        if (res.status === 1) {
                            setData({ ...res.data });
                        }
                    })
                    .catch(err => {
                        DSweetAlert.ShowError(err);
                    });
            }
            catch {
                DSweetAlert.ShowError("Internal Server Error");
            }
        }
    }, [Location, token])
    const GetData = () => {
        try {
            API.POST(GROUP_GET_BY_ID, { apiToken: token, id: "" + Location.state.id })
                .then(res => {
                    if (res.status === 1) {
                        setData({ ...res.data });
                    }
                })
                .catch(err => {
                    DSweetAlert.ShowError(err);
                });
        }
        catch {
            DSweetAlert.ShowError("Internal Server Error");
        }
    }
    return (
        <div className='R-Shadow'>
            <Card>
                <CardHeader className='bg-white'>
                    <CardTitle className='p-5 bg-white'>
                        <h1 className='text-primary text-center'>
                            <strong>{Data.name}</strong>
                        </h1>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div>
                        {
                            Data.students !== undefined &&
                            <StudentSwiper Data={Data} />
                        }
                    </div>
                    <div className='mt-5'>
                        {
                            Data.books !== undefined &&
                            <BookSwiper GetData={GetData} Data={Data} IsTeacher={true} />
                        }
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
