import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [recentSearches, setRecentSearches] = useState(() => {
        const stored = localStorage.getItem('recentSearches');
        return stored ? JSON.parse(stored) : [];
    });
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState('');

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": cloud_icon,
        "04n": cloud_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const processForecast = (list) => {
        const forecastMap = new Map();
        list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!forecastMap.has(date)) {
                forecastMap.set(date, item);
            }
        });
        return Array.from(forecastMap.values()).slice(0, 5);
    };

    const search = async (city) => {
        if (!city) {
            alert("Please enter a city name");
            return;
        }

        setIsLoading(true);
        try {
            const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c90a83e5dc74759e43507fc9d596348a`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=c90a83e5dc74759e43507fc9d596348a`;

            const [currentRes, forecastRes] = await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl)
            ]);

            if (!currentRes.ok || !forecastRes.ok) {
                const errorData = await currentRes.json();
                throw new Error(errorData.message);
            }

            const currentData = await currentRes.json();
            const forecastData = await forecastRes.json();

            setWeatherData({
                humidity: currentData.main.humidity,
                windSpeed: currentData.wind.speed,
                temperature: Math.floor(currentData.main.temp),
                location: currentData.name,
                icon: allIcons[currentData.weather[0].icon] || clear_icon,
                description: currentData.weather[0].description
            });

            setForecastData(processForecast(forecastData.list));
            setCurrentCity(city);

            setRecentSearches(prev => {
                const updated = [city, ...prev.filter(c => c !== city)].slice(0, 5);
                localStorage.setItem('recentSearches', JSON.stringify(updated));
                return updated;
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // No default city load anymore
    // useEffect(() => {
    //     search('London');
    // }, []);

    return (
        <div className={`weather ${isDarkMode ? 'dark-theme' : ''}`}>
            <h1 className="dashboard-title">Weather Dashboard</h1>

            <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? '☀️' : '🌙'}
            </button>

            <button 
                className="refresh-btn"
                onClick={() => search(currentCity)}
                title="Refresh"
                disabled={!currentCity}
            >
                ↻
            </button>

            {isLoading && <div className="loader-overlay"><div className="loader"></div></div>}

            <div className="search-bar">
                <input 
                    ref={inputRef} 
                    type="text" 
                    placeholder="Search city..." 
                    onKeyPress={e => e.key === 'Enter' && search(inputRef.current.value)}
                />
                <div className="search-buttons">
                    <img 
                        src={search_icon} 
                        alt="Search" 
                        onClick={() => search(inputRef.current.value)}
                    />
                </div>
            </div>

            {recentSearches.length > 0 && (
                <div className="recent-searches">
                    <h3>Recent Searches:</h3>
                    {recentSearches.map((city, index) => (
                        <button 
                            key={index} 
                            className="recent-city"
                            onClick={() => search(city)}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            )}

            {weatherData && (
                <div className="current-weather">
                    <div className="main-info">
                        <img src={weatherData.icon} alt="Weather" className="weather-icon" />
                        <div>
                            <p className="temperature">{weatherData.temperature}°C</p>
                            <p className="location">{weatherData.location}</p>
                            <p className="description">{weatherData.description}</p>
                        </div>
                    </div>
                    <div className="weather-data">
                        <div className="data-item">
                            <img src={humidity_icon} alt="Humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="data-item">
                            <img src={wind_icon} alt="Wind" />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {forecastData.length > 0 && (
                <div className="forecast">
                    <h3>5-Day Forecast</h3>
                    <div className="forecast-cards">
                        {forecastData.map((day, index) => (
                            <div key={index} className="forecast-card">
                                <p className="forecast-date">
                                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                                </p>
                                <img 
                                    src={allIcons[day.weather[0].icon] || clear_icon} 
                                    alt="Weather" 
                                    className="forecast-icon" 
                                />
                                <p className="forecast-desc">{day.weather[0].description}</p>
                                <p className="forecast-temp">{Math.floor(day.main.temp)}°C</p>
                                <div className="forecast-details">
                                    <div className="detail-item">
                                        <img src={humidity_icon} alt="Humidity" className="detail-icon" />
                                        <span>{day.main.humidity}%</span>
                                    </div>
                                    <div className="detail-item">
                                        <img src={wind_icon} alt="Wind" className="detail-icon" />
                                        <span>{day.wind.speed} km/h</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
