import { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import MealItem from './MealItem/MealItem';

import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        fetch('https://react-tutorial-bb16b.firebaseio.com/meals.json')
        .then(result => result.json())
        .then(data => {
            const loadedMeals = [];

            for(const key in data) { // Transform firebase obect to array
                loadedMeals.push({
                    id: key,
                    ...data[key]
                })
            }

            setMeals(loadedMeals); // Set meals state
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        })
    }, [])


    if (isLoading)
        return <section className={styles['meals-loading']}>
            <p>Loading...</p>
        </section>

    if(error)
        return <section className={styles['meals-error']}>
            <p>{error}</p>
        </section>

    const mealsList = meals.map(meal => <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
    />);

    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;