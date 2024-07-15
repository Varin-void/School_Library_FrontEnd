import React, { useState } from 'react'
import { Button, Form, FormLabel, Modal } from 'react-bootstrap'
import MLoading from '../MLoading';
import API from '../../Ultils/API/API';
import { GROUP_CREATE, GROUP_GET_BY_ID, GROUP_UPDATE } from '../../Ultils/API/URL';
import { DSweetAlert } from '../Alert/DSweetAlert';
import { useSelector } from 'react-redux';

export default function GroupModal(props) {
    const ID = props.Edit;
    const token = useSelector(state => state.token);
    const [Validated, setValidated] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [Data, setData] = useState({
        name: ""
    });
    const Input =
    {
        0: {
            label: "Name",
            id: 1,
            feedback: "Please Input an Name"
        },
        1: {
            autoComplete: "off",
            type: "text",
            placeholder: "Name",
            name: "name",
            required: true
        }
    };
    const HandleonChange = (event) => {
        setData({ ...Data, [event.target.name]: event.target.value });
    }
    const HandleSubmit = () => {
        if (Data.name === "") {
            setValidated(true);
            return false;
        }
        try {
            setLoading(true);
            var params = {
                apiToken: token,
                name: Data.name
            }
            setValidated(false);
            if (ID === "") {
                API.POST(GROUP_CREATE, params)
                    .then(res => {
                        setLoading(false);
                        if (res.status === 1) {
                            DSweetAlert.ShowSuccess(res.message, () => {
                                props.onHide();
                            });
                        } else {
                            DSweetAlert.ShowError(res.message);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        DSweetAlert.ShowError(err);
                    });
            } else {
                params.id = ID;
                API.POST(GROUP_UPDATE, params)
                    .then(res => {
                        setLoading(false);
                        if (res.status === 1) {
                            DSweetAlert.ShowSuccess(res.message, () => {
                                props.onHide();
                            });
                        } else {
                            DSweetAlert.ShowError(res.message);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        DSweetAlert.ShowError(err);
                    })
            }
        }
        catch {
            setLoading(false);
            DSweetAlert.ShowError("Internal Server Error");
        }
    }
    return (
        <>
            <Modal
                onShow={() => {
                    if (ID !== "" && token !== "") {
                        const params = {
                            "apiToken": token,
                            "id": ID
                        }
                        try {
                            setLoading(true);
                            API.POST(GROUP_GET_BY_ID, params)
                                .then(res => {
                                    setLoading(false);
                                    if (res.status === 1) {
                                        setData({ name: res.data.name });
                                    } else {
                                        DSweetAlert.ShowError(res.message);
                                    }
                                }).catch(err => {
                                    setLoading(false);
                                    DSweetAlert.ShowError(err);
                                });
                        }
                        catch {
                            setLoading(false);
                            DSweetAlert.ShowError("Internal Server Error!");
                        }
                    } else {
                        setData({ name: "" });
                    }
                }}
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className='w-100 bg-white'>
                    <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
                        <h2 className='text-center text-primary w-100 d-flex justify-content-center'>
                            <strong>
                                GROUP FORM
                            </strong>
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='m-5'>
                    <FormLabel className='d-block'>{Input[0].label} {Input[1].required && <span className='text-danger'>* {(Validated && Data[Input[1].name] === "") && Input[0].feedback}</span>}</FormLabel>
                    <Form.Control {...Input[1]} value={Data[Input[1].name]} onChange={HandleonChange} />
                </Modal.Body>
                <Modal.Footer className='w-100 d-flex justify-content-around bg-white'>
                    <Button onClick={props.onHide} className='bg-danger border-0'><strong>CANCEL</strong></Button>
                    <Button onClick={HandleSubmit}><strong>SUBMIT</strong></Button>
                </Modal.Footer>
            </Modal>
            {Loading && <MLoading />}
        </>
    )
}
