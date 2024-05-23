import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
    setAlpha,
} from '@ant-design/pro-components';
import { Button, Space, Tabs, message, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/redux/actions/jwtAuthAction';
import { setError, setMessage } from '~/redux/actions/commonAction';

const cx = classNames.bind(styles);
const tabItems = [
    {
        key: 'account',
        label: 'Account',
    },
    {
        key: 'phone',
        label: 'Phone',
    },
];

const Login = () => {
    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState('account');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.commonReducer.message);
    const err = useSelector((state) => state.commonReducer.error);
    const jwtToken = useSelector((state) => state.jwtAuthReducer.token);
    const roleCode = useSelector((state) => state.jwtAuthReducer.roleCode);
    const isAuthenticated = jwtToken && roleCode;
    useEffect(() => {
        if (msg) {
            message.success(msg);
            dispatch(setMessage(''));
        }
        if (err) {
            message.error(err);
            dispatch(setError(''));
        }
    }, [msg, err, dispatch]);

    const iconStyles = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    const handleLogin = (values) => {
        dispatch(login(values, navigate));
    };

    if (!isAuthenticated) {
        return (
            <ProConfigProvider hashed={false}>
                <div style={{ backgroundColor: token.colorBgContainer }} className={cx('')}>
                    <LoginForm
                        title="Login Form"
                        subTitle="Please enter your information"
                        size="large"
                        submitter={{
                            render: () => {
                                return (
                                    <Button type="primary" block htmlType="submit">
                                        Login
                                    </Button>
                                );
                            },
                        }}
                        onFinish={handleLogin}
                        actions={
                            <Space>
                                Methods
                                <AlipayCircleOutlined style={iconStyles} />
                                <TaobaoCircleOutlined style={iconStyles} />
                                <WeiboCircleOutlined style={iconStyles} />
                            </Space>
                        }
                    >
                        <Tabs
                            centered
                            activeKey={loginType}
                            onChange={(activeKey) => setLoginType(activeKey)}
                            items={tabItems}
                        />

                        {loginType === 'account' && (
                            <>
                                <ProFormText
                                    name="userName"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <UserOutlined className={'prefixIcon'} />,
                                    }}
                                    placeholder={'Enter your username'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Username is required',
                                        },
                                    ]}
                                />
                                <ProFormText.Password
                                    name="password"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={'prefixIcon'} />,
                                        strengthText:
                                            'Password should contain numbers, letters and special characters, at least 8 characters long.',

                                        statusRender: (value) => {
                                            const getStatus = () => {
                                                if (value && value.length > 12) {
                                                    return 'ok';
                                                }
                                                if (value && value.length > 6) {
                                                    return 'pass';
                                                }
                                                return 'poor';
                                            };
                                            const status = getStatus();
                                            if (status === 'pass') {
                                                return (
                                                    <div style={{ color: token.colorWarning }}>Strength: Medium</div>
                                                );
                                            }
                                            if (status === 'ok') {
                                                return (
                                                    <div style={{ color: token.colorSuccess }}>Strength: strong</div>
                                                );
                                            }
                                            return <div style={{ color: token.colorError }}>Strength: weak</div>;
                                        },
                                    }}
                                    placeholder={'Enter your password'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is required',
                                        },
                                    ]}
                                />
                            </>
                        )}
                        {loginType === 'phone' && (
                            <>
                                <ProFormText
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <MobileOutlined className={'prefixIcon'} />,
                                    }}
                                    name="mobile"
                                    placeholder={'Enter your phone'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter phone number!',
                                        },
                                        {
                                            pattern: /^1\d{10}$/,
                                            message: 'Malformed phone number!',
                                        },
                                    ]}
                                />
                                <ProFormCaptcha
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={'prefixIcon'} />,
                                    }}
                                    captchaProps={{
                                        size: 'large',
                                    }}
                                    placeholder={'Enter the captcha'}
                                    captchaTextRender={(timing, count) => {
                                        if (timing) {
                                            return `${count} seconds later`;
                                        }
                                        return 'Get verification code';
                                    }}
                                    name="captcha"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter verification code!',
                                        },
                                    ]}
                                    onGetCaptcha={async () => {
                                        message.success(
                                            'Obtained verification code successfully! The verification code is: 1234',
                                        );
                                    }}
                                />
                            </>
                        )}
                        <div
                            style={{
                                marginBlockEnd: 24,
                            }}
                        >
                            <ProFormCheckbox noStyle name="autoLogin">
                                Keep me logged in
                            </ProFormCheckbox>
                            <Link
                                style={{
                                    float: 'right',
                                }}
                            >
                                Forgot password
                            </Link>
                        </div>
                    </LoginForm>
                </div>
            </ProConfigProvider>
        );
    } else {
        return <Navigate to="/" replace />;
    }
};

export default Login;
