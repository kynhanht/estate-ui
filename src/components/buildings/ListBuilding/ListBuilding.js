import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './ListBuilding.module.scss';
import withRouter from '~/helpers/withRouter';
import ContentPageHeader from '~/components/common/ContentPageHeader/ContentPageHeader';
import '~/assets/fonts';

import {
    Typography,
    Button,
    Space,
    Table,
    Divider,
    Collapse,
    Form,
    Input,
    Row,
    Col,
    InputNumber,
    Select,
    Checkbox,
    Modal,
    Skeleton,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CarryOutOutlined,
    PlusCircleFilled,
    ArrowRightOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

import { downloadExcel } from 'react-export-table-to-excel';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { connect } from 'react-redux';
import {
    searchBuildings,
    getBuildingDistricts,
    getBuildingTypes,
    assignBuilding,
    deleteBuildings,
    clearBuildingState,
} from '~/redux/actions/buildingAction';
import { getStaffs, getStaffsByBuildingId, clearUserState } from '~/redux/actions/userAction';
import { setLoading } from '~/redux/actions/commonAction';

const cx = classNames.bind(styles);
const tableHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Building Name', key: 'buildingName' },
    { label: 'Number Of Basement', key: 'numberOfBasement' },
    { label: 'Address', key: 'address' },
    { label: 'Manager Name', key: 'managerName' },
    { label: 'Manager Phone', key: 'managerPhone' },
    { label: 'Rent Price', key: 'rentPrice' },
    { label: 'Service Fee', key: 'serviceFee' },
];

class ListBuilding extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Building Name',
                key: 'buildingName',
                dataIndex: 'buildingName',
                align: 'left',
            },
            {
                title: 'Number Of Basement',
                key: 'numberOfBasement',
                dataIndex: 'numberOfBasement',
                align: 'left',
                // defaultSortOrder: 'descend',
                sorter: (a, b) => a.numberOfBasement - b.numberOfBasement,
            },
            {
                title: 'Address',
                key: 'address',
                dataIndex: 'address',
                align: 'left',
            },
            {
                title: 'Manger Name',
                key: 'managerName',
                dataIndex: 'managerName',
                align: 'left',
            },
            {
                title: 'Manger Phone',
                key: 'managerPhone',
                dataIndex: 'managerPhone',
                align: 'left',
            },
            {
                title: 'Rent Price',
                key: 'rentPrice',
                dataIndex: 'rentPrice',
                align: 'left',
                width: 150,
            },
            {
                title: 'Service Fee',
                key: 'serviceFee',
                dataIndex: 'serviceFee',
                align: 'left',
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (_, building) => {
                    return (
                        <Space size="middle">
                            <Button
                                key={building.id}
                                type="primary"
                                size="large"
                                onClick={() => this.openAssignmentModal(building.id)}
                                icon={<CarryOutOutlined />}
                            ></Button>
                            <Button
                                key={building.key}
                                type="primary"
                                size="large"
                                onClick={() => this.handleEditBuilding(building.id)}
                                icon={<EditOutlined />}
                            ></Button>
                        </Space>
                    );
                },
            },
        ];
        this.state = {
            buildingCriterias: {},
            building: {},
            selectedBuildings: [],
            selectedStaffs: [],
            selectedAssignmentBuilding: null,
            isDeletable: false,
            isModalOpen: false,
        };
    }
    componentDidMount = async () => {
        console.log('did mount');
        this.props.searchBuildings({});
        this.props.getBuildingDistricts();
        this.props.getBuildingTypes();
        this.props.getStaffs();
    };

    componentWillUnmount = () => {
        console.log('will unmount');
        this.props.clearBuildingState();
        this.props.clearUserState();
    };

    // Search Form
    handleSubmitForm = (values) => {
        this.setState({ buildingCriterias: values });
        this.props.searchBuildings(values);
    };
    // Edit
    handleEditBuilding = (buildingId) => {
        const { navigate } = this.props.router;
        navigate(`/buildings/edit/${buildingId}`);
    };

    // Asignment Modal
    openAssignmentModal = async (buildingId) => {
        await this.props.getStaffsByBuildingId(buildingId);
        this.setState({
            isModalOpen: true,
            selectedStaffs: this.props.staffsByBuildingId
                .filter((record) => record.checked)
                .map((record) => record.staffId),
            selectedAssignmentBuilding: buildingId,
        });
    };

    handleAssignmentOk = async () => {
        await this.props.assignBuilding({
            staffIds: this.state.selectedStaffs,
            buildingId: this.state.selectedAssignmentBuilding,
        });
        this.setState({ isModalOpen: false, selectedStaffs: [], selectedAssignmentBuilding: null });
    };

    handleAssignmentCancel = () => {
        this.setState({ isModalOpen: false, selectedStaffs: [], selectedAssignmentBuilding: null });
    };

    // Delete Building Modal
    openDeleteBuildingsCofirmModal = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete the buildings',
            onOk: this.handleDeleteBuildingsOk,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            height: 400,
        });
    };

    handleDeleteBuildingsOk = async () => {
        await this.props.deleteBuildings(this.state.selectedBuildings);
        await this.props.searchBuildings({});
    };

    // Export
    handleExportExcel = (buildings) => {
        const headers = tableHeaders.map((column) => column.label);
        const data = buildings.map((building) => [
            building.id,
            building.buildingName,
            building.numberOfBasement,
            building.address,
            building.managerName,
            building.managerPhone,
            building.rentPrice,
            building.serviceFee,
        ]);
        downloadExcel({
            fileName: 'Building_List',
            sheet: 'List of Buildings',
            tablePayload: {
                header: headers,
                // accept two different data structures
                body: data || buildings,
            },
        });
    };

    handleExportPDF = (buildings) => {
        const pdf = new jsPDF({
            unit: 'pt', // pt, px, mm
            size: 'A4', // Use A1, A2, A3 or A4
            orientation: 'portrait', // portrait or landscape
        });

        const headers = tableHeaders.map((column) => ({ header: column.label, dataKey: column.key }));
        const data = buildings.map((building) => Object.values(building));
        const title = 'List of Buildings';
        pdf.text(title, 40, 40);
        pdf.setFont('Roboto', 'bold');
        pdf.setFontSize(20);

        autoTable(pdf, {
            startY: 50,
            columns: headers,
            body: data,
            theme: 'grid',
            styles: {
                font: 'Roboto',
                fontStyle: 'normal',
                fontSize: 10,
            },
            headStyles: {
                cellPadding: 2,
                fontStyle: 'bold',
                fillColor: [250, 152, 95],
                halign: 'center', // Horizontal alignment: 'left'|'center'|'right' = 'left'
                valign: 'middle', // Vertical alignment: 'top'|'middle'|'bottom' = 'top'
                lineWidth: 1,
                lineColor: 'gray',
            },
            bodyStyles: {
                lineWidth: 1,
                lineColor: 'gray',
            },
        });
        pdf.save('Building_List.pdf');
    };

    render() {
        console.log('Rendering');

        const { listResult: buildings = [], pageSize = 4, page = 1, totalItems = 0 } = this.props.buildingSearch;
        const staffs = this.props.staffs
            ? Object.entries(this.props.staffs).map(([key, value]) => ({ value: key, label: value }))
            : [];

        const buildingTypes = this.props.buildingTypes
            ? Object.entries(this.props.buildingTypes).map(([key, value]) => ({ value: key, label: value }))
            : [];

        const buildingDistricts = this.props.buildingDistricts
            ? Object.entries(this.props.buildingDistricts).map(([key, value]) => ({ value: key, label: value }))
            : [];

        const { navigate } = this.props.router;
        const { isLoading, staffsByBuildingId } = this.props;
        const { isModalOpen } = this.state;

        return (
            <>
                <ContentPageHeader navigate={navigate} title="List Buildings" className={cx('')} />

                <Collapse
                    size="small"
                    defaultActiveKey={['collapsePanel1']}
                    expandIconPosition="end"
                    items={[
                        {
                            key: 'collapsePanel1',
                            label: 'Search',
                            children: (
                                <>
                                    <Form layout="vertical" onFinish={this.handleSubmitForm} size="large">
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
                                                        style={{
                                                            width: 120,
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
                                                <Form.Item
                                                    name="buildingTypes"
                                                    label="Building Types"
                                                    initialValue={[]}
                                                >
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

                <Space
                    size="small"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        margin: '20px 0',
                    }}
                >
                    <Button
                        icon={
                            <PlusCircleFilled
                                style={{
                                    color: '#a069c3',
                                }}
                            />
                        }
                        size="large"
                    />
                    <Button
                        icon={
                            <DeleteOutlined
                                style={{
                                    color: '#a069c3',
                                }}
                            />
                        }
                        size="large"
                        disabled={!this.state.isDeletable}
                        onClick={this.openDeleteBuildingsCofirmModal}
                    />
                </Space>
                <Typography.Title level={4}>List Buildings</Typography.Title>
                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <>
                        <Table
                            dataSource={buildings}
                            size="small"
                            rowKey="id"
                            bordered
                            rowSelection={{
                                type: 'checkbox',
                                onChange: (selectedRowKeys) => {
                                    this.setState({
                                        selectedBuildings: selectedRowKeys,
                                        isDeletable: selectedRowKeys.length > 0,
                                    });
                                },
                            }}
                            columns={this.columns}
                            pagination={{
                                pageSizeOptions: ['2', '4', '6', '8', '10'],
                                showSizeChanger: true,
                                defaultPageSize: pageSize,
                                current: page,
                                total: totalItems,

                                onChange: (page, pageSize) => {
                                    const { buildingCriterias } = this.state;
                                    this.props.searchBuildings({ page, pageSize, ...buildingCriterias });
                                },
                            }}
                        />
                        <Typography.Text style={{ marginRight: '20px' }}>Export options:</Typography.Text>
                        <Space split={<Divider type="vertical" />}>
                            <CSVLink
                                filename={'Building_List.csv'}
                                data={buildings}
                                headers={tableHeaders}
                                target="_blank"
                            >
                                CSV
                            </CSVLink>
                            <Typography.Link onClick={() => this.handleExportExcel(buildings)}>Excel</Typography.Link>
                            <Typography.Link onClick={() => this.handleExportPDF(buildings)}>PDF</Typography.Link>
                        </Space>
                        <Modal
                            title="List of Staffs"
                            open={isModalOpen}
                            width={'40vw'}
                            onOk={this.handleAssignmentOk}
                            onCancel={this.handleAssignmentCancel}
                            destroyOnClose={true}
                        >
                            <Divider />
                            <Table
                                dataSource={staffsByBuildingId}
                                size="large"
                                rowKey="staffId"
                                bordered
                                rowSelection={{
                                    type: 'checkbox',
                                    columnTitle: 'Select',
                                    columnWidth: '50%',
                                    defaultSelectedRowKeys: staffsByBuildingId
                                        .filter((record) => record.checked)
                                        .map((record) => record.staffId),
                                    onChange: (selectedRowKeys) => {
                                        this.setState({
                                            selectedStaffs: selectedRowKeys,
                                        });
                                    },
                                }}
                                columns={[
                                    {
                                        title: 'Name Staff',
                                        key: 'fullName',
                                        dataIndex: 'fullName',
                                        align: 'left',
                                    },
                                ]}
                            />
                            <Divider />
                        </Modal>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    buildingSearch: state.buildingReducer.buildingSearch,
    buildingDistricts: state.buildingReducer.buildingDistricts,
    buildingTypes: state.buildingReducer.buildingTypes,
    staffs: state.userReducer.staffs,
    staffsByBuildingId: state.userReducer.staffsByBuildingId,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    searchBuildings,
    getBuildingDistricts,
    getBuildingTypes,
    deleteBuildings,
    clearBuildingState,
    getStaffs,
    getStaffsByBuildingId,
    assignBuilding,
    clearUserState,
    setLoading,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListBuilding));
