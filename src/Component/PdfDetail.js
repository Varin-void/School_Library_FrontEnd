import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Server } from '../Ultils/API/URL'

export default function PdfDetail({ isShow, onHide, Title, pdf }) {
    return (
        <Modal
            size="lg"
            show={isShow}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg" className='text-center text-primary w-100'>
                    Book Title : {Title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-0 m-0' style={{ height: "80vh" }}>
                <iframe src={Server + pdf} className='w-100 h-100' title='1'></iframe>
            </Modal.Body>
            <Modal.Footer className='d-flex pb-0 justify-content-center'>
                <Button onClick={() => { onHide() }}>
                    <strong>
                        CLOSE
                    </strong>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
