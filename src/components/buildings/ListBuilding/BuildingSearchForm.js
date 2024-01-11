import classNames from 'classnames/bind';
import styles from './ListBuilding.module.scss';
import React, { Component } from 'react';
import { Button, Checkbox, Col, Collapse, Form, Input, InputNumber, Row, Select } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

class BuildingSearchForm extends Component {
    render() {
        const { buildingDistricts, buildingTypes, staffs, searchingFormRef, handleSubmitForm } = this.props;
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
                                        <Col md={12}>
                                            <Form.Item label="Building Name" name="buildingName">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Item label="Rent Area" name="rentArea">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={8}>
                                            <Form.Item label="District" name="districtCode">
                                                <Select
                                                    placeholder="Select District"
                                                    style={{
                                                        width: '40%',
                                                    }}
                                                    allowClear
                                                    options={buildingDistricts}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Ward" name="ward">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Street" name="street">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={8}>
                                            <Form.Item label="Number of Basement" name="numberOfBasement">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Direction" name="direction">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Level" name="level">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={6}>
                                            <Form.Item label="Rent Area From" name="rentAreaFrom">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Item label="Rent Area To" name="rentAreaTo">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Item label="Rent Price From" name="rentPriceFrom">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Item label="Rent Price To" name="rentPriceTo">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={9}>
                                            <Form.Item label="Manager Name" name="managerName">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Item label="Manager Phone" name="Manager Phone">
                                                <Input />
                                            </Form.Item>
                                        </Col>
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
                                            <Form.Item name="buildingTypes" label="Building Types" initialValue={[]}>
                                                <Checkbox.Group options={buildingTypes} />
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

export default BuildingSearchForm;
