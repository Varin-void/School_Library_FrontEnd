import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CloseButton, Col, Form, FormLabel, Modal, Row } from 'react-bootstrap'
import ImageInput from '../../../Component/ImageInput';
import PdfInput from '../../../Component/PdfInput';
import MLoading from '../../../Component/MLoading';
import { setPreview } from '../../../Ultils/ImagePreview';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import { BOOK_CREATE } from '../../../Ultils/API/URL';
import { useSelector } from 'react-redux';
import API from '../../../Ultils/API/API';
import CheckError from '../../../Ultils/API/CheckError';

export default function ModalAddBook(props) {
    const token = useSelector(state => state.token);
    const [Picked_Image, setPicked_Image] = useState("");
    const [Picked_PDF, setPicked_PDF] = useState("");
    const [Validated, setValidated] = useState(false);
    const [Loading, setLoading] = useState(false);
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
            formData.append("image", Data.image);
            formData.append("pdf", Data.pdf);
            formData.append("groupId", props.Data.id + "");
            API.POST_FORM_DATA(BOOK_CREATE, formData)
                .then(res => {
                    setLoading(false);
                    if (res.status === 1) {
                        DSweetAlert.ShowSuccess(res.message, () => {
                            props.onHide();
                            props.GetData();
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
        catch {
            setLoading(false);
            DSweetAlert.ShowError("Internal Server Error");
        }
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size='xl'
            >
                <Modal.Body className='p-0'>
                    <div>
                        <Form method='post'>
                            <Card className="p-3">
                                <CardHeader className='bg-white w-100'>
                                    <CloseButton onClick={() => { props.onHide() }} />
                                    <h2 className='text-center text-primary'>
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
                </Modal.Body>
            </Modal>
        </>
    )
}