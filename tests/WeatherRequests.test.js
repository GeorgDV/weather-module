const WeatherRequests = require('../src/WeatherRequests');

jest.setTimeout(10000);
describe('API Request Tests:', () => {
    test('getCity HTTPS Request returns correct data for London', async () => {
        const response = await WeatherRequests.getCityRequest('london');
        const expectedArray = [
            {
                "title":"London",
                "location_type":"City",
                "woeid":44418,
                "latt_long":"51.506321,-0.12714"
            }
        ]

        expect(response).toBeTruthy();
        expect(response).toEqual(expect.arrayContaining(expectedArray));
    });

    test('getCity HTTPS Request returns correct data for Washington', async () => {
        const response = await WeatherRequests.getCityRequest('washington');
        const expectedArray = [
            {
                "title":"Washington DC",
                "location_type":"City",
                "woeid":2514815,
                "latt_long":"38.899101,-77.028999"
            }
        ]

        expect(response).toBeTruthy();
        expect(response).toEqual(expect.arrayContaining(expectedArray));
    });




    test('getWeather HTTPS Request returns correct data for London', async () => {
        const response = await WeatherRequests.getWeatherRequest(44418);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('title', 'London');
        expect(response).toHaveProperty('location_type', 'City');
        expect(response).toHaveProperty('woeid', 44418);
        expect(response).toHaveProperty('latt_long', '51.506321,-0.12714');
        expect(response).toHaveProperty('timezone', 'Europe/London');
        expect(response).toHaveProperty('consolidated_weather');
        expect(response).toHaveProperty('sources');
    });

    test('getWeather HTTPS Request returns correct data for San Fransico', async () => {
        const response = await WeatherRequests.getWeatherRequest(2487956);

        expect(response).toBeTruthy();
        expect(response).toHaveProperty('title', 'San Francisco');
        expect(response).toHaveProperty('location_type', 'City');
        expect(response).toHaveProperty('woeid', 2487956);
        expect(response).toHaveProperty('latt_long', '37.777119, -122.41964');
        expect(response).toHaveProperty('timezone', 'US/Pacific');
        expect(response).toHaveProperty('consolidated_weather');
        expect(response).toHaveProperty('sources');
    });
});