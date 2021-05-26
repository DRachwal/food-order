import { useState } from 'react';

import './Checkout.module.css';
import classes from './Checkout.module.css';

const initialInputs = {
    name: '',
    street: '',
    postal: '',
    city: ''
};

const initialIsTouched = {
    name: false,
    street: false,
    postal: false,
    city: false
};

const isEmpty = value => value.trim() === '';

const Checkout = props => {
    const [inputValues, setInputValues] = useState(initialInputs);
    const [inputIsTouched, setInputIsTouched] = useState(initialIsTouched);

    // Input validity
    const nameHasError = isEmpty(inputValues.name) && inputIsTouched.name;
    const streetHasError = isEmpty(inputValues.street) && inputIsTouched.street;
    const postalHasError = inputValues.postal.trim().length !== 6 && inputIsTouched.postal;
    const cityHasError = isEmpty(inputValues.city) && inputIsTouched.city;

    // Form validity
    const formIsValid = !nameHasError && !streetHasError && !postalHasError && !cityHasError;

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

    const inputChangeBlur = e => {
        const name = e.target.name;

        setInputIsTouched(prevState => {
            return {
                ...prevState,
                [name]: true
            }
        })

    }

    const submitHandler = e => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        props.onSendOrderHandler(inputValues);
        
        setInputIsTouched(initialIsTouched);
        setInputValues(initialInputs);
    }

    const nameInputClassName = `${classes.control} ${nameHasError && classes.invalid}`;
    const streetInputClassName = `${classes.control} ${streetHasError && classes.invalid}`;
    const postalInputClassName = `${classes.control} ${postalHasError && classes.invalid}`;
    const cityInputClassName = `${classes.control} ${cityHasError && classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={nameInputClassName}>
                <label htmlFor='name'>Your Name</label>
                <input
                    name='name'
                    type='text'
                    id='name'
                    value={inputValues.name}
                    onChange={inputChangeHandler}
                    onBlur={inputChangeBlur} />
                    {nameHasError && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetInputClassName}>
                <label htmlFor='street'>Street</label>
                <input
                    name='street'
                    type='text'
                    id='street'
                    value={inputValues.street}
                    onChange={inputChangeHandler}
                    onBlur={inputChangeBlur} />
                    {streetHasError && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalInputClassName}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    name='postal'
                    type='text'
                    id='postal'
                    value={inputValues.postal}
                    onChange={inputChangeHandler}
                    onBlur={inputChangeBlur} />
                    {postalHasError && <p>Please enter a valid postal code (6 characters long)!</p>}
            </div>
            <div className={cityInputClassName}>
                <label htmlFor='city'>City</label>
                <input
                    name='city'
                    type='text'
                    id='city'
                    value={inputValues.city}
                    onChange={inputChangeHandler}
                    onBlur={inputChangeBlur} />
                    {cityHasError && <p>Please enter a valid city!</p>}
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