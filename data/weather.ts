export interface WeatherCurrent {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  windSpeed: number;
  weatherCode: number;
  time: string;
}

export interface WeatherDay {
  date: string;
  high: number;
  low: number;
  precipitationProbability: number;
  weatherCode: number;
}

export interface WeatherData {
  current: WeatherCurrent;
  forecast: WeatherDay[];
}

export function weatherCondition(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Conditions unavailable";
}

export async function fetchJaipurWeather(): Promise<WeatherData> {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=26.9124&longitude=75.7873&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=6";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Weather service unavailable");
  const data = await response.json();
  if (!data.current || !data.daily) throw new Error("Weather data unavailable");
  return {
    current: {
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitationProbability: data.current.precipitation_probability ?? 0,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
      time: data.current.time
    },
    forecast: data.daily.time.map((date: string, index: number) => ({
      date,
      high: data.daily.temperature_2m_max[index],
      low: data.daily.temperature_2m_min[index],
      precipitationProbability: data.daily.precipitation_probability_max[index],
      weatherCode: data.daily.weather_code[index]
    }))
  };
}
