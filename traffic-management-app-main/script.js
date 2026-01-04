// Simulated real-time traffic data (Shared between all pages)
const trafficData = [
    { direction: "North", vehicles: 25 },
    { direction: "South", vehicles: 40 },
    { direction: "East", vehicles: 30 },
    { direction: "West", vehicles: 20 }
];

// Simulated Traffic Light Status
const trafficLights = [
    { direction: "North", status: "Green" },
    { direction: "South", status: "Red" },
    { direction: "East", status: "Yellow" },
    { direction: "West", status: "Red" }
];

// Simulated Traffic Alerts
const trafficAlerts = [
    { type: "Accident", direction: "East", description: "Minor collision causing delays." },
    { type: "Congestion", direction: "South", description: "Heavy traffic due to construction." },
    { type: "Roadwork", direction: "West", description: "Ongoing construction causing minor delays." }
];

// Simulated Additional Information (Weather and Road Conditions)
let weatherData = {
    temperature: 22,  // Celsius
    condition: "Clear skies",
    humidity: 60,  // Percentage
    windSpeed: 15  // km/h
};

// Function to display traffic data on the homepage
function displayTrafficData() {
    const trafficList = document.getElementById('traffic-list');
    trafficList.innerHTML = '';
    trafficData.forEach(data => {
        const listItem = document.createElement('li');
        listItem.textContent = `${data.direction}: ${data.vehicles} vehicles`;
        trafficList.appendChild(listItem);
    });
    updateTrafficLightStatus();
    updateAlerts();
    updateAdditionalInfo();
}

// Function to update traffic light statuses
function updateTrafficLightStatus() {
    const lightStatusList = document.getElementById('light-status-list');
    lightStatusList.innerHTML = '';
    trafficLights.forEach(light => {
        const statusItem = document.createElement('li');
        statusItem.textContent = `${light.direction} Light: ${light.status}`;
        lightStatusList.appendChild(statusItem);
    });
}

// Function to display traffic alerts on the homepage
function updateAlerts() {
    const alertList = document.getElementById('alert-list');
    alertList.innerHTML = '';
    trafficAlerts.forEach(alert => {
        const alertItem = document.createElement('li');
        alertItem.textContent = `${alert.type} - ${alert.direction}: ${alert.description}`;
        alertList.appendChild(alertItem);
    });
}

// Function to update additional information (weather & road conditions)
function updateAdditionalInfo() {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.textContent = `Weather: ${weatherData.temperature}°C, ${weatherData.condition}, Humidity: ${weatherData.humidity}%, Wind Speed: ${weatherData.windSpeed} km/h`;

    const roadConditions = document.getElementById('road-conditions');
    roadConditions.textContent = "Road Conditions: Clear (No accidents or road closures).";
}

// Function to simulate random updates of traffic data (every 5 seconds)
function simulateTrafficData() {
    setInterval(() => {
        trafficData.forEach(data => {
            data.vehicles = Math.floor(Math.random() * 50) + 10; // Randomize vehicle count between 10 and 60
        });
        displayTrafficData();
    }, 5000);
}

// Function to handle user interaction for adjusting traffic light timers (Control Panel)
function setTrafficLightTimer(direction, timerValue) {
    const light = trafficLights.find(light => light.direction === direction);
    if (light) {
        light.timer = timerValue;
        console.log(`Timer for ${direction} direction set to ${timerValue} seconds.`);
    }
}

// Function to dynamically update traffic light statuses on the control panel page
function updateTrafficLightControls() {
    const controlPanel = document.getElementById('traffic-light-controls');
    controlPanel.innerHTML = '';
    trafficLights.forEach(light => {
        const timerInput = document.createElement('input');
        timerInput.type = 'number';
        timerInput.value = light.timer || 30;  // Default timer value is 30 seconds
        timerInput.min = 10;
        timerInput.max = 60;
        timerInput.addEventListener('change', () => setTrafficLightTimer(light.direction, timerInput.value));
        
        const label = document.createElement('label');
        label.textContent = `${light.direction} Timer (seconds): `;
        controlPanel.appendChild(label);
        controlPanel.appendChild(timerInput);
        controlPanel.appendChild(document.createElement('br'));
    });
}

// Function to handle the control panel update (when the button is clicked to set timer)
function setTimersFromControlPanel() {
    const northTimer = document.getElementById('north-timer').value;
    const southTimer = document.getElementById('south-timer').value;
    const eastTimer = document.getElementById('east-timer').value;
    const westTimer = document.getElementById('west-timer').value;

    setTrafficLightTimer('North', northTimer);
    setTrafficLightTimer('South', southTimer);
    setTrafficLightTimer('East', eastTimer);
    setTrafficLightTimer('West', westTimer);

    alert('Traffic light timers updated successfully!');
}

// Function to update traffic analytics in the analytics page
function updateTrafficAnalytics() {
    const totalVehicles = trafficData.reduce((sum, data) => sum + data.vehicles, 0);
    const averageTraffic = (totalVehicles / trafficData.length).toFixed(2);
    const peakTraffic = Math.max(...trafficData.map(data => data.vehicles));

    const avgTrafficElem = document.getElementById('average-traffic');
    const peakTrafficElem = document.getElementById('peak-traffic');

    avgTrafficElem.textContent = `Average Traffic: ${averageTraffic} vehicles`;
    peakTrafficElem.textContent = `Peak Traffic: ${peakTraffic} vehicles`;
}

// Simulate real-time weather updates
function simulateWeatherData() {
    setInterval(() => {
        weatherData.temperature = Math.floor(Math.random() * 15) + 20; // Random temperature between 20 and 35°C
        weatherData.condition = Math.random() > 0.5 ? "Clear skies" : "Cloudy";
        weatherData.humidity = Math.floor(Math.random() * 40) + 50; // Random humidity between 50% and 90%
        weatherData.windSpeed = Math.floor(Math.random() * 20) + 10; // Random wind speed between 10 and 30 km/h

        updateAdditionalInfo();
    }, 10000);
}

// Initial page load functions
function initialize() {
    displayTrafficData();
    updateTrafficLightControls();
    updateTrafficAnalytics();
    simulateTrafficData();
    simulateWeatherData();
}

// Run initialization on page load
initialize();
