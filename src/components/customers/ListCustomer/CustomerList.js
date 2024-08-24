import classNames from 'classnames/bind';
import styles from './ListCustomer.module.scss';
import React, { Component } from 'react';
import { Button, Divider, Modal, Space, Table, Typography } from 'antd';
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
import UserSerive from '~/services/userService';

const cx = classNames.bind(styles);

const tableHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'phone', key: 'phone' },
    { label: 'email', key: 'email' },
    { label: 'Demand', key: 'demand' },
    { label: 'Modified By', key: 'modifiedBy' },
    { label: 'Modified Date', key: 'modifiedDate' },
    { label: 'Status', key: 'status' },
];

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Họ và tên',
                key: 'fullName',
                dataIndex: 'fullName',
                align: 'left',
            },
            {
                title: 'Số điện thoại',
                key: 'phone',
                dataIndex: 'phone',
                align: 'left',
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'email',
                align: 'left',
            },
            {
                title: 'Nhu cầu',
                key: 'demand',
                dataIndex: 'demand',
                align: 'left',
            },
            {
                title: 'Sửa đổi bởi',
                key: 'modifiedBy',
                dataIndex: 'modifiedBy',
                align: 'left',
            },
            {
                title: 'Ngày sửa đổi',
                key: 'modifiedDate',
                dataIndex: 'modifiedDate',
                align: 'left',
            },
            {
                title: 'Thao tác',
                key: 'action',
                align: 'center',
                render: (_, customer) => {
                    return (
                        <Space size="middle">
                            <Button
                                key={customer.id}
                                type="primary"
                                size="large"
                                onClick={() => this.openAssignmentModal(customer.id)}
                                icon={<CarryOutOutlined />}
                            ></Button>
                            <Button
                                key={customer.key}
                                type="primary"
                                size="large"
                                onClick={() => this.handleEditCustomer(customer.id)}
                                icon={<EditOutlined />}
                            ></Button>
                        </Space>
                    );
                },
            },
        ];
        this.state = {
            selectedCustomers: [],
            selectedStaffs: [],
            staffs: [],
            selectedAssignmentCustomer: null,
            isDeletable: false,
            isModalOpen: false,
        };
    }

    // Export
    handleExportExcel = (customers) => {
        const headers = tableHeaders.map((column) => column.label);
        const data = customers.map((customter) => [
            customter.id,
            customter.fullName,
            customter.phone,
            customter.email,
            customter.demand,
            customter.modifiedBy,
            customter.modifiedDate,
            customter.status,
        ]);
        downloadExcel({
            fileName: 'Customer_List',
            sheet: 'List of Customer',
            tablePayload: {
                header: headers,
                // accept two different data structures
                body: data || customers,
            },
        });
    };

    handleExportPDF = (customers) => {
        const pdf = new jsPDF({
            unit: 'pt', // pt, px, mm
            size: 'A4', // Use A1, A2, A3 or A4
            orientation: 'portrait', // portrait or landscape
        });

        const headers = tableHeaders.map((column) => ({ header: column.label, dataKey: column.key }));
        const data = customers.map((customer) => Object.values(customer));
        console.log(headers, data);
        const title = 'List of Customers';
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
        pdf.save('Customer_List.pdf');
    };
    // Handle customer table
    handleCustomerSelection = (selectedRowKeys) => {
        this.setState({
            selectedCustomers: selectedRowKeys,
            isDeletable: selectedRowKeys.length > 0,
        });
    };

    handleCustomerPagination = (page, pageSize) => {
        const searchingValues = this.props.searchingFormRef.current.getFieldsValue();
        this.props.searchCustomers(searchingValues, { page: page - 1, size: pageSize });
    };

    // Add customer
    handleAddCustomer = () => {
        const { navigate } = this.props;
        navigate('/customers/add');
    };
    // Edit customer
    handleEditCustomer = (customerId) => {
        const { navigate } = this.props;
        navigate(`/customers/edit/${customerId}`);
    };

    // Delete customer
    openDeleteCustomersConfirmModal = () => {
        Modal.confirm({
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn xóa những khách hàng này không?',
            onOk: this.handleDeleteCustomersOk,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            height: 400,
        });
    };

    handleDeleteCustomersOk = async () => {
        await this.props.deleteCustomers(this.state.selectedCustomers);
        await this.props.searchCustomers({});
    };

    // Asignment customer for staffs
    openAssignmentModal = async (customerId) => {
        try {
            const userService = new UserSerive();
            const staffsRespone = await userService.getStaffsByCustomerId(customerId);
            const staffs = staffsRespone.data;
            const selectedStaffs = staffs.filter((record) => record.checked);
            this.setState({
                isModalOpen: true,
                staffs: staffs,
                selectedStaffs: selectedStaffs,
                selectedAssignmentCustomer: customerId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    handleAssignmentOk = async () => {
        await this.props.assignCustomer({
            staffIds: this.state.selectedStaffs,
            customerId: this.state.selectedAssignmentCustomer,
        });
        this.setState({
            isModalOpen: false,
            staffs: [],
            selectedStaffs: [],
            selectedAssignmentCustomer: null,
        });
    };

    handleAssignmentCancel = () => {
        this.setState({
            isModalOpen: false,
            staffs: [],
            selectedStaffs: [],
            selectedAssignmentCustomer: null,
        });
    };

    handleStaffSelection = (selectedRowKeys) => {
        this.setState({
            selectedStaffs: selectedRowKeys,
        });
    };

    render() {
        console.log('Rendering(CustomerList)');
        const { customers, pagination } = this.props;
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
                        onClick={this.handleAddCustomer}
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
                        onClick={this.openDeleteCustomersConfirmModal}
                    />
                </Space>
                <Table
                    className={cx('')}
                    title={() => (
                        <div style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>
                            Danh sách khách hàng
                        </div>
                    )}
                    dataSource={customers}
                    size="small"
                    rowKey="id"
                    bordered
                    rowSelection={{
                        type: 'checkbox',
                        onChange: this.handleCustomerSelection,
                    }}
                    columns={this.columns}
                    pagination={{
                        pageSizeOptions: ['2', '4', '6', '8', '10'],
                        showSizeChanger: true,
                        defaultPageSize: size,
                        current: page,
                        total: totalElements,
                        onChange: this.handleCustomerPagination,
                    }}
                />
                <Typography.Text style={{ marginRight: '20px' }}>Xuất file:</Typography.Text>
                <Space split={<Divider type="vertical" />}>
                    <Typography.Link onClick={() => this.handleExportExcel(customers)}>Excel</Typography.Link>
                    <Typography.Link onClick={() => this.handleExportPDF(customers)}>PDF</Typography.Link>
                </Space>
                <Modal
                    title="Giao khách hàng cho nhân viên"
                    open={this.state.isModalOpen}
                    width={'40vw'}
                    onOk={this.handleAssignmentOk}
                    onCancel={this.handleAssignmentCancel}
                    destroyOnClose={true}
                    cancelText="Hủy"
                    okText="Xác nhận"
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

export default CustomerList;
