import { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AddOrEditUser.module.scss';
import withRouter from '~/helpers/withRouter';
import { Button, Divider, Form, Input, Popconfirm, Select, Space } from 'antd';
import ContentPageHeader from '~/components/ContentPageHeader';
import { connect } from 'react-redux';
import { createUser, updateUser, getUserById, clearUserState, resetUserPassword } from '~/redux/actions/userAction';
import UserService from '~/services/userService';

const cx = classNames.bind(styles);

class AddOrEditBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            roles: [],
        };
        this.formRef = createRef();
    }

    // Handle Form
    confirmUpdate = () => {
        this.formRef.current.submit();
    };

    confirmResetPassword = () => {
        const { navigate } = this.props.router;
        const { id } = this.state.user;
        this.props.resetUserPassword(id, navigate);
    };
    handleSubmitForm = (values) => {
        const { navigate } = this.props.router;
        const { id } = this.state.user;
        if (id) {
            this.props.updateUser(id, values, navigate);
        } else {
            this.props.createUser(values, navigate);
        }
    };

    componentDidMount = () => {
        this.loadData();
        const { id } = this.props.router.params;
        if (id) {
            this.props.getUserById(id);
        } else {
            this.props.clearUserState();
        }
    };

    loadData = async () => {
        const userService = new UserService();
        const rolesResponse = await userService.getRoles();
        const roles = rolesResponse.data
            ? Object.entries(rolesResponse.data).map(([key, value]) => ({ value: key, label: value }))
            : [];

        this.setState({
            ...this.state,
            roles,
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user && nextProps.user.id !== prevState.user.id) {
            return { ...prevState, user: nextProps.user };
        } else if (!nextProps.user) {
            return { ...prevState, user: {} };
        }
        return null;
    }

    componentWillUnmount = () => {
        this.props.clearUserState();
    };

    render() {
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        const { user, roles } = this.state;

        let title = 'Thêm mới người dùng';
        if (user.id) {
            title = 'Cập nhập người dùng';
        }

        return (
            <div>
                <ContentPageHeader navigate={navigate} title={title} className={cx('')} />
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    labelAlign="left"
                    onFinish={this.handleSubmitForm}
                    key={user.id}
                    ref={this.formRef}
                    disabled={isLoading}
                >
                    <Form.Item label="ID" name="id" hidden={true} initialValue={user.id}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Vai trò"
                        name="roleCode"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn một vai trò!',
                            },
                        ]}
                        initialValue={user.roleCode}
                    >
                        <Select
                            style={{
                                width: 200,
                            }}
                            allowClear
                            options={roles}
                            placeholder="Chọn vai trò"
                        ></Select>
                    </Form.Item>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đăng nhập!',
                            },
                        ]}
                        initialValue={user.username}
                    >
                        <Input disabled={user.id} />
                    </Form.Item>

                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên!',
                            },
                        ]}
                        initialValue={user.fullName}
                    >
                        <Input />
                    </Form.Item>

                    <Divider />
                    {user.id ? (
                        <Space>
                            <Popconfirm
                                title="Bạn có chắc muốn cập nhập tài khoản này"
                                onConfirm={this.confirmUpdate}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <Button type="primary" loading={isLoading}>
                                    Cập nhập
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                title="Bạn có chắc muốn reset mật khẩu"
                                onConfirm={this.confirmResetPassword}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <Button type="primary" loading={isLoading}>
                                    Reset mật khẩu
                                </Button>
                            </Popconfirm>
                        </Space>
                    ) : (
                        <Button htmlType="submit" type="primary" loading={isLoading}>
                            Thêm mới
                        </Button>
                    )}
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getUserById,
    createUser,
    updateUser,
    clearUserState,
    resetUserPassword,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditBuilding));
