import { useState, useEffect} from 'react';

export const useMeals = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [rawMeals, setRawMeals] = useState([]);

    useEffect(() => {
        const loadMeals = async () => {
            
            const response = await fetch('/meals');
            const rawMealsResponse = await response.json();
            setRawMeals(rawMealsResponse);
            setIsLoading(false);
        }

        loadMeals();
    }, []);
    // empty array passed as second arg to only cause useMeals to run only when page is loaded

    return { 
        isLoading,
        meals: rawMeals.map(rawMeal => ({
            ...rawMeal,
            plannedDate: new Date(rawMeal.plannedDate),
        })),
        setMeals: setRawMeals,
    };
}