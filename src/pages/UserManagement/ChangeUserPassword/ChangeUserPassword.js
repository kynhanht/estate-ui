import React, { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ChangeUserPassoword.module.scss';
import withRouter from '~/helpers/withRouter';
import { connect } from 'react-redux';
import { changeUserPassoword } from '~/redux/actions/userAction';
import { Button, Divider, Form, Input } from 'antd';
import ContentPageHeader from '~/components/ContentPageHeader';

const cx = classNames.bind(styles);

class ChangeUserPassoword extends Component {
    constructor(props) {
        super(props);
        this.formRef = createRef();
    }

    handleSubmitForm = (values) => {
        const { id } = this.props;
        this.props.changeUserPassoword(id, values);
        this.formRef.current.resetFields();
    };

    render() {
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        return (
            <div>
                <ContentPageHeader navigate={navigate} title="Đổi mật khẩu" className={cx('')} />
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    labelAlign="left"
                    onFinish={this.handleSubmitForm}
                    ref={this.formRef}
                    disabled={isLoading}
                >
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu cũ!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu mới!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu mới"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu mới!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Divider />

                    <Button htmlType="submit" type="primary" loading={isLoading}>
                        Đổi mật khẩu
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.commonReducer.isLoading,
    id: state.jwtAuthReducer.id,
});

const mapDispatchToProps = {
    changeUserPassoword,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangeUserPassoword));
