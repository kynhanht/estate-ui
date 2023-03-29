import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <footer className={cx('')}>
            <h2>Sidebar</h2>
        </footer>
    );
}

export default Sidebar;
