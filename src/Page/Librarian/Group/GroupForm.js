import React, { useState } from 'react'
import { Button, Form, FormLabel, Modal } from 'react-bootstrap'
import MLoading from '../../../Component/MLoading';
import API from '../../../Ultils/API/API';
import { GROUP_CREATE } from '../../../Ultils/API/URL';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';
import { useSelector } from 'react-redux';

export default function GroupForm(props) {
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
            const params = {
                apiToken: token,
                name: Data.name
            }
            setValidated(false);
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
        }
        catch {
            setLoading(false);
            DSweetAlert.ShowError("Internal Server Error");
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='w-100'>
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
            <Modal.Footer className='w-100 d-flex justify-content-around'>
                <Button onClick={props.onHide} className='bg-danger border-0'><strong>CANCEL</strong></Button>
                <Button onClick={HandleSubmit}><strong>SUBMIT</strong></Button>
            </Modal.Footer>
            {Loading && <MLoading />}
        </Modal>
    )
}
