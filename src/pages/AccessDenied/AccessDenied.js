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
            subTitle="Sorry, you are not authorized to access this page"
            className={cx('')}
            extra={
                <Button type="primary" onClick={() => navigate(config.routes.home)}>
                    Back Home
                </Button>
            }
        />
    );
};
export default AccessDenied;
