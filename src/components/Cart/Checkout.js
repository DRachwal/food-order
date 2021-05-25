import { useState } from 'react';

import './Checkout.module.css';
import classes from './Checkout.module.css';

const initialInputs = {
    name: '',
    street: '',
    postal: '',
    city: ''
};

const Checkout = props => {
    const [inputValues, setInputValues] = useState(initialInputs);

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(name, value);
        
        setInputValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }

        })
    }

    const submitHandler = e => {
        e.preventDefault();
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    name='name'
                    type='text' 
                    id='name'
                    value={inputValues.name}
                    onChange={inputChangeHandler} />
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input 
                    name='street'
                    type='text' 
                    id='street'
                    value={inputValues.street}
                    onChange={inputChangeHandler} />
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    name='postal'
                    type='text' 
                    id='postal'
                    value={inputValues.postal}
                    onChange={inputChangeHandler} />
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input
                    name='city'
                    type='text' 
                    id='city'
                    value={inputValues.city}
                    onChange={inputChangeHandler} />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onHideCartHandler}>
                    Cancel
            </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;