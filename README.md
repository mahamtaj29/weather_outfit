# Outfit Recommendation Based on Weather Forecast

This is a weather forecast application built with React and Material-UI that provides outfit recommendations based on the current weather conditions. The application fetches weather data from the OpenWeatherMap API and suggests suitable clothing, footwear, and accessories based on the forecast.

## Live Demo

Check out the live demo on Vercel: [Outfit Recommendation App](https://weather-outfit-frontend.vercel.app/)

## Features

- **Weather Forecast**: Displays current weather conditions and a 5-day forecast.
- **Outfit Recommendations**: Suggests suitable clothing, footwear, and accessories based on weather conditions such as temperature, precipitation, and wind speed.
- **Responsive Design**: Built with Material-UI to ensure a responsive and modern design.
- **Background Image**: Dynamic background image based on weather conditions.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Material-UI**: React components for faster and easier web development.
- **OpenWeatherMap API**: Provides weather data.
- **Vercel**: Deployment platform for hosting the application.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository
2. Install the dependencies:
   Create a .env file in the root directory and add your OpenWeatherMap API key:
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   
3. Start the development server:
   Open your browser and navigate to http://localhost:3000 to see the application in action.


## Usage
- ** Enter a city name in the search bar and click "Search".
- ** The application will display the current weather and a 5-day forecast for the specified city.
- ** Based on the weather data, the application will provide outfit recommendations including clothing, footwear, and accessories.
  
## Customization
You can customize the recommendations logic in the src/utils/genClothingMsg.js and src/utils/genCoatMsg.js files. Adjust the temperature and precipitation thresholds to match your preferences.

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, feel free to open an issue or submit a pull request.

## Acknowledgements
- ** OpenWeatherMap API for providing the weather data.
- ** Material-UI for the UI components.

