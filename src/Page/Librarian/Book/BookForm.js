import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormLabel, Row } from 'react-bootstrap'
import ImageInput from '../../../Component/ImageInput'
import { setPreview } from '../../../Ultils/ImagePreview';
import CheckError from '../../../Ultils/API/CheckError';
import PdfInput from '../../../Component/PdfInput';
import { useSelector } from 'react-redux';
import API from '../../../Ultils/API/API';
import { BOOK_CREATE, BOOK_GET_BY_ID, BOOK_UPDATE, Server } from '../../../Ultils/API/URL';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import MLoading from '../../../Component/MLoading';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookForm() {
    const Navigate = useNavigate();
    const location = useLocation();
    const token = useSelector(state => state.token);
    const [Picked_Image, setPicked_Image] = useState("");
    const [Picked_PDF, setPicked_PDF] = useState("");
    const [Loading, setLoading] = useState(false);
    const [Validated, setValidated] = useState(false);
    const [Data, setData] = useState({
        title: "",
        author: "",
        description: "",
        image: {},
        pdf: {}
    });
    const Input = [
        {
            0: {
                label: "Title",
                id: 0,
                feedback: "Please Input an Title"
            },
            1: {
                autoComplete: "off",
                type: "text",
                placeholder: "Title",
                name: "title",
                required: true
            }
        },
        {
            0: {
                label: "Author",
                id: 1,
                feedback: "Please Input an Author"
            },
            1: {
                autoComplete: "off",
                type: "text",
                placeholder: "Author",
                name: "author",
                required: true
            }
        },
        {
            0: {
                label: "Description",
                id: 2,
                textarea: true,
                feedback: "Please Input an Description"
            },
            1: {
                as: "textarea",
                rows: 2,
                autoComplete: "off",
                type: "text",
                placeholder: "Description here...",
                name: "description",
                required: true
            }
        },
        {
            0: {
                label: "PDF",
                size: 6,
                id: 3,
                feedback: "Please Choose an PDF File"
            },
            1: {
                type: "file",
                name: "pdf",
                required: true
            }
        },
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
            placeholder: "Image",
            name: "image",
            required: true
        }
    }

    useEffect(() => {
        if (location.state !== null) {
            if (location.state.id !== undefined) {
                try {
                    const Params = {
                        apiToken: token,
                        id: "" + location.state.id
                    };
                    setLoading(true);
                    API.POST(BOOK_GET_BY_ID, Params)
                        .then(res => {
                            setLoading(false);
                            setPicked_Image(Server + res.data.imagePath);
                            setPicked_PDF(res.data.pdf.split('PDF/')[1]);
                            setData({
                                title: res.data.title,
                                author: res.data.author,
                                description: res.data.description,
                                image: {},
                                pdf: {}
                            });
                        })
                        .catch(err => {
                            setLoading(false);
                            DSweetAlert.ShowError(err);
                        });
                } catch {
                    setLoading(false);
                    DSweetAlert.ShowError("Internal Server Error");
                }
            }
        }
    }, [location, token])

    const HandleSubmit = () => {
        if (CheckError([token, Data.title, Data.author, Data.description, Picked_Image, Picked_PDF]) > 0) {
            setValidated(true);
            return false;
        }
        setValidated(false);
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", Data.title);
            formData.append("author", Data.author);
            formData.append("description", Data.description);
            formData.append("apiToken", token);
            if (location.state === null) {
                formData.append("image", Data.image);
                formData.append("pdf", Data.pdf);
                API.POST_FORM_DATA(BOOK_CREATE, formData)
                    .then(res => {
                        setLoading(false);
                        if (res.status === 1) {
                            DSweetAlert.ShowSuccess(res.message, () => {
                                Navigate('/Librarian/Book');
                            });
                        } else {
                            DSweetAlert.ShowError(res.message);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        DSweetAlert.ShowError(err);
                    });
            }
            else {
                if (location.state.id !== undefined) {
                    if (Data.image.name !== undefined) {
                        formData.append("image", Data.image);
                    } else
                        formData.append("image", null);

                    if (Data.pdf.name !== undefined) {
                        formData.append("pdf", Data.pdf);
                    } else
                        formData.append("pdf", null);
                    formData.append("id", location.state.id);
                    API.POST_FORM_DATA(BOOK_UPDATE, formData)
                        .then(res => {
                            setLoading(false);
                            if (res.status === 1) {
                                DSweetAlert.ShowSuccess(res.message, () => {
                                    Navigate('/Librarian/Book');
                                });
                            } else {
                                DSweetAlert.ShowError(res.message);
                            }
                        })
                        .catch(err => {
                            setLoading(false);
                            DSweetAlert.ShowError(err);
                        });
                }
            }
        }
        catch {
            setLoading(false);
            DSweetAlert.ShowError("Internal Server Error");
        }
    }
    const HandleonChange = (event) => {
        if (event.target.name === "image") {
            if (event.target.files[0] !== undefined) {
                setData({ ...Data, [event.target.name]: event.target.files[0] });
                setPreview(event.target.files[0], setPicked_Image);
            }
        } else if (event.target.name === "pdf") {
            if (event.target.files[0] !== undefined) {
                setPicked_PDF(event.target.files[0].name);
                setData({ ...Data, [event.target.name]: event.target.files[0] });
            }
        } else {
            setData({ ...Data, [event.target.name]: event.target.value });
        }
    }
    return (
        <div className='R-Shadow'>
            <Form method='post'>
                <Card className="p-3">
                    <CardHeader className='bg-white text-center text-primary'>
                        <h2>
                            BOOK FORM
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
                                        return (
                                            <Col md={12} key={item[0].id} className={'mt-lg-3 ' + (index === 0 ? 'mt-5' : "mt-3")}>
                                                <FormLabel className='d-block'>{item[0].label} {item[1].required && <span className='text-danger'>* {(Validated && Data[item[1].name] === "") && item[0].feedback}</span>}</FormLabel>
                                                {item[1].name === "pdf" ?
                                                    <PdfInput Picked_PDF={Picked_PDF} Validated={Validated} item={item[1]} HandleonChange={HandleonChange} /> :
                                                    <Form.Control {...item[1]} value={Data[item[1].name]} onChange={HandleonChange} style={{ resize: 'none' }}>
                                                    </Form.Control>
                                                }
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className='mt-5 border-0 bg-white d-flex justify-content-center'>
                        <Button size='lg' onClick={HandleSubmit}>
                            <strong>
                                SUBMIT
                            </strong>
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
            {Loading && <MLoading />}
        </div>
    )
}
