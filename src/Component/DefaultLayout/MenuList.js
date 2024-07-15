import { Menu } from 'antd'
import {
    HomeOutlined,
    AppstoreOutlined,
    UserOutlined,
    BookOutlined,
    ProfileOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



const MenuList = ({ HandleLogout }) => {
    const role = useSelector(state => state.role);
    const [menuItems, setmenuItems] = useState([]);

    useEffect(() => {
        if (role === "Librarian") {
            setmenuItems([...[
                {
                    className: 'ps-4 text-center',
                    key: 'home',
                    icon: <HomeOutlined style={{ fontSize: "25px" }} />,
                    label: (
                        <Link style={{ textDecoration: "none" }} to={`/${role}/Home`}><strong>Home</strong></Link>
                    ),
                },
                {
                    key: 'group',
                    icon: <AppstoreOutlined style={{ fontSize: "25px" }} />,
                    label: (
                        <Link style={{ textDecoration: "none" }} to={`/${role}/Group`}><strong>Group</strong></Link>
                    ),
                    className: 'text-center ps-4 mt-5',
                },
                {
                    key: 'user',
                    icon: <UserOutlined style={{ fontSize: "25px" }} />,
                    label: (
                        <Link style={{ textDecoration: "none" }} to={`/${role}/User`}><strong>User</strong></Link>
                    ),
                    className: 'text-center ps-4 mt-5',
                },
                {
                    key: 'book',
                    icon: <BookOutlined style={{ fontSize: "25px" }} />,
                    label: (
                        <Link style={{ textDecoration: "none" }} to={`/${role}/Book`}><strong>Book</strong></Link>
                    ),
                    className: 'text-center ps-4 mt-5',
                },
                {
                    key: 'profile',
                    icon: <ProfileOutlined style={{ fontSize: "25px" }} />,
                    label: (
                        <Link style={{ textDecoration: "none" }} to={`/${role}/Profile`}><strong>Profile</strong></Link>
                    ),
                    className: 'text-center ps-4 mt-5',
                },
            ]]);
        }
        if (role === "Student" || role === "Teacher") {
            setmenuItems([...[
                {
                    className: 'ps-4 text-center',
                    key: 'home',
                    icon: <HomeOutlined style={{ fontSize: "25px" }} />,
                    label: (
                        <Link style={{ textDecoration: "none" }} to={`/${role}/Home`}><strong>Home</strong></Link>
                    ),
                },
                {
                    key: 'profile',
                    icon: <ProfileOutlined style={{ fontSize: "25px" }} />,
                    label: (
                        <Link style={{ textDecoration: "none" }} to={`/${role}/Profile`}><strong>Profile</strong></Link>
                    ),
                    className: 'text-center ps-4  mt-5',
                },
            ]]);
        }
    }, [role,HandleLogout])

    return (
        <Menu items={menuItems} mode='inline' className='menu-bar p-0 m-0 pt-3 bg-transparent text-white' />
    );
};

export default MenuList;