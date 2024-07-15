import React, { useState } from 'react'
import { Badge, Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import API from '../../Ultils/API/API';
import { GROUP_URL, USER_ASSIGN_GROUP } from '../../Ultils/API/URL';
import { DSweetAlert } from '../Alert/DSweetAlert';
import MLoading from '../MLoading';
import Group from '../../Page/Librarian/Group/Group';

export default function UserObjectModal(props) {
    const [Loading, setLoading] = useState(false);
    const token = useSelector(state => state.token);
    const { ViewDataModal } = props;
    const { ID, Username, Role } = ViewDataModal;
    const [Data, setData] = useState([]);
    const Assign = {
        ID: ID,
        Username: Username,
        Role: Role,
        HandleAssign: (Groupid, Then) => {
            DSweetAlert.ShowConfirm("Are you sure you want to Assign to this Group?", () => {
                try {
                    setLoading(true);
                    const params = {
                        apiToken: token,
                        userId: ID,
                        groupId: Groupid + ""
                    };
                    API.POST(USER_ASSIGN_GROUP, params)
                        .then(res => {
                            setLoading(false);
                            if (res.status === 1) {
                                DSweetAlert.ShowSuccess("Assigning is a success", () => {
                                    // GetData();
                                    Then();
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
                catch {
                    setLoading(false);
                    DSweetAlert.ShowError("Internal Server Error!");
                }
            })

        }
    };
    const GetData = () => {
        if (token !== "") {
            const params = {
                "apiToken": token,
            }
            try {
                setLoading(true);
                API.POST(GROUP_URL, params)
                    .then(res => {
                        setLoading(false);
                        if (res.status === 1) {
                            setData([...res.data]);
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
        }
    }
    return (
        <>
            <Modal
                onShow={GetData}
                show={props.show}
                onHide={props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='w-100'>
                    <Modal.Title id="contained-modal-title-vcenter" className='w-100 d-flex'>
                        <div className='p-3'>
                            <h4 className='text-warning'>
                                <strong>
                                    Group
                                </strong>
                                <Badge className='ms-3'>{Data.length}</Badge>
                            </h4>
                            <h2 className='text-primary'>
                                <strong>
                                    Username&nbsp;:&nbsp;
                                    {Username}
                                </strong>
                            </h2>
                            <h4 className='text-primary'>
                                <strong>
                                    Role&nbsp;:&nbsp;
                                    {Role}
                                </strong>
                            </h4>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <Group Assign={Assign} />
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center' onClick={() => { props.onHide() }}>
                    <Button>
                        <span>
                            <strong>
                                CLOSE
                            </strong>
                        </span>
                    </Button>
                </Modal.Footer>
                <div>
                    {Loading && <MLoading />}
                </div>
            </Modal >

        </>
    )
}
