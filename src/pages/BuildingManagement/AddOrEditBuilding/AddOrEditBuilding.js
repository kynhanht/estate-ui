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
import ContentPageHeader from '~/components/ContentPageHeader';
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

        let title = 'Thêm mới tòa nhà';
        if (building.id) {
            title = 'Cập nhập tòa nhà';
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
                    <Form.Item label="ID" name="id" hidden={true} initialValue={building.id}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên tòa nhà"
                        name="buildingName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên tòa nhà!',
                            },
                        ]}
                        initialValue={building.buildingName}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Quận" name="districtCode" initialValue={building.districtCode}>
                        <Select allowClear options={buildingDistricts} placeholder="Chọn một quận"></Select>
                    </Form.Item>
                    <Form.Item label="Phường" name="ward" initialValue={building.ward}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Đường" name="street" initialValue={building.street}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Cấu trúc" name="structure" initialValue={building.structure}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số tầng hầm" name="numberOfBasement" initialValue={building.numberOfBasement}>
                        <InputNumber
                            min={1}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Diện tích sàn" name="floorArea" initialValue={building.floorArea}>
                        <InputNumber
                            min={0}
                            addonAfter={'m2'}
                            style={{
                                width: 120,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Hướng" name="direction" initialValue={building.direction}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Hạng" name="level" initialValue={building.level}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Diện tích thuê" name="rentArea" initialValue={building.rentArea}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả diện tích thuê"
                        name="rentAreaDescription"
                        initialValue={building.rentAreaDescription}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Giá thuê"
                        name="rentPrice"
                        initialValue={building.rentPrice}
                        rules={[{ required: true, message: 'Xin vui lòng nhập giá thuê!' }]}
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
                        label="Mô tả giá thuê"
                        name="rentPriceDescription"
                        initialValue={building.rentPriceDescription}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phí dịch vụ" name="serviceFee" initialValue={building.serviceFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phí ô tô" name="carFee" initialValue={building.carFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phí xe máy" name="motorbikeFee" initialValue={building.motorbikeFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phí ngoài giờ" name="overtimeFee" initialValue={building.overtimeFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tiền nước" name="waterFee" initialValue={building.waterFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tiền điện" name="electricityFee" initialValue={building.electricityFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Đặt cọc" name="deposit" initialValue={building.deposit}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Hình thức thanh toán" name="payment" initialValue={building.payment}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian thuê"
                        name="rentTime"
                        initialValue={building.rentTime ? dayjs(building.rentTime, dateFormat) : null}
                    >
                        <DatePicker format={dateFormat} placeholder="Select " />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian trang trí"
                        name="decorationTime"
                        initialValue={building.decorationTime ? dayjs(building.decorationTime, dateFormat) : null}
                    >
                        <DatePicker format={dateFormat} placeholder="Select Decoration Time" />
                    </Form.Item>
                    <Form.Item label="Tên người quản lý" name="managerName" initialValue={building.managerName}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="SĐT người quản lý" name="managerPhone" initialValue={building.managerPhone}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phí môi giới" name="brokerageFee" initialValue={building.brokerageFee}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Loại tòa nhà" name="buildingTypes" initialValue={building.buildingTypes || []}>
                        <Checkbox.Group options={buildingTypes} />
                    </Form.Item>
                    <Form.Item label="Ghi chú" name="note" initialValue={building.note}>
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.Item label="Link tòa nhà" name="linkOfBuilding" initialValue={building.linkOfBuilding}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Bản đồ" name="map" initialValue={building.map}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Hình ảnh"
                        name="imageFile"
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
                            title="Bạn có chắc muốn cập nhập tòa nhà này không?"
                            onConfirm={this.confirmUpdate}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="primary" loading={isLoading}>
                                Cập nhập
                            </Button>
                        </Popconfirm>
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
