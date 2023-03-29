import classNames from 'classnames/bind';
import styles from './Building.module.scss';

const cx = classNames.bind(styles);

function Building() {
    return <div className={cx('')}>Building Page</div>;
}

export default Building;
