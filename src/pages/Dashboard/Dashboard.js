import React, { useEffect, useState } from 'react';
import { UserOutlined, KeyOutlined, PoweroffOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import config from '~/config';
import { logout } from '~/redux/actions/jwtAuthAction';

import {
    MdAddCircleOutline,
    MdLogout,
    MdOutlineFormatListBulleted,
    MdOutlineHome,
    MdOutlinePeople,
    MdOutlineRealEstateAgent,
    MdOutlineSupervisorAccount,
} from 'react-icons/md';

import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
import { Breadcrumb, Dropdown, Layout, Menu, message } from 'antd';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setMessage } from '~/redux/actions/commonAction';

const cx = classNames.bind(styles);

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        label: 'Thông tin tài khoản',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: 'Đổi mật khẩu',
        key: '2',
        icon: <KeyOutlined />,
    },
    {
        label: 'Thoát',
        key: '3',
        icon: <PoweroffOutlined />,
    },
];

const handleDropdownClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const dropdownProps = {
    items,
    onClick: handleDropdownClick,
};

const Dashboard = ({ children }) => {
    const [marginLeft, setMarginLeft] = useState(200);
    const [collapsed, setCollapsed] = useState(false);
    const siteLayoutStyle = { marginLeft: marginLeft };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.commonReducer.message);
    const err = useSelector((state) => state.commonReducer.error);
    const token = useSelector((state) => state.jwtAuthReducer.token);
    const roleCode = useSelector((state) => state.jwtAuthReducer.roleCode);
    const isAuthenticated = token && roleCode;

    // Breadcrumbs
    let currentLink = '';
    const location = useLocation();
    const breadcrumbItems = location.pathname
        .split('/')
        .filter((crumb) => crumb !== '')
        .map((crumb) => {
            currentLink += `/${crumb}`;
            return {
                title: <Link to={currentLink}>{crumb.toUpperCase()}</Link>,
            };
        });
    breadcrumbItems.unshift({ title: <Link to="/">HOME</Link> });

    // Menu
    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    let menuItems = [
        {
            label: 'Users',
            key: '1',
            icon: <MdOutlineSupervisorAccount />,
            children: [
                {
                    label: 'List Users',
                    key: '11',
                    icon: <MdOutlineSupervisorAccount />,
                    onClick: () => {
                        navigate(config.routes.listUser);
                    },
                },
                {
                    label: 'Add User',
                    key: '12',
                    icon: <MdOutlineFormatListBulleted />,
                    onClick: () => {
                        navigate(config.routes.addUser);
                    },
                },
            ],
        },
        {
            label: 'Buildings',
            key: '2',
            icon: <MdOutlineHome />,
            children: [
                {
                    label: 'List Buildings',
                    key: '21',
                    icon: <MdOutlineFormatListBulleted />,
                    onClick: () => {
                        navigate(config.routes.listBuilding);
                    },
                },
                {
                    label: 'Add Building',
                    key: '22',
                    icon: <MdAddCircleOutline />,
                    onClick: () => {
                        navigate(config.routes.addBuilding);
                    },
                },
            ],
        },
        {
            label: 'Customers',
            key: '3',
            icon: <MdOutlinePeople />,
            children: [
                {
                    label: 'List Customers',
                    key: '31',
                    icon: <MdOutlineFormatListBulleted />,
                    onClick: () => {
                        navigate(config.routes.listCustomer);
                    },
                },
                {
                    label: 'Add Customer',
                    key: '32',
                    icon: <MdAddCircleOutline />,
                    onClick: () => {
                        navigate(config.routes.addCustomer);
                    },
                },
            ],
        },
        {
            label: 'Logout',
            key: '4',
            icon: <MdLogout />,
            onClick: handleLogout,
        },
    ];

    if (token && roleCode === 'ROLE_STAFF') {
        menuItems = [
            {
                label: 'Buildings',
                key: '1',
                icon: <MdOutlineHome />,
                children: [
                    {
                        label: 'List Buildings',
                        key: '11',
                        icon: <MdOutlineFormatListBulleted />,
                        onClick: () => {
                            navigate(config.routes.listBuilding);
                        },
                    },
                ],
            },
            {
                label: 'Customers',
                key: '2',
                icon: <MdOutlinePeople />,
                children: [
                    {
                        label: 'List Customers',
                        key: '21',
                        icon: <MdOutlineFormatListBulleted />,
                        onClick: () => {
                            navigate(config.routes.listCustomer);
                        },
                    },
                ],
            },
            {
                label: 'Logout',
                key: '3',
                icon: <MdLogout />,
                onClick: handleLogout,
            },
        ];
    }

    useEffect(() => {
        if (msg) {
            dispatch(setMessage(''));
            message.success(msg);
        }
        if (err) {
            dispatch(setError(''));
            message.error(err);
        }
    }, [msg, err, dispatch]);

    if (isAuthenticated) {
        return (
            <Layout>
                <Header>
                    <div className={cx('header')}>
                        <div className={cx('logo-info')}>
                            <MdOutlineRealEstateAgent className={cx('logo-icon')} />
                            <h3 className={cx('logo-name')}>Estate Management</h3>
                        </div>
                        <div className={cx('user-info')}>
                            {/* <Avatar size="default" icon={<UserOutlined />} />
                            <h3 className={cx('user-name')}>Nguyen Thanh Ky Nhan</h3> */}
                            <Dropdown.Button menu={dropdownProps} placement="bottom" icon={<UserOutlined />}>
                                Xin chào, nguyen van a
                            </Dropdown.Button>
                        </div>
                    </div>
                </Header>
                <Layout style={siteLayoutStyle}>
                    <Sider
                        theme="light"
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => {
                            value ? setMarginLeft(80) : setMarginLeft(200);
                            setCollapsed(value);
                        }}
                        style={{
                            position: 'fixed',
                            left: 0,
                            bottom: 0,
                            top: 64,
                        }}
                    >
                        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                margin: '0 16px',
                            }}
                        >
                            <Breadcrumb
                                style={{
                                    margin: '16px 0',
                                }}
                                items={breadcrumbItems}
                            />

                            <div className={cx('content')}>{children}</div>
                        </Content>
                        <Footer
                            style={{
                                padding: 0,
                                margin: '0 16px',
                            }}
                        >
                            <div className={cx('footer')}>
                                <div className={cx('footer-content')}>
                                    <div className={cx('footer-info')}>Designed by kynhanht</div>
                                    <div className={cx('footer-social-list')}>
                                        <a href="https://www.facebook.com/elninohtz">
                                            <FaTwitterSquare />
                                        </a>
                                        <a href="https://www.facebook.com/elninohtz">
                                            <FaFacebookSquare color="blue" />
                                        </a>
                                        <a href="https://www.facebook.com/elninohtz">
                                            <FaYoutubeSquare color="red" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    } else {
        return <Navigate to="/login" replace />;
    }
};
export default Dashboard;
