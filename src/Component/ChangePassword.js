import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import API from "../Ultils/API/API";
import { CHANGE_PASSWORD } from "../Ultils/API/URL";
import { DSweetAlert } from "./Alert/DSweetAlert";
import { useSelector } from "react-redux";
import CheckError from "../Ultils/API/CheckError";


export default function ChangePassword({ Data, show, onHide }) {
    const token = useSelector(state => state.token);
    const [Validate, setValidate] = useState(false);
    const [User, setUser] = useState({
        OldPassword: "",
        NewPassword: "",
        ConfirmNewPassword: ""
    });
    const handleSubmit = () => {
        try {
            if (CheckError([token, User.OldPassword, User.ConfirmNewPassword, User.NewPassword]) > 0) {
                setValidate(true);
                return false;   
            }
            setValidate(false);
            const Params = {
                "apiToken": "" + token,
                "oldPassword": User.OldPassword,
                "newPassword": User.NewPassword,
                "confirmNewPassword": User.ConfirmNewPassword
            };
            API.POST(CHANGE_PASSWORD, Params)
                .then(res => {
                    if (res.status === 1) {
                        DSweetAlert.ShowSuccess(res.message, () => {
                            onHide();
                        });
                    } else {
                        DSweetAlert.ShowError(res.message);
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
    const handleClose = () => {
        onHide()
    }

    const HandleChange = (event) => {
        setUser({ ...User, [event.target.name]: event.target.value });
    }
    return (
        <>
            <Modal onShow={() => {
                setUser({
                    OldPassword: "",
                    NewPassword: "",
                    ConfirmNewPassword: ""
                });
            }} show={show} onHide={handleClose} centered>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title className="w-100 text-center text-primary">{Data.username}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-5">
                        <Form.Group className="mb-3 d-none">
                            <Form.Label>username</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="new-password"
                                placeholder="Old Password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Old Password <span className="text-danger">*{(Validate && User.OldPassword === "") && " Please Input Old Password"}</span></Form.Label>
                            <Form.Control
                                type="password"
                                name="OldPassword"
                                autoComplete="new-password"
                                placeholder="Old Password"
                                onChange={HandleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>new Password <span className="text-danger">*{(Validate && User.NewPassword === "") && " Please Input New Password"}</span></Form.Label>
                            <Form.Control
                                type="password"
                                name="NewPassword"
                                autoComplete="new-password"
                                placeholder="new Password"
                                onChange={HandleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>new Password <span className="text-danger">*{(Validate && User.ConfirmNewPassword === "") && " Please Input Confirm New Password"}</span></Form.Label>
                            <Form.Control
                                type="password"
                                name="ConfirmNewPassword"
                                autoComplete="new-password"
                                placeholder="Confirm new Password"
                                onChange={HandleChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-around">
                        <Button variant="danger" onClick={handleClose}>
                            <strong>
                                Close
                            </strong>
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            <strong>
                                Save Changes
                            </strong>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
