import classNames from 'classnames/bind';
import styles from './ListUser.module.scss';
import React, { Component } from 'react';
import { Button, Collapse, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

class UserSearchForm extends Component {
    render() {
        const { searchingFormRef, handleSubmitForm } = this.props;
        return (
            <Collapse
                className={cx('')}
                size="medium"
                defaultActiveKey={['collapsePanel1']}
                expandIconPosition="end"
                items={[
                    {
                        key: 'collapsePanel1',
                        label: 'Tìm kiếm',
                        children: (
                            <>
                                <Form
                                    layout="horizontal"
                                    labelCol={{
                                        span: 4,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    size="middle"
                                    onFinish={handleSubmitForm}
                                    ref={searchingFormRef}
                                >
                                    <Form.Item label="Tên đăng nhập" name="username">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 4, span: 6 }}>
                                        <Button htmlType="submit" type="primary">
                                            Tìm kiếm
                                            <ArrowRightOutlined />
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </>
                        ),
                    },
                ]}
            ></Collapse>
        );
    }
}

export default UserSearchForm;
