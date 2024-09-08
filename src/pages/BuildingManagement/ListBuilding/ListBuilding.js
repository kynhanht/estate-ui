import React, { Component, createRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ListBuilding.module.scss';
import withRouter from '~/helpers/withRouter';
import ContentPageHeader from '~/components/ContentPageHeader/ContentPageHeader';
import { Skeleton, message } from 'antd';
import { connect } from 'react-redux';
import { searchBuildings, assignBuilding, deleteBuildings, clearBuildingState } from '~/redux/actions/buildingAction';
import { clearUserState } from '~/redux/actions/userAction';
import { setLoading } from '~/redux/actions/commonAction';
import BuildingSearchForm from './BuildingSearchForm';
import BuildingList from './BuildingList';
import BuildingService from '~/services/buildingService';
import UserSerive from '~/services/userService';

const cx = classNames.bind(styles);

class ListBuilding extends Component {
    constructor(props) {
        super(props);
        this.searchingFormRef = createRef();
        this.state = {
            buildingDistricts: [],
            buildingTypes: [],
            staffs: [],
        };
    }
    componentDidMount = () => {
        console.log('did mount');
        this.props.searchBuildings({});
        this.loadData();
    };

    loadData = async () => {
        try {
            const buildingService = new BuildingService();
            const buildingDistrictsResponse = await buildingService.getBuildingDistricts();
            const buildingDistricts = buildingDistrictsResponse.data
                ? Object.entries(buildingDistrictsResponse.data).map(([key, value]) => ({ value: key, label: value }))
                : [];

            const buildingTypesResponse = await buildingService.getBuildingTypes();
            const buildingTypes = buildingTypesResponse.data
                ? Object.entries(buildingTypesResponse.data).map(([key, value]) => ({ value: key, label: value }))
                : [];

            const userService = new UserSerive();
            const staffsRespone = await userService.getStaffs();
            const staffs = staffsRespone.data
                ? Object.entries(staffsRespone.data).map(([key, value]) => ({ value: key, label: value }))
                : [];
            this.setState({
                ...this.state,
                buildingDistricts,
                buildingTypes,
                staffs,
            });
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra');
        }
    };

    componentWillUnmount = () => {
        console.log('will unmount');
        this.props.clearBuildingState();
        this.props.clearUserState();
    };

    // Search Form
    handleSubmitForm = (values) => {
        const { page, size } = this.props.pagination;
        this.props.searchBuildings(values, { page: page - 1, size: size });
    };

    render() {
        console.log('Rendering');
        const { page = 1, size = 4, totalElements = 0 } = this.props.pagination;
        const { buildings = [], isLoading, roleCode } = this.props;
        const { buildingDistricts, buildingTypes, staffs } = this.state;
        const { navigate } = this.props.router;

        return (
            <>
                <ContentPageHeader navigate={navigate} title="Danh sách tòa nhà" />

                <BuildingSearchForm
                    buildingDistricts={buildingDistricts}
                    buildingTypes={buildingTypes}
                    staffs={staffs}
                    roleCode={roleCode}
                    searchingFormRef={this.searchingFormRef}
                    handleSubmitForm={this.handleSubmitForm}
                />

                {isLoading ? (
                    <Skeleton active className={cx('')} />
                ) : (
                    <BuildingList
                        buildings={buildings}
                        pagination={{ page, size, totalElements }}
                        navigate={navigate}
                        roleCode={roleCode}
                        assignBuilding={this.props.assignBuilding}
                        deleteBuildings={this.props.deleteBuildings}
                        searchBuildings={this.props.searchBuildings}
                        searchingFormRef={this.searchingFormRef}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    buildings: state.buildingReducer.buildings,
    pagination: state.buildingReducer.pagination,
    isLoading: state.commonReducer.isLoading,
    roleCode: state.jwtAuthReducer.roleCode,
});

const mapDispatchToProps = {
    searchBuildings,
    deleteBuildings,
    clearBuildingState,
    assignBuilding,
    clearUserState,
    setLoading,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListBuilding));
