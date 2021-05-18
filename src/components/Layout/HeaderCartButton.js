import { useState, useEffect, useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import styles from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [buttonBump, setButtonBump] = useState(false);

    const cartContext = useContext(CartContext);
    const { items } = cartContext;

    const numberOfCartItems = items.reduce((currentValue, item) => currentValue + item.amount, 0);

    const buttonClassName = `${styles.button} ${buttonBump ? styles.bump : ''}`;

    useEffect(() => {
        if(items.length === 0)
            return;

        setButtonBump(true);

        const timeout = setTimeout(() => {
            setButtonBump(false);
        }, 300);

        return () => { // useEffect cleanup function
            clearTimeout(timeout);
        }

    }, [items])

    return (
        <button className={buttonClassName} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>
                Your cart
            </span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;