import React, { useEffect, useState } from 'react'
import BookSwiper from '../../Teacher/Home/BookSwiper'
import { GROUP_GET_BY_ID } from '../../../Ultils/API/URL';
import API from '../../../Ultils/API/API';
import { useSelector } from 'react-redux';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import { Card, CardBody, CardHeader } from 'react-bootstrap';
import MLoading from '../../../Component/MLoading';

export default function StudentScreen() {
  const token = useSelector(state => state.token);
  const User = useSelector(state => state.User);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState({});
  useEffect(() => {
    if (token !== "") {
      if (User.group.length > 0) {
        try {
          setLoading(true);
          const Params = { apiToken: token, id: "" + User.group[0].id };
          API.POST(GROUP_GET_BY_ID, Params)
            .then(res => {
              setLoading(false);
              if (res.status === 1) {
                setData({ ...res.data });
              } else {
                DSweetAlert.ShowError(res.message);
              }
            })
            .catch(err => {
              setLoading(false);
              DSweetAlert.ShowError(err);
            });
        }
        catch {
          setLoading(false);
          DSweetAlert.ShowError("Internal Server Error");
        }
      }
    }
  }, [token, User])

  const GetData = () => {
    try {
      const Params = { apiToken: token, id: User.group[0].id };
      setLoading(true);
      API.POST(GROUP_GET_BY_ID, Params)
        .then(res => {
          setLoading(false);
          if (res.status === 1) {
            setData({ ...res.data });
          } else {
            DSweetAlert.ShowError(res.message);
          }
        })
        .catch(err => {
          setLoading(false);
          DSweetAlert.ShowError(err);
        });
    }
    catch {
      setLoading(false);
      DSweetAlert.ShowError("Internal Server Error");
    }
  }
  return (
    <>
      <Card className='R-Shadow'>
        <CardHeader className='text-center p-5'>
          <h1 className='text-primary'>
            {Data.name}
          </h1>
        </CardHeader>
        <CardBody>
          {
            Data.books !== undefined &&
            <BookSwiper GetData={GetData} Data={Data} IsTeacher={false} />
          }
        </CardBody>
      </Card>
      {Loading && <MLoading />}
    </>
  )
}
