import classNames from 'classnames/bind';
import styles from './ListCustomer.module.scss';
import React, { Component } from 'react';
import { Button, Col, Collapse, Form, Input, Row, Select } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

class CustomerSearchForm extends Component {
    render() {
        const { staffs, searchingFormRef, handleSubmitForm, roleCode } = this.props;
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
                                    layout="vertical"
                                    onFinish={handleSubmitForm}
                                    ref={searchingFormRef}
                                    size="middle"
                                >
                                    <Row gutter={[24, 8]}>
                                        <Col md={8}>
                                            <Form.Item label="Họ và tên" name="fullName">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Số điện thoại" name="phone">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Email" name="email">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={[24, 8]}>
                                        {roleCode === 'ROLE_MANAGER' && (
                                            <Col md={6}>
                                                <Form.Item label="Tên nhân viên" name="staffId">
                                                    <Select
                                                        placeholder="Chọn một nhân viên"
                                                        allowClear
                                                        options={staffs}
                                                    ></Select>
                                                </Form.Item>
                                            </Col>
                                        )}
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={24}>
                                            <Button htmlType="submit" type="primary">
                                                Tìm kiếm
                                                <ArrowRightOutlined />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </>
                        ),
                    },
                ]}
            ></Collapse>
        );
    }
}

export default CustomerSearchForm;
