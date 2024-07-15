import React, { useState } from 'react'
import API from '../../Ultils/API/API';
import { LOGIN_URL } from '../../Ultils/API/URL';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Image, Row } from 'react-bootstrap';
import CheckError from '../../Ultils/API/CheckError';
import { useNavigate } from 'react-router-dom';
import MLoading from '../../Component/MLoading';
import { store } from '../../Ultils/Redux/Store';
import { setCookie } from '../../Ultils/Cookie';
import { DSweetAlert } from '../../Component/Alert/DSweetAlert';
import { Input } from 'antd';
export default function Login() {
    const Navigate = useNavigate();
    const [Validated, setValidated] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [User, setUser] = useState({
        Username: "",
        Password: ""
    });
    const HandleChange = (event) => {
        setUser({ ...User, [event.target.name]: event.target.value });
    }
    const HandleSubmit = () => {
        try {
            if (CheckError([User.Password, User.Username]) > 0) {
                setValidated(true);
                return false;
            }
            setValidated(false);
            const param = {
                "username": User.Username,
                "password": User.Password
            };
            setLoading(true);
            API.POST(LOGIN_URL, param)
                .then(res => {
                    setLoading(false);
                    if (res.status === 1) {
                        store.dispatch({
                            type: "SET-TOKEN",
                            payload: res.token
                        });
                        setCookie(res.token);
                        var Role = res.data.role;
                        // Navigate(`/${Role.name}/Home`);
                        if (Role.name === "Librarian") {
                            Navigate(`/Librarian/Home`);
                        } else if (Role.name === "Teacher") {
                            Navigate(`/Teacher/Home`, { state: { id: res.data.id } });
                        } else if (Role.name === "Student") {
                            Navigate(`/Student/Home`, { state: { id: res.data.id } });
                        }
                    } else {
                        DSweetAlert.ShowError(res.message);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    DSweetAlert.ShowError(error);
                });
        } catch {
            setLoading(false);
            DSweetAlert.ShowError("Internal Server Error");
        }
    }
    return (
        <Form>

            <Row className='L-Row-Parent min-vh-100 w-100'>
                <Col lg={4} className='bg-primary'>
                    <div className='L-Padding-Left h-100'>
                        <Card className='p-5 bg-primary h-100 L-Shadow-Left rounded-0 border-0'>
                            <CardBody>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <div className='h-100'>
                                        <Image src='/Image/IT-Step-Logo.png' className='p-5'>

                                        </Image>
                                        <div className='text-white'>
                                            <h2 className='text-center'>IT STEP ACADEMY</h2>
                                            <p className='text-center L-Font'>We are here to study and work</p>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
                <Col lg={8}>
                    <div className='L-Padding-Right h-100'>
                        <Card className='p-5 bg-white h-100 L-Shadow-Right  rounded-0  border-0'>
                            <CardHeader className='border-0 bg-white'>
                                <h1 className='fw-bold text-center text-primary L-Header-Font'>
                                    LOGIN
                                </h1>
                            </CardHeader>
                            <CardBody>
                                <div className='h-100'>
                                    <div className='w-100'>
                                        <div className='w-100'>
                                            <label className='p-3 ps-0 fw-bold text-primary'>Username&nbsp; <span className='text-danger'>{(Validated && User.Username === "") && "Please enter your username"}</span></label>
                                            {/* <input className='form-control p-3' type='text' autoComplete='off' placeholder='Enter your username' name='Username' value={User.Username} onChange={HandleChange} /> */}
                                            <Input onPressEnter={() => HandleSubmit()} className='p-3' type='text' autoComplete='off' placeholder='Enter your username' name='Username' value={User.Username} onChange={HandleChange} />
                                        </div>
                                        <div className='w-100'>
                                            <label className='p-3 ps-0 fw-bold text-primary'>Password&nbsp; <span className='text-danger'>{(Validated && User.Password === "") && "Please enter your password"}</span></label>
                                            {/* <input className='form-control p-3' autoComplete='new-password' type='password' placeholder='Enter your password' name='Password' value={User.Password} onChange={HandleChange} /> */}
                                            <Input onPressEnter={() => HandleSubmit()} className='p-3' autoComplete='new-password' type='password' placeholder='Enter your password' name='Password' value={User.Password} onChange={HandleChange} />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter className='d-flex justify-content-center border-0 bg-white'>
                                <Button onClick={HandleSubmit} size='lg' className='w-100 p-2'><strong>LOGIN</strong></Button>
                            </CardFooter>
                        </Card>
                    </div>
                </Col>
            </Row>
            {Loading && <MLoading />}
        </Form>
    )
}
