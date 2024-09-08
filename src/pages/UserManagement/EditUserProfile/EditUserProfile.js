import React, { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './EditUserProfile.module.scss';
import ContentPageHeader from '~/components/ContentPageHeader';
import { Button, Divider, Form, Input, Popconfirm } from 'antd';
import withRouter from '~/helpers/withRouter';
import { connect } from 'react-redux';
import { clearUserState, getProfileUserById, updateProfileUser } from '~/redux/actions/userAction';

const cx = classNames.bind(styles);

class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {},
        };
        this.formRef = createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.userProfile && nextProps.userProfile.id !== prevState.userProfile.id) {
            return { ...prevState, userProfile: nextProps.userProfile };
        } else if (!nextProps.user) {
            return { ...prevState, userProfile: {} };
        }
        return null;
    }

    componentDidMount = () => {
        const { id } = this.props;
        this.props.getProfileUserById(id);
    };

    componentWillUnmount = () => {
        this.props.clearUserState();
    };

    // Handle Form
    confirmUpdate = () => {
        this.formRef.current.submit();
    };

    handleSubmitForm = (values) => {
        const { id } = this.props;
        const { username, ...restValues } = values;
        this.props.updateProfileUser(id, restValues);
    };

    render() {
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        const { userProfile } = this.state;

        return (
            <div>
                <ContentPageHeader navigate={navigate} title="Chỉnh sửa thông tin cá nhân" className={cx('')} />
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    labelAlign="left"
                    onFinish={this.handleSubmitForm}
                    ref={this.formRef}
                    key={userProfile.id}
                    disabled={isLoading}
                >
                    <Form.Item label="Tên đăng nhập" name="username" initialValue={userProfile.username}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        initialValue={userProfile.fullName}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone" initialValue={userProfile.phone}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" initialValue={userProfile.email}>
                        <Input />
                    </Form.Item>
                    <Divider />
                    <Popconfirm
                        title="Bạn có chắc muốn cập nhập thông tin này"
                        onConfirm={this.confirmUpdate}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button type="primary" loading={isLoading}>
                            Cập nhập thông tin
                        </Button>
                    </Popconfirm>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.commonReducer.isLoading,
    userProfile: state.userReducer.userProfile,
    id: state.jwtAuthReducer.id,
});

const mapDispatchToProps = {
    getProfileUserById,
    updateProfileUser,
    clearUserState,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUserProfile));
