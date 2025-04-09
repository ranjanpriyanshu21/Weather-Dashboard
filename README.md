# 🌦️ Weather Dashboard

A modern, responsive weather dashboard built with **React**, **Tailwind CSS**, and **OpenWeatherMap API**. It shows real-time weather updates, 5-day forecasts, recent searches, and includes dark mode support and smooth loading states.

---

## 🚀 Tech Stack

- **React** – Frontend framework
- **Tailwind CSS** – Styling with utility classes
- **Axios** – For handling API requests
- **Framer Motion** – UI animations
- **OpenWeatherMap API** – Source of weather data

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your OpenWeatherMap API key:

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

---

## ☁️ API Integration Details

### 🔗 OpenWeatherMap API

This app integrates with the [OpenWeatherMap API](https://openweathermap.org/api) to fetch:

- **Current Weather Data**
- **5-Day/3-Hour Forecast**

### 🔑 API Key

You can get a free API key by signing up at [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys).  
After that, include the key in your `.env` file as shown above.

### ⚠️ Rate Limits (Free Tier)

- **60 requests per minute**
- **1,000,000 requests per month**

Avoid hitting the limit by:
- Debouncing user input
- Caching recent queries

---

## 🌟 Features

- 🌍 Search for weather in any city
- 🌤️ Real-time weather and 5-day forecast
- 🌓 Light and dark mode toggle
- 🔁 Recent search history
- ⏳ Loading indicators for smooth UX
- 📱 Fully responsive design

---
## Screenshots
---
 ![](/Screenshots/dash01.jpg)
 ![](/Screenshots/dash02.jpg)
 ![](/Screenshots/dash03.jpg)
 ![](/Screenshots/dash04.jpg)
 ![](/Screenshots/dash05.jpg)
 ![](/Screenshots/dash06.jpg)

## 📁 Project Structure

```
weather-dashboard/
│
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Tailwind imports
│
├── .env                 # API keys (not committed)
├── package.json         # Dependencies & scripts
├── tailwind.config.js   # Tailwind setup
├── vite.config.js       # Vite bundler setup
```




