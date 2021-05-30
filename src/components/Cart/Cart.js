import { Fragment, useState, useContext } from 'react';

import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import styles from './Cart.module.css';

const Cart = props => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

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

    const sendOrderHandler = userData => {
        setIsLoading(true);
        fetch('https://react-tutorial-bb16b.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                cart: cartContext.items
            })
        })
        .then(result => result.json())
        .then(data => {
            setIsLoading(false);
            setDidSubmit(true);
            cartContext.clearCart();
        })
        .catch(error => {
            setIsLoading(false);
        })
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
    
    const isLoadingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <Fragment>
            <p>Successfully sent the order!</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onHideCartHandler}>Close</button>
            </div>
        </Fragment>

    const cartModalContent = <Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {showCheckout ? <Checkout 
                onHideCartHandler={props.onHideCartHandler}
                onSendOrderHandler={sendOrderHandler}/> : modalActions}
        </Fragment>
    return (
        <Modal onClick={props.onHideCartHandler}>
            {!isLoading && !didSubmit && cartModalContent}
            {isLoading && isLoadingModalContent}
            {!isLoading && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;