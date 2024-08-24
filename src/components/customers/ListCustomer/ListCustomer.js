import React, { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ListCustomer.module.scss';
import withRouter from '~/helpers/withRouter';
import ContentPageHeader from '~/components/common/ContentPageHeader/ContentPageHeader';
import { Skeleton, message } from 'antd';
import { connect } from 'react-redux';
import { searchCustomers, assignCustomer, deleteCustomers, clearCustomerState } from '~/redux/actions/customerAction';
import { setLoading } from '~/redux/actions/commonAction';
import CustomerSearchForm from './CustomerSearchForm';
import CustomerList from './CustomerList';
import UserSerive from '~/services/userService';

const cx = classNames.bind(styles);

class ListCustomer extends Component {
    constructor(props) {
        super(props);
        this.searchingFormRef = createRef();
        this.state = {
            staffs: [],
        };
    }
    componentDidMount = () => {
        console.log('did mount');
        this.props.searchCustomers({});
        this.loadData();
    };

    loadData = async () => {
        try {
            const userService = new UserSerive();
            const staffsRespone = await userService.getStaffs();
            const staffs = staffsRespone.data
                ? Object.entries(staffsRespone.data).map(([key, value]) => ({ value: key, label: value }))
                : [];
            this.setState({
                ...this.state,
                staffs,
            });
        } catch (error) {
            console.error(error);
            message.error('An error occurred');
        }
    };

    componentWillUnmount = () => {
        console.log('will unmount');
        this.props.clearCustomerState();
    };

    // Search Form
    handleSubmitForm = (values) => {
        const { page, size } = this.props.pagination;
        this.props.searchCustomers(values, { page: page - 1, size: size });
    };

    render() {
        console.log('Rendering');
        const { page = 1, size = 4, totalElements = 0 } = this.props.pagination;
        const { customers = [], isLoading } = this.props;
        const { staffs } = this.state;
        const { navigate } = this.props.router;

        return (
            <>
                <ContentPageHeader navigate={navigate} title="Danh sách khách hàng" className={cx('')} />

                <CustomerSearchForm
                    staffs={staffs}
                    searchingFormRef={this.searchingFormRef}
                    handleSubmitForm={this.handleSubmitForm}
                />

                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <CustomerList
                        customers={customers}
                        pagination={{ page, size, totalElements }}
                        navigate={navigate}
                        assignCustomer={this.props.assignCustomer}
                        deleteCustomers={this.props.deleteCustomers}
                        searchCustomers={this.props.searchCustomers}
                        searchingFormRef={this.searchingFormRef}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    customers: state.customerReducer.customers,
    pagination: state.customerReducer.pagination,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    searchCustomers,
    deleteCustomers,
    clearCustomerState,
    assignCustomer,
    setLoading,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCustomer));
