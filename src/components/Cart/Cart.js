import { useState, useContext } from 'react';

import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import styles from './Cart.module.css';

const Cart = props => {
    const [showCheckout, setShowCheckout] = useState(false);

    const cartContext = useContext(CartContext);
    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const cartHasItems = cartContext.items.length > 0;

    const cartItemAddHandler = item => {
        cartContext.addItem({...item, amount: 1});
    }

    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    }

    const orderHandler = () => {
        setShowCheckout(true);
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

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCartHandler}>Close</button>
        {cartHasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>

    return (
        <Modal onClick={props.onHideCartHandler}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {showCheckout ? <Checkout onHideCartHandler={props.onHideCartHandler}/> : modalActions}
        </Modal>
    );
}

export default Cart;