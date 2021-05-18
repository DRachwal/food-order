import { useState } from 'react';

import Input from '../../UI/Input/Input';

import styles from './MealItemForm.module.css';

const MealItemForm = props => {
    const [amountInputValue, setAmountInputValue] = useState('1');
    const [amountIsValid, setAmountIsValid] = useState(true);

    const inputChangeHandler = e => {
        const value = e.target.value;
        setAmountInputValue(value);
    };

    const submitHandler = e => {
        e.preventDefault();

        const amountInputValueNumber = +amountInputValue;

        if (amountInputValue.trim().length === 0 || amountInputValue < 1 || amountInputValue > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCartHandler(amountInputValueNumber);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                input={{
                    id: props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    value: amountInputValue,
                    onChange: inputChangeHandler
                }} />
            <button> + Add </button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
}

export default MealItemForm;