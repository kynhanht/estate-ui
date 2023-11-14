import { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './ListBuilding.module.scss';
import withRouter from '~/helpers/withRouter';
import ContentPageHeader from '~/components/common/ContentPageHeader/ContentPageHeader';
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
    PlusCircleFilled,
    ArrowRightOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

import { Excel } from 'antd-table-saveas-excel';

import { CSVLink } from 'react-csv';

import ReactToPrint from 'react-to-print';

import {
    searchBuildings,
    getBuildingDistricts,
    getBuildingTypes,
    clearBuildingState,
} from '~/redux/actions/buildingAction';
import { getStaffs, clearUserState } from '~/redux/actions/userAction';
import { setLoading } from '~/redux/actions/commonAction';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);
const headers = [
    { label: 'Name', key: 'Name' },
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
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                align: 'left',
                filters: [
                    {
                        text: 'ACM Tower',
                        value: 'ACM Tower',
                    },
                    {
                        text: 'Nam Giao Building Tower',
                        value: 'Nam Giao Building Tower',
                    },
                ],
                onFilter: (value, record) => record.name.indexOf(value) !== -1,
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
                                key={building.key}
                                type="primary"
                                size="medium"
                                onClick={() => this.handleEditBuilding(building)}
                            >
                                <EditOutlined />
                                Edit
                            </Button>
                            <Button
                                key={building.key}
                                type="primary"
                                danger
                                size="medium"
                                onClick={() => this.openDeleteCofirmModal(building)}
                            >
                                <DeleteOutlined />
                                Delete
                            </Button>
                        </Space>
                    );
                },
            },
        ];
        this.state = {
            buildingCriterias: {},
            building: {},
            selectedRowKeys: [],
            isDeletable: false,
        };
    }
    componentDidMount = async () => {
        this.props.searchBuildings({});
        this.props.getBuildingDistricts();
        this.props.getBuildingTypes();
        this.props.getStaffs();
        console.log('did mount');
    };

    componentWillUnmount = () => {
        this.props.clearBuildingState();
        this.props.clearUserState();
        console.log('will unmount');
    };

    handleSubmitForm = (values) => {
        console.log(values);
        this.setState({ buildingCriterias: values });
        this.props.searchBuildings(values);
    };

    handleEditBuilding = (building) => {
        console.log(building);
    };

    openDeleteCofirmModal = (building) => {
        this.setState({ ...this.state, building: building });
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete the building',
            onOk: this.handleDeleteBuilding,
            okText: 'Delete',
            okType: 'primary',
            cancelText: 'Cancel',
            height: 400,
        });
    };

    handleDeleteBuilding = () => {
        console.log(this.state.building);
    };

    handleDeleteMultipleBuildings = () => {
        console.log(this.state.selectedRowKeys);
    };

    handleExportExcel = (buildings) => {
        const excel = new Excel();
        excel
            .addSheet('Building_List')
            .addColumns(this.columns.filter((column) => column.title !== 'Action'))
            .addDataSource(buildings, {
                str2Percent: true,
            })
            .saveAs('Building_List.xlsx');
    };

    render() {
        console.log('Render');
        const { navigate } = this.props.router;
        const { listResult: buildings = [], pageSize = 4, totalItems = 0 } = this.props.buildingSearch;
        const staffs = this.props.staffs
            ? Object.entries(this.props.staffs).map(([key, value]) => ({ value: key, label: value }))
            : [];

        const buildingTypes = this.props.buildingTypes
            ? Object.entries(this.props.buildingTypes).map(([key, value]) => ({ value: key, label: value }))
            : [];

        const buildingDistricts = this.props.buildingDistricts
            ? Object.entries(this.props.buildingDistricts).map(([key, value]) => ({ value: key, label: value }))
            : [];

        const { isLoading } = this.props;

        if (isLoading) {
            return (
                <>
                    <ContentPageHeader
                        navigate={navigate}
                        title="List Buildings"
                        className={cx('')}
                    ></ContentPageHeader>
                    <Skeleton active />
                </>
            );
        } else {
            return (
                <>
                    <ContentPageHeader
                        navigate={navigate}
                        title="List Buildings"
                        className={cx('')}
                    ></ContentPageHeader>

                    <Collapse size="small" defaultActiveKey={['1']} expandIconPosition="end">
                        <Collapse.Panel header="Search" key="1">
                            <Form layout="vertical" onFinish={this.handleSubmitForm} size="large">
                                <Row gutter={[24, 8]}>
                                    <Col md={12}>
                                        <Form.Item label="Name" name="name">
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
                                        <Form.Item name="buildingTypes" label="Building Types" initialValue={[]}>
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
                        </Collapse.Panel>
                    </Collapse>

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
                            onClick={this.handleDeleteMultipleBuildings}
                        />
                    </Space>
                    <Typography.Title level={4}>List Buildings</Typography.Title>
                    <Table
                        dataSource={buildings}
                        size="small"
                        rowKey="id"
                        bordered
                        rowSelection={{
                            type: 'checkbox',
                            onChange: (selectedRowKeys) => {
                                this.setState({
                                    selectedRowKeys: selectedRowKeys,
                                    isDeletable: selectedRowKeys.length > 0,
                                });
                            },
                        }}
                        columns={this.columns}
                        pagination={{
                            pageSizeOptions: ['2', '4', '6', '8', '10'],
                            showSizeChanger: true,
                            defaultPageSize: pageSize,
                            total: totalItems,
                            onChange: (page, pageSize) => {
                                const { buildingCriterias } = this.state;
                                this.props.searchBuildings({ page, pageSize, ...buildingCriterias });
                            },
                        }}
                        ref={(el) => (this.componentRef = el)}
                    />

                    <Typography.Text
                        style={{
                            marginRight: '20px',
                        }}
                    >
                        Export options:
                    </Typography.Text>
                    <Space split={<Divider type="vertical" />}>
                        <CSVLink filename={'Building_List.csv'} data={buildings} headers={headers} target="_blank">
                            CSV
                        </CSVLink>
                        <Typography.Link onClick={() => this.handleExportExcel(buildings)}>Excel</Typography.Link>
                        <ReactToPrint
                            trigger={() => {
                                return <Typography.Link>PDF</Typography.Link>;
                            }}
                            content={() => this.componentRef}
                        />
                    </Space>
                </>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    buildingSearch: state.buildingReducer.buildingSearch,
    buildingDistricts: state.buildingReducer.buildingDistricts,
    buildingTypes: state.buildingReducer.buildingTypes,
    staffs: state.userReducer.staffs,
    isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
    searchBuildings,
    getBuildingDistricts,
    getBuildingTypes,
    clearBuildingState,
    getStaffs,
    clearUserState,
    setLoading,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListBuilding));
