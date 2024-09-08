import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Trang không tồn tại."
            className={cx('')}
            extra={
                <Button type="primary" onClick={() => navigate(config.routes.home)}>
                    Quay về trang chủ
                </Button>
            }
        />
    );
};
export default NotFound;
