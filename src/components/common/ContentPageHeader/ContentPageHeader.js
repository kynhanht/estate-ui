import { Component } from 'react';
import styles from './ContentPageHeader.module.scss';
import classNames from 'classnames';
import { PageHeader } from '@ant-design/pro-layout';
import { Divider } from 'antd';

const cx = classNames.bind(styles);

class ContentPageHeader extends Component {
    render() {
        const { navigate, title, className } = this.props;
        return (
            <>
                <PageHeader className={cx(className)} title={title} onBack={() => navigate(-1)} />
                <Divider />
            </>
        );
    }
}

export default ContentPageHeader;
