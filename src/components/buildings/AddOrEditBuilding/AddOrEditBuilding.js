import { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './AddOrEditBuilding.module.scss';
import withRouter from '~/helpers/withRouter';
import { Button, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ContentPageHeader from '~/components/common/ContentPageHeader';
import { connect } from 'react-redux';

import { createBuilding } from '~/redux/actions/buildingAction';

const cx = classNames.bind(styles);

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

class AddOrEditBuilding extends Component {
    onSubmitForm = (values) => {
        const { navigate } = this.props.router;
        this.props.createBuilding(values, navigate);
    };

    render() {
        console.log('rendering');
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        return (
            <div>
                <ContentPageHeader navigate={navigate} title="Add New Building" className={cx('')} />
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    labelAlign="left"
                    onFinish={this.onSubmitForm}
                >
                    <Form.Item label="Building ID" name="Id" hidden={true}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Builiding Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="District" name="districtCode" initialValue={''}>
                        <Select
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={[
                                {
                                    value: 'Q1',
                                    label: 'Quận 1',
                                },
                                {
                                    value: 'Q2',
                                    label: 'Quận 2',
                                },
                                {
                                    value: 'Q3',
                                    label: 'Quận 3',
                                },
                                {
                                    value: 'Q4',
                                    label: 'Quận 4',
                                },
                            ]}
                        ></Select>
                    </Form.Item>
                    <Form.Item label="Ward" name="ward">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Street" name="street">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Structure" name="structure">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Basement Number" name="numberOfBasement">
                        <InputNumber
                            min={1}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Floor Area" name="floorArea">
                        <InputNumber
                            min={0}
                            addonAfter={'m2'}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Direction" name="direction">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Level" name="level">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rent Area" name="rentArea">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rent Area Description" name="rentAreaDescription">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Rent Price" name="rentPrice">
                        <InputNumber
                            min={0}
                            addonAfter={'$'}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Rent Price Description" name="rentPriceDescription">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Service Fee" name="serviceFee">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Car Fee" name="carFee">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Motobike Fee" name="motobikeFee">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Overtime Fee" name="overtimeFee">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Water Fee" name="waterFee">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Electricity Fee" name="electricityFee">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Deposit" name="deposit">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Payment" name="payment">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rent Time" name="rentTime">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Decoration Time" name="decorationTime">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Manager Name" name="managerName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Manager Phone" name="managerPhone">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Brokerage Fee" name="brokerageFee">
                        <Input />
                    </Form.Item>
                    {/* <Form.Item label="Building Types" >
                        <Checkbox.Group options={buildingTypesOption} name="buildingTypes"></Checkbox.Group>
                    </Form.Item> */}
                    <Form.Item name="buildingTypes" label="Building Types" initialValue={[]}>
                        <Checkbox.Group name="buildingTypes">
                            <Checkbox value="NOI_THAT">Nội Thất</Checkbox>
                            <Checkbox value="TANG_TRET">Tầng Trệt</Checkbox>
                            <Checkbox value="NGUYEN_CAN">Nguyên Căn</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label="Note" name="note">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Building Link" name="linkOfBuilding">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Map" name="map">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Choose your image"
                    >
                        <Upload listType="picture" maxCount={1} customRequest={dummyRequest}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Divider />
                    <Button htmlType="submit" type="primary" loading={isLoading}>
                        Save
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    building: state.buildingReducer.building,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    createBuilding,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditBuilding));
