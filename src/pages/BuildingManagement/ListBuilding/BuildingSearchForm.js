import classNames from 'classnames/bind';
import styles from './ListBuilding.module.scss';
import React, { Component } from 'react';
import { Button, Checkbox, Col, Collapse, Form, Input, InputNumber, Row, Select } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

class BuildingSearchForm extends Component {
    render() {
        const { buildingDistricts, buildingTypes, staffs, roleCode, searchingFormRef, handleSubmitForm } = this.props;
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
                                        <Col md={12}>
                                            <Form.Item label="Tên tòa nhà" name="buildingName">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Item label="Diện tích thuê" name="rentArea">
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
                                            <Form.Item label="Quận" name="districtCode">
                                                <Select
                                                    placeholder="Chọn một quận"
                                                    allowClear
                                                    options={buildingDistricts}
                                                ></Select>
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Phường" name="ward">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Đường" name="street">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={8}>
                                            <Form.Item label="Số tầng hầm" name="numberOfBasement">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Hướng" name="direction">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={8}>
                                            <Form.Item label="Hạng" name="level">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={6}>
                                            <Form.Item label="Diện tích thuê từ" name="rentAreaFrom">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Item label="Diện tích thuê đến" name="rentAreaTo">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Item label="Giá thuê từ" name="rentPriceFrom">
                                                <InputNumber
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Item label="Giá Thuê đến" name="rentPriceTo">
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
                                            <Form.Item label="Tên quản lý" name="managerName">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col md={9}>
                                            <Form.Item label="SĐT quản lý" name="managerPhone">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        {roleCode === 'ROLE_MANAGER' && (
                                            <Col md={6}>
                                                <Form.Item label="Nhân viên" name="staffId">
                                                    <Select
                                                        placeholder="Chọn một nhân viên"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        allowClear
                                                        options={staffs}
                                                    ></Select>
                                                </Form.Item>
                                            </Col>
                                        )}
                                    </Row>
                                    <Row gutter={[24, 8]}>
                                        <Col md={24}>
                                            <Form.Item name="buildingTypes" label="Loại tòa nhà" initialValue={[]}>
                                                <Checkbox.Group options={buildingTypes} />
                                            </Form.Item>
                                        </Col>
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

export default BuildingSearchForm;
