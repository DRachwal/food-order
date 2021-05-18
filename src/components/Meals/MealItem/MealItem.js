import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

import styles from './MealItem.module.css';

const MealItem = props => {
    const cartContext = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        const item = {
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        };

        cartContext.addItem(item);
    };

    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm
                    id={props.id}
                    onAddToCartHandler={addToCartHandler}/>
            </div>
        </li>
    );
}

export default MealItem;