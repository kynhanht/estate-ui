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
            subTitle="Sorry, the page you visited does not exist."
            className={cx('')}
            extra={
                <Button type="primary" onClick={() => navigate(config.routes.home)}>
                    Back Home
                </Button>
            }
        />
    );
};
export default NotFound;
