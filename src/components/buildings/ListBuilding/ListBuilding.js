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

const cx = classNames.bind(styles);
const headers = [
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
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleExportExcel = this.handleExportExcel.bind(this);
        this.handleEditBuilding = this.handleEditBuilding.bind(this);
        this.openDeleteCofirmModal = this.openDeleteCofirmModal.bind(this);
        this.handleDeleteBuilding = this.handleDeleteBuilding.bind(this);
        this.columns = [
            {
                title: 'Building Name',
                key: 'buildingName',
                dataIndex: 'buildingName',
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
                onFilter: (value, record) => record.buildingName.indexOf(value) !== -1,
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
            dataSource: [
                {
                    buildingId: 1,
                    buildingName: 'Nam Giao Building Tower',
                    numberOfBasement: 3,
                    address: '59 Phan Xích Long, Phường 2, Quận 1',
                    managerName: 'Nguyễn Văn Tài',
                    managerPhone: '0335466',
                    rentPrice: 300,
                    serviceFee: '300',
                },
                {
                    buildingId: 2,
                    buildingName: 'ACM Tower',
                    numberOfBasement: 5,
                    address: '96 Cao Thắng, Phường 3, Quận 2',
                    managerName: 'Nguyễn Văn Tài',
                    managerPhone: '0335466',
                    rentPrice: 300,
                    serviceFee: '300',
                },
                {
                    buildingId: 3,
                    buildingName: 'Alpha Building Tower',
                    numberOfBasement: 3,
                    address: '153 Nguyễn Đình Chiểu, Phường 3, Quận 3',
                    managerName: 'Nguyễn Văn Tài',
                    managerPhone: '0335466',
                    rentPrice: 300,
                    serviceFee: '300',
                },
                {
                    buildingId: 4,
                    buildingName: 'IDD Building',
                    numberOfBasement: 3,
                    address: '111 Lý Chính Thắng, Phường 1, Quận 1',
                    managerName: 'Nguyễn Văn Tài',
                    managerPhone: '0335466',
                    rentPrice: 300,
                    serviceFee: '300',
                },
            ],

            building: {},
            selectedRowKeys: [],
            isDeletable: false,
        };
    }

    handleSubmitForm(values) {
        console.log(values);
    }

    handleEditBuilding(building) {
        console.log(building);
    }

    openDeleteCofirmModal(building) {
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
    }

    handleDeleteBuilding() {
        console.log(this.state.building);
    }

    handleExportExcel() {
        const excel = new Excel();
        excel
            .addSheet('Building_List')
            .addColumns(this.columns.filter((column) => column.title !== 'Action'))
            .addDataSource(this.state.dataSource, {
                str2Percent: true,
            })
            .saveAs('Building_List.xlsx');
    }

    render() {
        const { navigate } = this.props.router;
        return (
            <>
                <ContentPageHeader navigate={navigate} title="List Buildings" className={cx('')}></ContentPageHeader>

                <Collapse size="small" defaultActiveKey={['1']} expandIconPosition="end">
                    <Collapse.Panel header="Search" key="1">
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
                                            options={[
                                                {
                                                    value: 'Q1',
                                                    label: 'Quận 1',
                                                },
                                                {
                                                    value: 'Q2',
                                                    label: 'Quận 2',
                                                },
                                                {
                                                    value: 'Q3',
                                                    label: 'Quận 3',
                                                },
                                                {
                                                    value: 'Q4',
                                                    label: 'Quận 4',
                                                },
                                            ]}
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
                                    <Form.Item label="Number of Basement" name="numberOfbasement">
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
                                            options={[
                                                {
                                                    value: 1,
                                                    label: 'nguyen van a',
                                                },
                                                {
                                                    value: 2,
                                                    label: 'nguyen van b',
                                                },
                                                {
                                                    value: 3,
                                                    label: 'nguyen van c',
                                                },
                                            ]}
                                        ></Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[24, 8]}>
                                <Col md={24}>
                                    <Form.Item name="buildingTypes" label="Building Types" initialValue={[]}>
                                        <Checkbox.Group name="buildingTypes">
                                            <Checkbox value="NOI_THAT">Nội Thất</Checkbox>
                                            <Checkbox value="TANG_TRET">Tầng Trệt</Checkbox>
                                            <Checkbox value="NGUYEN_CAN">Nguyên Căn</Checkbox>
                                        </Checkbox.Group>
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
                    />
                </Space>
                <Typography.Title level={4}>List Buildings</Typography.Title>
                <Table
                    dataSource={this.state.dataSource ? this.state.dataSource : []}
                    size="small"
                    rowKey="buildingId"
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
                    <CSVLink
                        filename={'Building_List.csv'}
                        data={this.state.dataSource}
                        headers={headers}
                        target="_blank"
                    >
                        CSV
                    </CSVLink>
                    <Typography.Link onClick={this.handleExportExcel}>Excel</Typography.Link>
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

export default withRouter(ListBuilding);
