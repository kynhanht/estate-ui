import React, { useEffect, useState } from 'react';
import { UserOutlined, KeyOutlined, PoweroffOutlined, CaretDownFilled } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import config from '~/config';
import { logout } from '~/redux/actions/authAction';

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
import { Breadcrumb, Dropdown, Layout, Menu, message, Space, Typography } from 'antd';
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
    const [marginLeft, setMarginLeft] = useState(250);
    const [collapsed, setCollapsed] = useState(false);
    const siteLayoutStyle = { marginLeft: marginLeft };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.commonReducer.message);
    const err = useSelector((state) => state.commonReducer.error);
    const token = useSelector((state) => state.jwtAuthReducer.token);
    const roleCode = useSelector((state) => state.jwtAuthReducer.roleCode);
    const fullName = useSelector((state) => state.jwtAuthReducer.fullName);
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
            label: 'Quản lý tài khoản',
            key: '1',
            icon: <MdOutlineSupervisorAccount />,
            children: [
                {
                    label: 'Danh sách tài khoản',
                    key: '11',
                    icon: <MdOutlineSupervisorAccount />,
                    onClick: () => {
                        navigate(config.routes.listUser);
                    },
                },
                {
                    label: 'Thêm tài khoản',
                    key: '12',
                    icon: <MdOutlineFormatListBulleted />,
                    onClick: () => {
                        navigate(config.routes.addUser);
                    },
                },
            ],
        },
        {
            label: 'Quản lý tòa nhà',
            key: '2',
            icon: <MdOutlineHome />,
            children: [
                {
                    label: 'Danh sách tòa nhà',
                    key: '21',
                    icon: <MdOutlineFormatListBulleted />,
                    onClick: () => {
                        navigate(config.routes.listBuilding);
                    },
                },
                {
                    label: 'Thêm tòa nhà',
                    key: '22',
                    icon: <MdAddCircleOutline />,
                    onClick: () => {
                        navigate(config.routes.addBuilding);
                    },
                },
            ],
        },
        {
            label: 'Quản lý khách hành',
            key: '3',
            icon: <MdOutlinePeople />,
            children: [
                {
                    label: 'Danh sách khách hàng',
                    key: '31',
                    icon: <MdOutlineFormatListBulleted />,
                    onClick: () => {
                        navigate(config.routes.listCustomer);
                    },
                },
                {
                    label: 'Thêm khách hàng',
                    key: '32',
                    icon: <MdAddCircleOutline />,
                    onClick: () => {
                        navigate(config.routes.addCustomer);
                    },
                },
            ],
        },
        {
            label: 'Đăng xuất',
            key: '4',
            icon: <MdLogout />,
            onClick: handleLogout,
        },
    ];

    if (token && roleCode === 'ROLE_STAFF') {
        menuItems = [
            {
                label: 'Quản lý tòa nhà',
                key: '1',
                icon: <MdOutlineHome />,
                children: [
                    {
                        label: 'Danh sách tòa nhà',
                        key: '11',
                        icon: <MdOutlineFormatListBulleted />,
                        onClick: () => {
                            navigate(config.routes.listBuilding);
                        },
                    },
                ],
            },
            {
                label: 'Quản lý khách hàng',
                key: '2',
                icon: <MdOutlinePeople />,
                children: [
                    {
                        label: 'Danh sách khách hàng',
                        key: '21',
                        icon: <MdOutlineFormatListBulleted />,
                        onClick: () => {
                            navigate(config.routes.listCustomer);
                        },
                    },
                ],
            },
            {
                label: 'Đăng xuất',
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
                            <div className={cx('logo-name')}>Trang quản trị bất động sản</div>
                        </div>
                        <div className={cx('user-info')}>
                            <Dropdown menu={dropdownProps} placement="bottomLeft">
                                <Typography.Link>
                                    <Space className={cx('user-name')}>
                                        {`Xin chào, ${fullName}`}
                                        <CaretDownFilled />
                                    </Space>
                                </Typography.Link>
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Layout style={siteLayoutStyle}>
                    <Sider
                        theme="light"
                        collapsible
                        collapsed={collapsed}
                        width={250}
                        onCollapse={(value) => {
                            value ? setMarginLeft(80) : setMarginLeft(250);
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
                                    <div className={cx('footer-info')}>Thiết kế bởi kynhanht</div>
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
