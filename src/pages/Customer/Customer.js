import classNames from 'classnames/bind';
import styles from './Customer.module.scss';

const cx = classNames.bind(styles);

function Customer() {
    return <div className={cx('')}>Customer Page</div>;
}

export default Customer;
