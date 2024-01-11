import { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AddOrEditBuilding.module.scss';
import withRouter from '~/helpers/withRouter';
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Form,
    Image,
    Input,
    InputNumber,
    Popconfirm,
    Select,
    Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ContentPageHeader from '~/components/common/ContentPageHeader';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import { createBuilding, updateBuilding, getBuildingById, clearBuilding } from '~/redux/actions/buildingAction';
import BuildingService from '~/services/buildingService';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cx = classNames.bind(styles);

const dateFormat = 'YYYY-MM-DD';

class AddOrEditBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            building: {},
            buildingDistricts: [],
            buildingTypes: [],
            isPreviewable: false,
            previewImage: '',
        };
        this.formRef = createRef();
    }

    // Upload Image
    normImageFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    handlePreviewImage = (file) => {
        console.log(file);
        if (file.url) {
            this.setState({ isPreviewable: true, previewImage: file.url });
        }
    };

    handleRemoveImage = (file) => {
        this.setState({ isPreviewable: false, previewImage: '' });
    };

    // Handle Form
    confirmUpdate = () => {
        this.formRef.current.submit();
    };
    handleSubmitForm = (values) => {
        const { navigate } = this.props.router;
        const { id } = this.state.building;
        const newValues = {
            ...values,
            rentTime: values.rentTime?.format(dateFormat),
            decorationTime: values.decorationTime?.format(dateFormat),
            imageName: values.imageFile[0] ? values.imageFile[0].uid : null,
            imageFile: values.imageFile[0]?.originFileObj ? values.imageFile[0].originFileObj : null,
        };
        console.log(values, newValues);
        if (id) {
            this.props.updateBuilding(id, newValues, navigate);
        } else {
            this.props.createBuilding(newValues, navigate);
        }
    };

    componentDidMount = () => {
        this.loadData();
        const { id } = this.props.router.params;
        if (id) {
            this.props.getBuildingById(id);
        } else {
            this.props.clearBuilding();
        }
    };

    loadData = async () => {
        const buildingService = new BuildingService();
        const buildingDistrictsResponse = await buildingService.getBuildingDistricts();
        const buildingDistricts = buildingDistrictsResponse.data
            ? Object.entries(buildingDistrictsResponse.data).map(([key, value]) => ({ value: key, label: value }))
            : [];

        const buildingTypesResponse = await buildingService.getBuildingTypes();
        const buildingTypes = buildingTypesResponse.data
            ? Object.entries(buildingTypesResponse.data).map(([key, value]) => ({ value: key, label: value }))
            : [];
        this.setState({
            ...this.state,
            buildingDistricts,
            buildingTypes,
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.building && nextProps.building.id !== prevState.building.id) {
            return { ...prevState, building: nextProps.building };
        } else if (!nextProps.building) {
            return { ...prevState, building: {} };
        }
        return null;
    }

    componentWillUnmount = () => {
        console.log('Will Unmount');
        this.props.clearBuilding();
    };

    render() {
        console.log('Rendering');
        const { navigate } = this.props.router;
        const { isLoading } = this.props;
        const { building, buildingDistricts, buildingTypes } = this.state;

        let initialImage = null;
        if (building.imageName) {
            initialImage = {
                url: BuildingService.getBuildingImageUrl(building.imageName),
                uid: building.imageName,
            };
        }

        let title = 'Add New Building';
        if (building.id) {
            title = 'Update Building';
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
                    key={building.id}
                    ref={this.formRef}
                    disabled={isLoading}
                >
                    <Form.Item label="Building ID" name="id" hidden={true} initialValue={building.id}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Building Name"
                        name="buildingName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Builiding Name!',
                            },
                        ]}
                        initialValue={building.buildingName}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="District" name="districtCode" initialValue={building.districtCode}>
                        <Select
                            style={{
                                width: 120,
                            }}
                            allowClear
                            options={buildingDistricts}
                            placeholder="Select District"
                        ></Select>
                    </Form.Item>
                    <Form.Item label="Ward" name="ward" initialValue={building.ward}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Street" name="street" initialValue={building.street}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Structure" name="structure" initialValue={building.structure}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Basement Number" name="numberOfBasement" initialValue={building.numberOfBasement}>
                        <InputNumber
                            min={1}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Floor Area" name="floorArea" initialValue={building.floorArea}>
                        <InputNumber
                            min={0}
                            addonAfter={'m2'}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Direction" name="direction" initialValue={building.direction}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Level" name="level" initialValue={building.level}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Rent Area" name="rentArea" initialValue={building.rentArea}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Rent Area Description"
                        name="rentAreaDescription"
                        initialValue={building.rentAreaDescription}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Rent Price"
                        name="rentPrice"
                        initialValue={building.rentPrice}
                        rules={[{ required: true, message: 'Please input Rent Price!' }]}
                        hasFeedback
                    >
                        <InputNumber
                            min={0}
                            addonAfter={'$'}
                            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Rent Price Description"
                        name="rentPriceDescription"
                        initialValue={building.rentPriceDescription}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Service Fee" name="serviceFee" initialValue={building.serviceFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Car Fee" name="carFee" initialValue={building.carFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Motorbike Fee" name="motorbikeFee" initialValue={building.motorbikeFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Overtime Fee" name="overtimeFee" initialValue={building.overtimeFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Water Fee" name="waterFee" initialValue={building.waterFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Electricity Fee" name="electricityFee" initialValue={building.electricityFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Deposit" name="deposit" initialValue={building.deposit}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Payment" name="payment" initialValue={building.payment}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Rent Time"
                        name="rentTime"
                        initialValue={building.rentTime ? dayjs(building.rentTime, dateFormat) : null}
                    >
                        <DatePicker format={dateFormat} placeholder="Select Rent Time" />
                    </Form.Item>
                    <Form.Item
                        label="Decoration Time"
                        name="decorationTime"
                        initialValue={building.decorationTime ? dayjs(building.decorationTime, dateFormat) : null}
                    >
                        <DatePicker format={dateFormat} placeholder="Select Decoration Time" />
                    </Form.Item>
                    <Form.Item label="Manager Name" name="managerName" initialValue={building.managerName}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Manager Phone" name="managerPhone" initialValue={building.managerPhone}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Brokerage Fee" name="brokerageFee" initialValue={building.brokerageFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="buildingTypes" label="Building Types" initialValue={building.buildingTypes || []}>
                        <Checkbox.Group options={buildingTypes} />
                    </Form.Item>
                    <Form.Item label="Note" name="note" initialValue={building.note}>
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.Item label="Building Link" name="linkOfBuilding" initialValue={building.linkOfBuilding}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Map" name="map" initialValue={building.map}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="imageFile"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={this.normImageFile}
                        extra="Choose your image"
                        initialValue={initialImage ? [initialImage] : []}
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                            accept=".jpg,.png,.gif"
                            onPreview={this.handlePreviewImage}
                            onRemove={this.handleRemoveImage}
                            multiple={true}
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    {this.state.isPreviewable && (
                        <>
                            <Divider />
                            <Image src={this.state.previewImage} style={{ width: 200 }} />
                        </>
                    )}
                    <Divider />
                    {building.id ? (
                        <Popconfirm
                            title="Are you sure update this building"
                            onConfirm={this.confirmUpdate}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" loading={isLoading}>
                                Update
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Button htmlType="submit" type="primary" loading={isLoading}>
                            Save
                        </Button>
                    )}
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
    getBuildingById,
    createBuilding,
    updateBuilding,
    clearBuilding,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditBuilding));
