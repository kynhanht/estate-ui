import React, { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AddOrEditCustomer.module.scss';
import withRouter from '~/helpers/withRouter';
import { Button, DatePicker, Divider, Form, Input, Modal, Popconfirm, Select, Space, Table, Typography } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import ContentPageHeader from '~/components/common/ContentPageHeader';
import { connect } from 'react-redux';

import { createCustomer, updateCustomer, getCustomerById, clearCustomer } from '~/redux/actions/customerAction';
import {
    getTransactionsByCustomerId,
    createTransaction,
    clearTransactionrState,
} from '~/redux/actions/transactionAction';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TransactionService from '~/services/transactionService';

const dateFormat = 'YYYY-MM-DD';

const cx = classNames.bind(styles);

class AddOrEditCustomer extends Component {
    constructor(props) {
        super(props);
        this.transactionColumns = [
            {
                title: 'Created By',
                key: 'createdBy',
                dataIndex: 'createdBy',
                align: 'left',
            },
            {
                title: 'Created Date',
                key: 'createdDate',
                dataIndex: 'createdDate',
                align: 'left',
            },
            {
                title: 'Appointment Date',
                key: 'appointmentDate',
                dataIndex: 'appointmentDate',
                align: 'left',
            },
            {
                title: 'Note',
                key: 'note',
                dataIndex: 'note',
                align: 'left',
            },
        ];
        this.state = {
            isModalOpen: false,
            customer: {},
            transactions: {},
            transactionTypes: [],
        };
        this.customerFormRef = createRef();
        this.transactionFormRef = createRef();
    }

    // Handle Customer
    confirmUpdate = () => {
        this.customerFormRef.current.submit();
    };
    handleSubmitCustomerForm = (values) => {
        const { navigate } = this.props.router;
        const { id } = this.state.customer;
        console.log(values);
        if (id) {
            this.props.updateCustomer(id, values, navigate);
        } else {
            this.props.createCustomer(values, navigate);
        }
    };

    // Handle Transaction
    handleAddTransaction = () => {
        this.setState({ ...this.state, isModalOpen: true });
    };

    handleAddTransactionOk = () => {
        this.transactionFormRef.current.submit();
        this.setState({ ...this.state, transaction: {}, isModalOpen: false });
    };
    handleAddTransactionCancel = () => {
        this.setState({ ...this.state, transaction: {}, isModalOpen: false });
    };

    handleSubmitTransactionForm = (values) => {
        const newValues = {
            ...values,
            appointmentDate: values.appointmentDate?.format(dateFormat),
        };
        console.log(newValues);
    };

    componentDidMount = () => {
        const { id } = this.props.router.params;
        if (id) {
            this.props.getCustomerById(id);
            this.props.getTransactionsByCustomerId(id);
            this.loadData();
        } else {
            this.props.clearCustomer();
        }
    };
    loadData = async () => {
        const transactionService = new TransactionService();
        const transactionTypesResponse = await transactionService.getTransactionTypes();
        const transactionTypes = transactionTypesResponse.data
            ? Object.entries(transactionTypesResponse.data).map(([key, value]) => ({ value: key, label: value }))
            : [];

        this.setState({
            ...this.state,
            transactionTypes,
        });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.customer && nextProps.customer.id !== prevState.customer.id) {
            return { ...prevState, customer: nextProps.customer };
        } else if (!nextProps.customer) {
            return { ...prevState, customer: {} };
        }
        return null;
    }

    componentWillUnmount = () => {
        console.log('Will Unmount');
        this.props.clearCustomer();
        this.props.clearTransactionrState();
    };

    render() {
        console.log('Rendering');
        const { navigate } = this.props.router;
        const { combinationTransactions, isLoading } = this.props;
        const { customer, transactionTypes } = this.state;
        console.log(transactionTypes);
        let title = 'Add New Customer';
        if (customer.id) {
            title = 'Update Customer';
        }

        return (
            <>
                <ContentPageHeader navigate={navigate} title={title} className={cx('')} />
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    layout="horizontal"
                    labelAlign="left"
                    onFinish={this.handleSubmitCustomerForm}
                    key={customer.id}
                    ref={this.customerFormRef}
                    disabled={isLoading}
                >
                    <Form.Item label="Customer ID" name="id" hidden={true} initialValue={customer.id}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Full Name" name="fullName" initialValue={customer.fullName}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" initialValue={customer.phone}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" initialValue={customer.email}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Company" name="company" initialValue={customer.company}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Demand" name="demand" initialValue={customer.demand}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Note" name="note" initialValue={customer.note}>
                        <ReactQuill theme="snow" />
                    </Form.Item>

                    <Divider />
                    {customer.id ? (
                        <Popconfirm
                            title="Are you sure update this customer?"
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
                <Divider />
                {combinationTransactions &&
                    combinationTransactions.map((type, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Space>
                                    <Typography.Title level={4}>{type.value}</Typography.Title>
                                    <Button
                                        icon={
                                            <PlusCircleFilled
                                                style={{
                                                    color: '#a069c3',
                                                }}
                                            />
                                        }
                                        onClick={this.handleAddTransaction}
                                        size="medium"
                                    />
                                </Space>
                                <Table
                                    rowKey="id"
                                    dataSource={type.transactions || []}
                                    columns={this.transactionColumns}
                                    bordered
                                    style={{ marginBottom: '20px' }}
                                    pagination={false}
                                />
                            </React.Fragment>
                        );
                    })}

                <Modal
                    title="Add New Transaction"
                    open={this.state.isModalOpen}
                    onOk={this.handleAddTransactionOk}
                    onCancel={this.handleAddTransactionCancel}
                    destroyOnClose={true}
                >
                    <Divider />
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        labelAlign="left"
                        ref={this.transactionFormRef}
                        onFinish={this.handleSubmitTransactionForm}
                    >
                        <Form.Item label="Note" name="note">
                            <ReactQuill theme="snow" />
                        </Form.Item>
                        <Form.Item label="Appointment Date" name="appointmentDate">
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                        <Form.Item label="Transaction" name="code">
                            <Select
                                placeholder="Select transaction"
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                                allowClear
                                options={transactionTypes}
                            ></Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    customer: state.customerReducer.customer,
    transaction: state.transactionReducer.transaction,
    combinationTransactions: state.transactionReducer.combinationTransactions,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    getCustomerById,
    createCustomer,
    updateCustomer,
    clearCustomer,
    getTransactionsByCustomerId,
    createTransaction,
    clearTransactionrState,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditCustomer));
