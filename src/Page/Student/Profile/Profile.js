import React from 'react'
import { useSelector } from 'react-redux';
import MLoading from '../../../Component/MLoading';
import ProfileDetail from '../../../Component/ProfileDetail';

export default function Profile() {
    const Loading = useSelector(state => state.Loading);
    const User = useSelector(state => state.User);

    return (
        <div className='R-Shadow'>
            <ProfileDetail Data={User} />
            {Loading && <MLoading />}
        </div>
    )
}