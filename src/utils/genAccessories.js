const genAccessories = (weatherDescription, humidity) => {
    if (weatherDescription === 'Clear') {
        return "Consider wearing sunglasses or a light scarf today.";
    } else if (weatherDescription === 'Rain' || weatherDescription === 'Drizzle') {
        return "Rain expected, an umbrella or raincoat is recommended today.";
    } else if (humidity > 70) {
        return "Humid weather, consider a light hat or scarf today.";
    } else {
        return " Carry a light scarf or sunglasses today.";
    }
};

export default genAccessories;
