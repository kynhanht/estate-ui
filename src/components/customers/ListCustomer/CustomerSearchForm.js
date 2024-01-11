import classNames from 'classnames/bind';
import styles from './ListCustomer.module.scss';
import React, { Component } from 'react';
import { Button, Col, Collapse, Form, Input, Row, Select } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

class CustomerSearchForm extends Component {
    render() {
        const { staffs, searchingFormRef, handleSubmitForm } = this.props;
        return (
            <Collapse
                className={cx('')}
                size="small"
                defaultActiveKey={['collapsePanel1']}
                expandIconPosition="end"
                items={[
                    {
                        key: 'collapsePanel1',
                        label: 'Search',
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
                                            <Form.Item label="Full name" name="fullName">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Phone" name="phone">
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
                                        <Col md={6}>
                                            <Form.Item label="Staff" name="staffId">
                                                <Select
                                                    placeholder="Select staff"
                                                    style={{
                                                        width: 200,
                                                    }}
                                                    allowClear
                                                    options={staffs}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={24}>
                                            <Button htmlType="submit" type="primary">
                                                Search
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
