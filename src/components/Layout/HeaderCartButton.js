import { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import styles from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const cartContext = useContext(CartContext);
    console.log(cartContext.items);
    const numberOfCartItems = cartContext.items.reduce((currentValue, item) => currentValue + item.amount, 0);

    return (
        <button className={styles.button} onClick={props.onClick}>
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