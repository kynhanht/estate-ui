import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import styles from './AccessDenied.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccessDenied = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="403"
            title="403"
            subTitle="Bạn không có quyền truy cập vào trang này"
            className={cx('')}
            extra={
                <Button type="primary" onClick={() => navigate(config.routes.home)}>
                    Quay trở về trang chủ
                </Button>
            }
        />
    );
};
export default AccessDenied;
