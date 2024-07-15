import {
    LogoutOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { setCookie } from '../../Ultils/Cookie';
import { Button, Layout, Menu } from 'antd'
import MenuList from './MenuList';
import Logo from './Logo';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout;
export default function DefaultLayout(props) {
    const Navigate = useNavigate();
    const HandleLogout = () => {
        setCookie("");
        Navigate("/");
    }
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div style={{ backgroundColor: "white", minHeight: "100vh", width: "100%" }}>
            <Layout>
                <Sider className='bg-primary' collapsed={collapsed} collapsible trigger={null} theme='light'>
                    <div className='position-sticky top-0 d-flex flex-column w-100 min-vh-100'>
                        <Logo />
                        <MenuList HandleLogout={HandleLogout} />

                        <Menu items={[
                            {
                                key: 'log-out',
                                icon: <LogoutOutlined style={{ fontSize: "25px" }} />,
                                label: (
                                    <strong>Logout</strong>
                                ),
                                className: 'ps-4 text-center',
                                onClick: () => { HandleLogout() }
                            },
                        ]} mode='inline' id='Logout' className='menu-bar bg-transparent text-white' />
                    </div>
                </Sider>
                <Layout className='min-vh-100 bg-dark'>
                    <div className='position-sticky top-0' style={{ zIndex: "99" }}>
                        <Header className='bg-primary text-white' style={{ padding: 0, background: 'white' }}>
                            <Button type='text' className='toggle' style={{ color: 'white' }}
                                onClick={() => setCollapsed(!collapsed)}
                                icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: "15px" }} /> : <MenuFoldOutlined />} />
                        </Header>
                    </div>
                    <Content>
                        <div className='p-lg-5 p-3 bg-dark' style={{ backgroundColor: "gray" }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>

    )
}