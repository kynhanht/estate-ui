import classNames from 'classnames/bind';
import styles from './ListBuilding.module.scss';
import React, { Component } from 'react';
import { Button, Divider, Image, Modal, Space, Table, Typography } from 'antd';
import {
    EditOutlined,
    CarryOutOutlined,
    DeleteOutlined,
    PlusCircleFilled,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

import '~/assets/fonts';
import { downloadExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import BuildingService from '~/services/buildingService';
import UserSerive from '~/services/userService';

const cx = classNames.bind(styles);

const tableHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Image Name', key: 'imageName' },
    { label: 'Building Name', key: 'buildingName' },
    { label: 'Number Of Basement', key: 'numberOfBasement' },
    { label: 'Address', key: 'address' },
    { label: 'Manager Name', key: 'managerName' },
    { label: 'Manager Phone', key: 'managerPhone' },
    { label: 'Rent Price', key: 'rentPrice' },
    { label: 'Service Fee', key: 'serviceFee' },
];

class BuildingList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Ảnh tòa nhà',
                key: 'imageName',
                dataIndex: 'imageName',
                width: 150,
                align: 'center',
                render: (_, record) => {
                    return (
                        <Space size="middle">
                            <Image
                                width="100%"
                                src={record.imageName ? BuildingService.getBuildingImageUrl(record.imageName) : ''}
                            />
                        </Space>
                    );
                },
            },
            {
                title: 'Tên tòa nhà',
                key: 'buildingName',
                dataIndex: 'buildingName',
                align: 'left',
            },
            {
                title: 'Số tầng hầm',
                key: 'numberOfBasement',
                dataIndex: 'numberOfBasement',
                align: 'left',
                // defaultSortOrder: 'descend',
                sorter: (a, b) => a.numberOfBasement - b.numberOfBasement,
            },
            {
                title: 'Địa chỉ',
                key: 'address',
                dataIndex: 'address',
                align: 'left',
            },
            {
                title: 'Tên quản lý',
                key: 'managerName',
                dataIndex: 'managerName',
                align: 'left',
            },
            {
                title: 'SĐT quản lý',
                key: 'managerPhone',
                dataIndex: 'managerPhone',
                align: 'left',
            },
            {
                title: 'Giá thuê',
                key: 'rentPrice',
                dataIndex: 'rentPrice',
                align: 'left',
                width: 150,
            },
            {
                title: 'Giá dịch vụ',
                key: 'serviceFee',
                dataIndex: 'serviceFee',
                align: 'left',
            },
            {
                title: 'Thao tác',
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
            selectedBuildings: [],
            selectedStaffs: [],
            staffs: [],
            selectedAssignmentBuilding: null,
            isDeletable: false,
            isModalOpen: false,
        };
    }

    // Export
    handleExportExcel = (buildings) => {
        const headers = tableHeaders.map((column) => column.label);
        const data = buildings.map((building) => [
            building.id,
            building.imageName,
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
    // Handle building table
    handleBuildingSelection = (selectedRowKeys) => {
        this.setState({
            selectedBuildings: selectedRowKeys,
            isDeletable: selectedRowKeys.length > 0,
        });
    };

    handleBuildingPagination = (page, pageSize) => {
        const searchingValues = this.props.searchingFormRef.current.getFieldsValue();
        this.props.searchBuildings(searchingValues, { page: page - 1, size: pageSize });
    };

    // Add Building
    handleAddBuilding = () => {
        const { navigate } = this.props;
        navigate('/buildings/add');
    };
    // Edit Building
    handleEditBuilding = (buildingId) => {
        const { navigate } = this.props;
        navigate(`/buildings/edit/${buildingId}`);
    };

    // Delete Building
    openDeleteBuildingsCofirmModal = () => {
        Modal.confirm({
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn xóa những tòa nhà này không?',
            onOk: this.handleDeleteBuildingsOk,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            height: 400,
        });
    };

    handleDeleteBuildingsOk = async () => {
        await this.props.deleteBuildings(this.state.selectedBuildings);
        await this.props.searchBuildings({});
    };

    // Asignment building for staffs
    openAssignmentModal = async (buildingId) => {
        try {
            const userService = new UserSerive();
            const staffsRespone = await userService.getStaffsByBuildingId(buildingId);
            const staffs = staffsRespone.data;
            const selectedStaffs = staffs.filter((record) => record.checked);
            this.setState({
                isModalOpen: true,
                staffs: staffs,
                selectedStaffs: selectedStaffs,
                selectedAssignmentBuilding: buildingId,
            });
        } catch (error) {}
    };

    handleAssignmentOk = async () => {
        await this.props.assignBuilding({
            staffIds: this.state.selectedStaffs,
            buildingId: this.state.selectedAssignmentBuilding,
        });
        this.setState({
            isModalOpen: false,
            staffs: [],
            selectedStaffs: [],
            selectedAssignmentBuilding: null,
        });
    };

    handleAssignmentCancel = () => {
        this.setState({
            isModalOpen: false,
            staffs: [],
            selectedStaffs: [],
            selectedAssignmentBuilding: null,
        });
    };

    handleStaffSelection = (selectedRowKeys) => {
        this.setState({
            selectedStaffs: selectedRowKeys,
        });
    };

    render() {
        console.log('Rendering(BuildingList)');
        const { buildings, pagination } = this.props;
        const { page, size, totalElements } = pagination;
        const { staffs, selectedStaffs } = this.state;
        return (
            <>
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
                        onClick={this.handleAddBuilding}
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
                <Table
                    title={() => (
                        <div style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>
                            Danh sách tòa nhà
                        </div>
                    )}
                    className={cx('')}
                    dataSource={buildings}
                    size="small"
                    rowKey="id"
                    bordered
                    rowSelection={{
                        type: 'checkbox',
                        onChange: this.handleBuildingSelection,
                    }}
                    columns={this.columns}
                    pagination={{
                        pageSizeOptions: ['2', '4', '6', '8', '10'],
                        showSizeChanger: true,
                        defaultPageSize: size,
                        current: page,
                        total: totalElements,
                        onChange: this.handleBuildingPagination,
                    }}
                />
                <Typography.Text style={{ marginRight: '20px' }}>Xuất file:</Typography.Text>
                <Space split={<Divider type="vertical" />}>
                    <Typography.Link onClick={() => this.handleExportExcel(buildings)}>Excel</Typography.Link>
                    <Typography.Link onClick={() => this.handleExportPDF(buildings)}>PDF</Typography.Link>
                </Space>
                <Modal
                    title="Giao tòa nhà cho nhân viên"
                    open={this.state.isModalOpen}
                    width={'40vw'}
                    onOk={this.handleAssignmentOk}
                    onCancel={this.handleAssignmentCancel}
                    okText="Xác nhận"
                    cancelText="Hủy"
                    destroyOnClose={true}
                >
                    <Divider />
                    <Table
                        dataSource={staffs}
                        size="large"
                        rowKey="staffId"
                        bordered
                        rowSelection={{
                            type: 'checkbox',
                            columnTitle: 'Chọn',
                            columnWidth: '50%',
                            defaultSelectedRowKeys: selectedStaffs.map((staff) => staff.staffId),
                            onChange: this.handleStaffSelection,
                        }}
                        columns={[
                            {
                                title: 'Tên nhân viên',
                                key: 'fullName',
                                dataIndex: 'fullName',
                                align: 'left',
                            },
                        ]}
                    />
                    <Divider />
                </Modal>
            </>
        );
    }
}

export default BuildingList;
