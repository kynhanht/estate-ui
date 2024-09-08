import React, { useEffect, useState } from 'react';
import { UserOutlined, KeyOutlined, PoweroffOutlined, CaretDownFilled } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import config from '~/config';
import { logout } from '~/redux/actions/authAction';

import {
    MdAddCircleOutline,
    MdOutlineFormatListBulleted,
    MdOutlineHome,
    MdOutlinePeople,
    MdOutlineRealEstateAgent,
    MdOutlineSupervisorAccount,
} from 'react-icons/md';

import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
import { Dropdown, Layout, Menu, message, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setMessage } from '~/redux/actions/commonAction';

const cx = classNames.bind(styles);

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children }) => {
    const [marginLeft, setMarginLeft] = useState(250);
    const [collapsed, setCollapsed] = useState(false);
    const siteLayoutStyle = { marginLeft: marginLeft };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.commonReducer.message);
    const err = useSelector((state) => state.commonReducer.error);
    const jwtToken = useSelector((state) => state.jwtAuthReducer.token);
    const roleCode = useSelector((state) => state.jwtAuthReducer.roleCode);
    const fullName = useSelector((state) => state.jwtAuthReducer.fullName);

    // Menu
    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    const dropdownItems = [
        {
            label: 'Thông tin tài khoản',
            key: '1',
            icon: <UserOutlined />,
            onClick: () => {
                navigate(config.routes.editUserProfile);
            },
        },
        {
            label: 'Đổi mật khẩu',
            key: '2',
            icon: <KeyOutlined />,
            onClick: () => {
                navigate(config.routes.changePassword);
            },
        },
        {
            label: 'Đăng xuất',
            key: '3',
            icon: <PoweroffOutlined />,
            onClick: handleLogout,
        },
    ];

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
    ];

    if (jwtToken && roleCode === 'ROLE_STAFF') {
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

    return (
        <Layout>
            <Header>
                <div className={cx('header')}>
                    <div className={cx('logo-info')}>
                        <MdOutlineRealEstateAgent className={cx('logo-icon')} />
                        <div className={cx('logo-name')}>Trang quản trị bất động sản</div>
                    </div>
                    <div className={cx('user-info')}>
                        <Dropdown
                            menu={{
                                items: dropdownItems,
                            }}
                            placement="bottomLeft"
                        >
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
                            margin: '20px 20px',
                        }}
                    >
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
};
export default MainLayout;
