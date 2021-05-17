import Modal from '../UI/Modal/Modal';

import styles from './Cart.module.css';

const Cart = props => {
    const cartItems = <ul className={styles['cart-items']}>{[{
            id: "c1",
            name: "Sushi",
            amount: 2,
            price: 12.99
        }].map(item => <li key={item.id}>{item.name}</li>)}
    </ul>;

    return (
        <Modal onClick={props.onHideCartHandler}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>12.99</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCartHandler}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;