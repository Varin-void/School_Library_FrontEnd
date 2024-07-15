import React from 'react'
import { Button, CloseButton, Modal } from 'react-bootstrap'
import LibrarianBook from '../../Librarian/Book/Book'
import API from '../../../Ultils/API/API';
import { BOOK_ASSIGN_GROUP } from '../../../Ultils/API/URL';
import { useSelector } from 'react-redux';
import { DSweetAlert } from '../../../Component/Alert/DSweetAlert';

export default function ModalExistBook({ GetData, Data, Show, onHide, }) {
    const token = useSelector(state => state.token);
    const Assign = {
        GroupId: Data.id,
        Name: Data.name,
        HandleAssign: (BookId,Then) => {
            try {
                DSweetAlert.ShowConfirm("You are about to assign this book to an group", () => {
                    const params = {
                        "apiToken": token,
                        "bookId": BookId + "",
                        "groupId": Data.id + ""
                    };
                    API.POST(BOOK_ASSIGN_GROUP, params)
                        .then(res => {
                            if (res.status === 1) {
                                DSweetAlert.ShowSuccess(res.message, () => {
                                    GetData();
                                    Then();
                                });
                            } else {
                                DSweetAlert.ShowError(res.message);
                            }
                        })
                        .catch(err => {
                            DSweetAlert.ShowError(err);
                        })
                })
            }
            catch {
                DSweetAlert.ShowError("Internal Server Error");
            }
        }
    };
    return (
        <>
            <Modal
                show={Show}
                onHide={onHide}
                size='xl'
            >
                <Modal.Header>
                    <Modal.Title className='w-100'>
                        <CloseButton onClick={() => { onHide() }} />
                        <h1 className='w-100 text-center text-primary'>
                            {Data.name}
                        </h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <LibrarianBook Assign={Assign} />
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button size='lg' onClick={() => { onHide() }}>
                        CLOSE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
