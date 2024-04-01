const { fetchAirQualityData,weatherConditionUpdate  } = require('C:/Users/chand/OneDrive/Desktop/git/weatherAPI/public/index.js');

describe('fetchAirQualityData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchinf air quality data case', async () => {

    const mockAirQualityData = {
      list: [
        {
          main: { aqi: 2 },
          components: { pm2_5: 5, pm10: 10 }
        }
      ]
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockAirQualityData)
    });

    const lat = 40.7128;
    const lon = -74.0060;
    const apiKey = "3583598f2905696b1295fb5241a59449";
    const weatherInfo = await fetchAirQualityData(lat, lon, apiKey, {});
    console.log("hye man"+JSON.stringify(weatherInfo))

    const expected = {
      aqi: 2,
      pm2_5: 5,
      pm10: 10
    };
    expect(weatherInfo).toEqual(expect.objectContaining(expected));
  });

  it('error handling case', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch air quality data'));

    const lat = 40.7128;
    const lon = -74.0060;
    const apiKey = 'YOUR_API_KEY';

    await expect(fetchAirQualityData(lat, lon, apiKey, {})).rejects.toThrow('Failed to fetch air quality data');
  });
});

// weather test case
document.getElementById = jest.fn().mockReturnValue({
  style: {
    backgroundImage: ''
  }
});

describe('weatherConditionUpdate', () => {
  beforeEach(() => {
    document.getElementById.mockClear();
  });

  it('thunderstorm check case', () => {
    weatherConditionUpdate(215);
    expect(document.getElementById).toHaveBeenCalledWith('background-image');
    expect(document.getElementById().style.backgroundImage).toBe("url('/thunderstorm.gif')");
  });

  it('rain check case', () => {
    weatherConditionUpdate(400);
    expect(document.getElementById).toHaveBeenCalledWith('background-image');
    expect(document.getElementById().style.backgroundImage).toBe("url('/rain.gif')");
  });

  it('snow check case', () => {
    weatherConditionUpdate(615);
    expect(document.getElementById).toHaveBeenCalledWith('background-image');
    expect(document.getElementById().style.backgroundImage).toBe("url('/snow.gif')");
  });

  it('haze check case', () => {
    weatherConditionUpdate(750);
    expect(document.getElementById).toHaveBeenCalledWith('background-image');
    expect(document.getElementById().style.backgroundImage).toBe("url('/haze.gif')");
  });

  it('cloud check case', () => {
    weatherConditionUpdate(802);
    expect(document.getElementById).toHaveBeenCalledWith('background-image');
    expect(document.getElementById().style.backgroundImage).toBe("url('/cloud.gif')");
  });

  it('default case', () => {
    weatherConditionUpdate(1000);
    expect(document.getElementById).toHaveBeenCalledWith('background-image');
    expect(document.getElementById().style.backgroundImage).toBe("url('default.jpg')");
  });
});