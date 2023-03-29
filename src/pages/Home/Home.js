import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return <div className={cx('')}>Home Page</div>;
}

export default Home;
