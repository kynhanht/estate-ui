import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import classNames from 'classnames/bind';
import styles from './Breadcrumb.module.scss';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

const Breadcrumb = () => {
    const location = useLocation();
    const breadcrumbNameMap = {
        '/': 'Trang chủ',
        '/home': 'Trang chủ',
        '/users': 'Danh sách người dùng',
        '/users/add': 'Thêm mới người dùng',
        '/users/edit': 'Cập nhập người dùng',
        '/buildings': 'Danh sách tòa nhà',
        '/buildings/add': 'Thêm mới tòa nhà',
        '/buildings/edit': 'Cập nhập tòa nhà',
        '/customers': 'Danh sách khách hàng',
        '/customers/add': 'Thêm mới khách hàng',
        '/customers/edit': 'Cập nhập khách hàng',
    };
    let id = '';
    let pathnames = location.pathname.split('/').filter((item) => item);
    if (pathnames.includes('edit')) {
        id = pathnames[pathnames.length - 1];
        pathnames = pathnames.slice(0, -1);
    }

    let currentLink = '';
    const breadcrumbItems = pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        currentLink += `/${value}`;

        return {
            title: (
                <div
                    className={cx({
                        active: isLast,
                    })}
                >
                    <Link to={id && isLast ? `${currentLink}/${id}` : currentLink}>
                        {breadcrumbNameMap[currentLink]}
                    </Link>
                </div>
            ),
        };
    });

    return (
        <AntdBreadcrumb
            style={{
                margin: '16px 0',
            }}
            items={breadcrumbItems}
        />
    );
};

export default Breadcrumb;
