import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    console.log(action);
    if (action.type === 'ADD') {
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount; // Calculate the total amount after adding a new cart item
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id); // Get array index of cart item if exists
        const existingCartItem = state.items[existingCartItemIndex]; // Get existsing cart item by cart item array index

        let newItems;

        if (existingCartItem) { // Update existing cart item amount
            const newItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            newItems = [...state.items];
            newItems[existingCartItemIndex] = newItem;

        } else { // Add new item to cart 
            // const newItems = [...state.items, action.item];
            newItems = state.items.concat(action.item);
        }

        return {
            items: newItems,
            totalAmount: newTotalAmount
        };
    }

    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];

        const newTotalAmount = state.totalAmount - existingCartItem.price;

        let newItems;

        if (existingCartItem.amount === 1) { // Delete cart item if quantity is 1
            newItems = state.items.filter(item => item.id !== action.id);
        } else {
            const newItem = { // Update cart item by decrementing amount by 1
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            };

            newItems = [...state.items];
            newItems[existingCartItemIndex] = newItem;
        }

        return {
            items: newItems,
            totalAmount: newTotalAmount
        }
    }

    return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = item => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemHandler = id => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;