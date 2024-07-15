import React from 'react'

export default function PdfInput({ HandleonChange, item, Validated, Picked_PDF }) {
    return (
        <div className={'w-100 h-100 position-relative d-flex ' + ((Validated && Picked_PDF === "") && 'text-danger')} style={{ border: "2px dotted" }}>
            <div className='w-25 d-flex justify-content-center align-items-center h-100' style={{ borderRight: "2px dotted" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={"bi bi-upload " + ((Validated && Picked_PDF === "") && "text-danger")} viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                </svg>
            </div>
            <div className='w-75 d-flex align-items-center'>
                <span className='ms-3'>Drop PDF File Here</span>
                <span className='ms-3 text-primary'>
                   <strong>{Picked_PDF}</strong>
                </span>
            </div>
            <input accept="application/pdf" onChange={HandleonChange} {...item} className='w-100 h-100 position-absolute top-0 form-control border-0 opacity-0' role='button' />
        </div >
    )
}
