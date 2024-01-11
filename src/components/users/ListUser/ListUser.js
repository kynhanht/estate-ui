import React, { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ListUser.module.scss';
import withRouter from '~/helpers/withRouter';
import ContentPageHeader from '~/components/common/ContentPageHeader/ContentPageHeader';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';
import { searchUsers, deleteUsers, clearUserState } from '~/redux/actions/userAction';
import { setLoading } from '~/redux/actions/commonAction';
import UserList from './UserList';
import UserSearchForm from './UserSearchForm';

const cx = classNames.bind(styles);

class ListUser extends Component {
    constructor(props) {
        super(props);
        this.searchingFormRef = createRef();
        this.state = {};
    }
    componentDidMount = () => {
        console.log('did mount');
        this.props.searchUsers({});
    };

    componentWillUnmount = () => {
        console.log('will unmount');
        this.props.clearUserState();
    };

    // Search Form
    handleSubmitForm = (values) => {
        const { page, size } = this.props.pagination;
        this.props.searchUsers(values, { page: page - 1, size: size });
    };

    render() {
        console.log('Rendering');
        const { page = 1, size = 4, totalElements = 0 } = this.props.pagination;
        const { users = [], isLoading } = this.props;
        const { navigate } = this.props.router;

        return (
            <>
                <ContentPageHeader navigate={navigate} title="List Users" className={cx('')} />

                <UserSearchForm searchingFormRef={this.searchingFormRef} handleSubmitForm={this.handleSubmitForm} />

                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <UserList
                        users={users}
                        pagination={{ page, size, totalElements }}
                        navigate={navigate}
                        deleteUsers={this.props.deleteUsers}
                        searchUsers={this.props.searchUsers}
                        searchingFormRef={this.searchingFormRef}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.userReducer.users,
    pagination: state.userReducer.pagination,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    searchUsers,
    deleteUsers,
    clearUserState,
    setLoading,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListUser));
