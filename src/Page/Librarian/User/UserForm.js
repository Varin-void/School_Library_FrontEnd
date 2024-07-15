import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Dropdown, Form, FormLabel, Row, SplitButton } from 'react-bootstrap'
import API from '../../../Ultils/API/API';
import { Server, USER_CREATE, USER_GET_BY_ID, USER_UPDATE } from '../../../Ultils/API/URL';
import { useSelector } from 'react-redux';
import CheckError from '../../../Ultils/API/CheckError';
import ImageInput from '../../../Component/ImageInput';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import MLoading from '../../../Component/MLoading';
import { setPreview } from '../../../Ultils/ImagePreview';

export default function LibrarianScreenForm() {
    const Token = useSelector(state => state.token);
    const Navigate = useNavigate();
    const Location = useLocation();
    const [Loading, setLoading] = useState(false);
    const [Validated, setValidated] = useState(false);
    const [Picked_Image, setPicked_Image] = useState("");
    const [ComboBoxTitle, setComboBoxTitle] = useState("Choose Role :");
    const [Data, setData] = useState({
        Username: "",
        Password: "",
        ConfirmPassword: "",
        Image: {},
        RoleId: "",
    });
    const Input = [
        {
            0: {
                label: "Username",
                id: 4,
                feedback: "Please Input an Username"
            },
            1: {
                autoComplete: "off",
                type: "text",
                placeholder: "Username",
                name: "Username",
                required: true
            }
        },
        {
            0: {
                label: "Password",
                id: 2,
                feedback: "Please Input an Password"
            },
            1: {
                autoComplete: "new-password",
                type: "password",
                placeholder: "Password",
                name: "Password",
                required: true
            }
        },
        {
            0: {
                label: "Confirm Password",
                id: 3,
                feedback: "Please Input an Confirm Password"
            },
            1: {
                autoComplete: "new-password",
                type: "password",
                placeholder: "Confirm Password",
                name: "ConfirmPassword",
                required: true
            }
        },
        {
            0: {
                label: "Role",
                id: 5,
                feedback: "Please Pick an Role",
                ComboBox: true,
                Option: [
                    {
                        label: "Librarian",
                        id: 1
                    },
                    {
                        label: "Teacher",
                        id: 2
                    },
                    {
                        label: "Student",
                        id: 3
                    }]
            },
            1: {
                title: "Role",
                name: "RoleId",
                required: true
            }
        }
    ]
    const Image_Input =
    {
        0: {
            label: "Image",
            size: 6,
            id: 1,
            feedback: "Please Choose an Image"
        },
        1: {
            type: "file",
            name: "Image",
            required: true
        }
    }

    useEffect(() => {
        if (Location.state !== null) {
            try {
                setLoading(true);
                if (Location.state.userId !== undefined) {
                    const params = {
                        id: Location.state.userId,
                        apiToken: Token
                    };
                    API.POST(USER_GET_BY_ID, params)
                        .then(res => {
                            setLoading(false);
                            setPicked_Image(Server + res.user.imagePath);
                            setData({
                                Username: res.user.username,
                                Password: res.user.password,
                                ConfirmPassword: res.user.password,
                                Image: {},
                                RoleId: res.user.role.id,
                            });
                            setComboBoxTitle(res.user.role.name);
                        })
                        .catch(err => {
                            setLoading(false);
                            DSweetAlert.ShowError(err);
                        });
                }
            }
            catch {
                setLoading(false);
                DSweetAlert.ShowError("Internal Server Error");
            }
        }
    }, [Location, Token])

    const HandleSubmit = () => {
        try {
            if (CheckError([Data.Username, Data.Password, Data.ConfirmPassword, Data.RoleId, Picked_Image]) > 0) {
                setValidated(true);
                return false;
            }
            setValidated(false);
            setLoading(true);
            const formData = new FormData();
            formData.append("username", Data.Username);
            formData.append("password", Data.Password);
            formData.append("confirmPassword", Data.ConfirmPassword);
            formData.append("apiToken", Token);
            formData.append("roleId", Data.RoleId);

            if (Location.state === null) {
                formData.append("image", Data.Image);
                API.POST_FORM_DATA(USER_CREATE, formData)
                    .then(res => {
                        setLoading(false);
                        if (res.status === 1) {
                            DSweetAlert.ShowSuccess(res.message, () => {
                                Navigate("/Librarian/User");
                            });
                        } else {
                            DSweetAlert.ShowError(res.message);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        DSweetAlert.ShowError(err)
                    });
            } else {
                if (Location.state.userId !== undefined) {
                    if (!Picked_Image.includes(Server)) {
                        formData.append("image", Data.Image);
                    } else {
                        formData.append("image", null);
                    }
                    formData.append("id", Location.state.userId);
                    API.POST_FORM_DATA(USER_UPDATE, formData)
                        .then(res => {
                            setLoading(false);
                            if (res.status === 1) {
                                DSweetAlert.ShowSuccess(res.message, () => {
                                    Navigate("/Librarian/User");
                                });
                            } else {
                                DSweetAlert.ShowError(res.message);
                            }
                        })
                        .catch(error => {
                            setLoading(false);
                            DSweetAlert.ShowError(error);
                        });
                }
            }
        } catch {
            setLoading(false);
            DSweetAlert.ShowError("Internal Server Error");
        }
    }

    const HandleonChange = (event) => {
        if (event.target.name === "Image") {
            if (event.target.files[0] !== undefined) {
                setData({ ...Data, [event.target.name]: event.target.files[0] })
                setPreview(event.target.files[0], setPicked_Image);
            }
        } else
            setData({ ...Data, [event.target.name]: event.target.value })
    }
    return (
        <div className="R-Shadow">
            <Form onSubmit={HandleSubmit} method='post'>
                <Card className='p-3'>
                    <CardHeader className='text-center text-primary bg-white'>
                        <h2>
                            USER FORM
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col lg={4} md={12} className='mt-lg-3 mt-5'>
                                <ImageInput Validated={Validated} HandleonChange={HandleonChange} Image_Input={Image_Input} Picked_Image={Picked_Image} />
                            </Col>
                            <Col lg={8} md={12}>
                                <Row>
                                    {Input.map((item, index) => {
                                        return <Col key={item[0].id} md={12} className={'mt-lg-3 ' + (index === 0 ? 'mt-5' : "mt-3")} >
                                            <FormLabel className='d-block'>{item[0].label} {item[1].required && <span className='text-danger'>* {(Validated && Data[item[1].name] === "") && item[0].feedback}</span>}</FormLabel>
                                            {
                                                item[0].ComboBox ?
                                                    <SplitButton title={ComboBoxTitle} className='w-100'>
                                                        {item[0].Option.map((child) => {
                                                            return <Dropdown.Item key={child.id} onClick={() => { setData({ ...Data, [item[1].name]: child.id }); setComboBoxTitle(child.label); }} eventKey={child.id}>{child.label}</Dropdown.Item>
                                                        })}
                                                    </SplitButton> :
                                                    <Form.Control {...item[1]} value={Data[item[1].name]} onChange={HandleonChange} />
                                            }
                                        </Col>
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className='d-flex justify-content-center bg-white border-0 mt-3'>
                        <Button size='lg' onClick={HandleSubmit}>
                            <strong>
                                SUBMIT
                            </strong>
                        </Button>
                    </CardFooter>
                </Card>
            </Form >
            {Loading && <MLoading />
            }
        </div >
    )
}
