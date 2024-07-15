import React from 'react'
import { Image } from 'react-bootstrap'

export default function ImageInput({ Validated, Image_Input, HandleonChange, Picked_Image }) {
  return (
    <div className='h-100 d-flex align-items-center justify-content-center position-relative'>
      <div className='h-100'>
        <div style={{ border: "1px solid", height: "250px", width: "250px", borderColor: ((Validated && Picked_Image === "") && "red") }}>
          {Picked_Image !== "" ? <Image className='w-100 object-fit-cover' style={{ height: "250px", width: "250px" }} src={Picked_Image} alt='Picked_Image' /> : ""}
        </div>
        <div id='N-Image-Round' className='h-25 position-relative rounded-3' style={{ minHeight: "50px", width: "250px", border: "2px dotted", borderTop: "0", borderColor: ((Validated && Picked_Image === "") && "red") }}>
          <div className='h-100'>
            <div className='d-flex h-100 w-100'>
              <div className='w-25 d-flex justify-content-center align-items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={"bi bi-upload " + ((Validated && Picked_Image === "") && "text-danger")} viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                </svg>
              </div>
              <div className="d-flex h-100 w-75 justify-content-center align-items-center" style={{ borderLeft: "2px dotted", borderColor: ((Validated && Picked_Image === "") && "red") }}>
                <p className={'text-center align-text-bottom p-2 m-0 ' + ((Validated && Picked_Image === "") && "text-danger")} >Choose Image</p>
              </div>
            </div>
            <input accept="image/png, image/gif, image/jpeg"  {...Image_Input[1]} className='form-control position-absolute top-0 w-100 h-100 opacity-0' onChange={HandleonChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
