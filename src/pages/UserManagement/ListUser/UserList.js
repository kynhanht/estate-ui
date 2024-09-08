import classNames from 'classnames/bind';
import styles from './ListUser.module.scss';
import React, { Component } from 'react';
import { Button, Divider, Modal, Space, Table, Tag, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';

import '~/assets/fonts';
import { downloadExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const cx = classNames.bind(styles);

const tableHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Họ và tên', key: 'fullName' },
    { label: 'Tên đăng nhập', key: 'username' },
    { label: 'SĐT', key: 'phone' },
    { label: 'Email', key: 'email' },
    { label: 'Trạng thái', key: 'status' },
    { label: 'Quyền', key: 'roleCode' },
];

class UserList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Tên đăng nhập',
                key: 'username',
                dataIndex: 'username',
                align: 'left',
                responsive: ['md'],
            },
            {
                title: 'Họ và tên',
                key: 'fullName',
                dataIndex: 'fullName',
                align: 'left',
            },
            {
                title: 'Quyền',
                key: 'roleCode',
                dataIndex: 'roleCode',
                align: 'left',
            },
            {
                title: 'Thao tác',
                key: 'action',
                align: 'center',
                render: (_, user) =>
                    props.username === user.username ? (
                        <Tag color="warning">Không thể thao tác</Tag>
                    ) : (
                        <Space size="middle">
                            <Button
                                key={user.key}
                                type="primary"
                                size="large"
                                onClick={() => this.handleEditUser(user.id)}
                                icon={<EditOutlined />}
                            ></Button>
                        </Space>
                    ),
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
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn xóa những tài khoản này không?',
            onOk: this.handleDeleteUsersOk,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            height: 400,
        });
    };

    handleDeleteUsersOk = async () => {
        await this.props.deleteUsers(this.state.selectedUsers);
        await this.props.searchUsers({});
    };

    render() {
        const { users, pagination } = this.props;
        const { page, size, totalElements } = pagination;
        return (
            <>
                <Space
                    size="medium"
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
                <Table
                    className={cx('')}
                    title={() => (
                        <div style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>
                            Danh sách tài khoản
                        </div>
                    )}
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
                <Typography.Text style={{ marginRight: '20px' }}>Xuất file:</Typography.Text>
                <Space split={<Divider type="vertical" />}>
                    <Typography.Link onClick={() => this.handleExportExcel(users)}>Excel</Typography.Link>
                    <Typography.Link onClick={() => this.handleExportPDF(users)}>PDF</Typography.Link>
                </Space>
            </>
        );
    }
}

export default UserList;
