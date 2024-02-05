import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { SearchBar } from '../components/searchBar';
import { AiFillHeart } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export const Category = () => {
    let [meals, setMeals] = useState([]);
    let [favs, setFavs] = useState([]);
    const params = useParams();
    useEffect(() => {
        Axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.categoryName}`).then(
            (res) => {

                setMeals(res.data.meals);

            }
        );

    
    }, []);
    const [input, setInput] = useState("");
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    if (input.length > 0) {
        meals = meals.filter((i) => {
            return i.strMeal.toLowerCase().match(input.toLowerCase());
        });
    }
    let addToFav = (meal) => {
        // setFav(fav.push(meal.idMeal));
        // console.log(fav);
        let favMeals = {
            meals: []
        };
        if (localStorage.getItem('meals')) {
            favMeals.meals.push(...JSON.parse(localStorage.getItem('meals')).meals);
        }
        if (!favMeals.meals.filter(e => e.idMeal === meal.idMeal).length > 0)
            favMeals.meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(favMeals));
    };
    
    return (
        <div >
            <div className="flex place-content-center items-center">
                <SearchBar handleChange={handleChange} />
            </div>
            {(meals.length > 0) ? (
                <div className='flex flex-row flex-wrap place-content-center'>
                    {meals.map((meal) => (

                        <div key={meal.idMeal} className="card lg:basis-1/6 md:basis-1/4 sm:basis-1 m-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-white dark:border-gray-700">
                            <Link to={`/meal/${meal.idMeal}`}>
                                <img className="rounded-t-lg" src={meal.strMealThumb} alt={meal.strMealThumb} />
                            </Link>
                            <div className="p-5">
                                <Link to={`/meal/${meal.idMeal}`}>
                                    <h5 className="mb-2 text-lg  font-bold tracking-tight text-gray-900 dark:text-grey-800">{meal.strMeal}</h5>
                                </Link>
                                <div className='flex flex-row flex-wrap items-center justify-between'>
                                    <Link to={`/meal/${meal.strYoutube}`}>
                                        <AiFillYoutube className='w-6 h-6 cursor-pointer' />
                                    </Link>
                                    <AiFillHeart className='w-6 h-6 cursor-pointer' color='red' onClick={() => addToFav(meal)} />
                                    {/* )}                                 */}
                                    </div>
                            </div>

                        </div>

                    ))}
                </div>
            ) :
                (
                    <div className="py-20 text-center">
                        <h1 className="text-center">No Meals found</h1>
                    </div>
                )}
        </div>
    )
}