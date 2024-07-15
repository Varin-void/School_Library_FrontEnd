import React from 'react'

export default function MLoading() {
    return (
        <div className='position-absolute d-flex justify-content-center align-items-center' style={{ zIndex: "2", width: "100%", height: "100%",top:"0",left:"0" }}>
            <div>
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
