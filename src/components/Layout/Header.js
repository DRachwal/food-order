import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';

import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';

const Header = props => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Meals</h1>
                <HeaderCartButton/>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="Meals"/>
            </div>
        </Fragment>
    );
}

export default Header;