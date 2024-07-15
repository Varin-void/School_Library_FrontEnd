import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle, Image } from 'react-bootstrap';
import { BOOK_DOWNLOAD, Server } from '../../Ultils/API/URL';
import API from '../../Ultils/API/API';
import { DSweetAlert } from '../Alert/DSweetAlert';
import { useSelector } from 'react-redux';
import MLoading from '../MLoading';
export default function SwiperBook({ Data, HandleRemoveBook }) {
    const token = useSelector(state => state.token);
    const [Loading, setLoading] = useState(false);

    function Download(arrayBuffer, type, fileName) {
        var binary = atob(arrayBuffer.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        var blob = new Blob([view], { type: type });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${fileName}`;
        link.click();
    }

    const HandleDownload = () => {
        const Params = {
            "apiToken": token,
            "id": "" + Data.id
        }
        try {
            setLoading(true);
            API.POST(BOOK_DOWNLOAD, Params)
                .then(res => {
                    setLoading(false);
                    if (res.status === 1) {
                        Download(res.pdf.data, res.pdf.contentType, res.pdf.filename);
                    }
                    else {
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
            <Card className='M-Shadow-Box' style={{ width: "280px" }}>
                <CardHeader className='p-3'>
                    {HandleRemoveBook &&
                        <div className='text-danger d-flex justify-content-end w-100'>
                            <svg onClick={() => { HandleRemoveBook(Data.id) }} xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-x-lg" role='button' viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </div>
                    }
                    <div className='mt-3'>
                        <Image src={Server + Data.imagePath} className='object-fit-contain' width={"100%"} height={"300px"} />
                    </div>
                </CardHeader>

                <CardBody className='text-center' style={{ overflow: "hidden", height: "170px" }}>
                    <CardTitle className='text-center'>
                        {Data.title}
                    </CardTitle>
                    <CardSubtitle className='text-center'>
                        {Data.author}
                    </CardSubtitle>
                    <p className='M-Description' style={{ overflow: "hidden" }}>
                        {Data.description}
                    </p>
                </CardBody>
                <CardFooter className='d-flex justify-content-around'>
                    {/* <Button className='btn btn-primary' onClick={(event) => {
                        if (event.ctrlKey) {
                            window.open(Server + Data.pdf)
                        } else
                            setPDFShow(true);
                    }} style={{ width: "40%" }}>View</Button> */}
                    <Button style={{ width: "40%" }} onClick={HandleDownload}
                    >Download</Button>
                </CardFooter>
            </Card>
            {/* <PdfDetail isShow={PDFShow} onHide={() => { setPDFShow(false) }} pdf={Data.pdf} Title={Data.title} /> */}
            {Loading && <MLoading />}
        </>
    )
}
