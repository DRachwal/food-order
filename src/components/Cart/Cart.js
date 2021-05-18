import { useContext } from 'react';

import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

import styles from './Cart.module.css';

const Cart = props => {
    const cartContext = useContext(CartContext);
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const cartHasItems = cartContext.items.length > 0;

    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount: 1});
    }

    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    }

    const cartItems = <ul className={styles['cart-items']}>
        {cartContext.items.map(item => <CartItem 
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onCartItemAddHandler={cartItemAddHandler.bind(null, item)}
            onCartItemRemoveHandler={cartItemRemoveHandler.bind(null, item.id)} />)}
    </ul>;

    return (
        <Modal onClick={props.onHideCartHandler}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCartHandler}>Close</button>
                {cartHasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;