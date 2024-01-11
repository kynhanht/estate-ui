import classNames from 'classnames/bind';
import styles from './ListUser.module.scss';
import React, { Component } from 'react';
import { Button, Divider, Modal, Space, Table, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';

import '~/assets/fonts';
import { downloadExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const cx = classNames.bind(styles);

const tableHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'User Name', key: 'userName' },
    { label: 'Phone', key: 'phone' },
    { label: 'Email', key: 'email' },
    { label: 'Status', key: 'status' },
    { label: 'Role', key: 'roleCode' },
];

class UserList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'User Name',
                key: 'userName',
                dataIndex: 'userName',
                align: 'left',
            },
            {
                title: 'Full Name',
                key: 'fullName',
                dataIndex: 'fullName',
                align: 'left',
            },
            {
                title: 'Phone',
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
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                align: 'left',
            },
            {
                title: 'Role',
                key: 'roleCode',
                dataIndex: 'roleCode',
                align: 'left',
            },
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (_, user) => {
                    return (
                        <Space size="middle">
                            <Button
                                key={user.key}
                                type="primary"
                                size="large"
                                onClick={() => this.handleEditUser(user.id)}
                                icon={<EditOutlined />}
                            ></Button>
                        </Space>
                    );
                },
            },
        ];
        this.state = {
            selectedUsers: [],
            isDeletable: false,
        };
    }

    // Export
    handleExportExcel = (users) => {
        const headers = tableHeaders.map((column) => column.label);
        const data = users.map((user) => Object.values(user));
        downloadExcel({
            fileName: 'User_List',
            sheet: 'List of User',
            tablePayload: {
                header: headers,
                // accept two different data structures
                body: data || users,
            },
        });
    };

    handleExportPDF = (users) => {
        const pdf = new jsPDF({
            unit: 'pt', // pt, px, mm
            size: 'A4', // Use A1, A2, A3 or A4
            orientation: 'portrait', // portrait or landscape
        });

        const headers = tableHeaders.map((column) => ({ header: column.label, dataKey: column.key }));
        const data = users.map((user) => Object.values(user));
        const title = 'List of Users';
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
        pdf.save('User_List.pdf');
    };
    // Handle user table
    handleUserSelection = (selectedRowKeys) => {
        this.setState({
            selectedUsers: selectedRowKeys,
            isDeletable: selectedRowKeys.length > 0,
        });
    };

    handleUserPagination = (page, pageSize) => {
        const searchingValues = this.props.searchingFormRef.current.getFieldsValue();
        this.props.searchUsers(searchingValues, { page: page - 1, size: pageSize });
    };

    // Add user
    handleAddUser = () => {
        const { navigate } = this.props;
        navigate('/users/add');
    };
    // Edit user
    handleEditUser = (customerId) => {
        const { navigate } = this.props;
        navigate(`/users/edit/${customerId}`);
    };

    // Delete user
    openDeleteUsersConfirmModal = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete the users',
            onOk: this.handleDeleteUsersOk,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            height: 400,
        });
    };

    handleDeleteUsersOk = async () => {
        await this.props.deleteUsers(this.state.selectedUsers);
        await this.props.searchUsers({});
    };

    render() {
        console.log('Rendering(UserList)');
        const { users, pagination } = this.props;
        const { page, size, totalElements } = pagination;
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
                        onClick={this.handleAddUser}
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
                        onClick={this.openDeleteUsersConfirmModal}
                    />
                </Space>
                <Typography.Title level={4}>List Customers</Typography.Title>
                <Table
                    className={cx('')}
                    dataSource={users}
                    size="small"
                    rowKey="id"
                    bordered
                    rowSelection={{
                        type: 'checkbox',
                        onChange: this.handleUserSelection,
                    }}
                    columns={this.columns}
                    pagination={{
                        pageSizeOptions: ['2', '4', '6', '8', '10'],
                        showSizeChanger: true,
                        defaultPageSize: size,
                        current: page,
                        total: totalElements,
                        onChange: this.handleUserPagination,
                    }}
                />
                <Typography.Text style={{ marginRight: '20px' }}>Export options:</Typography.Text>
                <Space split={<Divider type="vertical" />}>
                    <Typography.Link onClick={() => this.handleExportExcel(users)}>Excel</Typography.Link>
                    <Typography.Link onClick={() => this.handleExportPDF(users)}>PDF</Typography.Link>
                </Space>
            </>
        );
    }
}

export default UserList;
