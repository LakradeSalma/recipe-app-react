import React, { useState, useEffect } from 'react'
import Axios from "axios";
import Recommended from '../components/recommended';
import { SearchBar } from '../components/searchBar';
import { Categories } from '../components/categories';
import BannerBackground from "../assets/images/home-banner-background.png";
import BannerImage from "../assets/images/home-banner-image.png";



export const LandingPage = () => {
    let [categories, setCategories] = useState([]);
    useEffect(() => {
        Axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`).then(
            (res) => {
                setCategories(res.data.categories);
            }
        );
    }, []);
    const [input, setInput] = useState("");
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    if (input.length > 0) {
        categories = categories.filter((i) => {
            return i.strCategory.toLowerCase().match(input.toLowerCase());
        });
    }
    return (
           
        <div className='home-container'>               
                        
            <div className='home-banner-container'>
                <div className='home-bannerImage-container'>
                    <img src={BannerBackground} alt='' />
                </div>
                <div className='home-text-section'>
                    <h1 className='primary-heading'>
                    Welcome to our culinary haven
                    </h1>
                    <p className="primary-text">
                    Where flavors come to life and every meal is a celebration of taste!
                    </p>
                    <span className='searchBar justify-center'>
                    <SearchBar handleChange={handleChange} />
                    </span>
                </div>
                <div className='home-image-container'>
                    <img src={BannerImage} alt='' />
                </div>
            </div>
            
            <div>
                <Recommended />
                <Categories categories={categories} />
            </div>
        </div>

    )
}