"use client";

import React, { useEffect, useState } from "react";
import { Cloud, CloudDrizzle, CloudFog, CloudRain, CloudSnow, CloudSun, Sun, Thermometer, Wind, Droplets, Umbrella } from "lucide-react";
import { fetchJaipurWeather, WeatherData, weatherCondition } from "@/data/weather";
import { useSystem } from "@/lib/systemContext";

export function WeatherIcon({ code, className = "h-6 w-6" }: { code: number; className?: string }) {
  const Icon = code === 0 ? Sun : code <= 3 ? CloudSun : code <= 48 ? CloudFog : code <= 57 ? CloudDrizzle : code <= 67 || code >= 80 && code <= 82 ? CloudRain : code <= 77 ? CloudSnow : code >= 95 ? CloudRain : Cloud;
  return <Icon className={className} aria-hidden="true"/>;
}

export function WeatherWidget() {
  const { openWindow } = useSystem();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    const load = () => fetchJaipurWeather().then((data) => { if (active) { setWeather(data); setError(false); } }).catch(() => { if (active) setError(true); });
    load();
    const id = window.setInterval(load, 15 * 60 * 1000);
    return () => { active = false; window.clearInterval(id); };
  }, []);
  return <button onClick={() => openWindow("weather")} aria-label="Open Jaipur weather" className="absolute right-5 top-[27rem] z-[1] hidden w-52 rounded-2xl border border-white/15 bg-slate-950/45 p-4 text-left text-white shadow-xl backdrop-blur-2xl transition hover:bg-slate-950/60 xl:block 2xl:right-10 2xl:top-56">
    <span className="block text-xs font-semibold">Jaipur</span>
    {weather ? <><span className="mt-2 flex items-center gap-3"><WeatherIcon code={weather.current.weatherCode} className="h-9 w-9 text-amber-300"/><span className="text-3xl font-light">{Math.round(weather.current.temperature)}°</span></span><span className="mt-1 block text-xs text-white/70">{weatherCondition(weather.current.weatherCode)}</span><span className="mt-3 block border-t border-white/10 pt-2 text-[10px] text-white/55">H {Math.round(weather.forecast[0]?.high ?? 0)}° · L {Math.round(weather.forecast[0]?.low ?? 0)}°</span><span className="mt-2 flex justify-between text-[10px] text-white/60">{weather.forecast.slice(1, 4).map((day) => <span key={day.date}>{new Date(`${day.date}T12:00:00`).toLocaleDateString("en", { weekday: "short" })} {Math.round(day.high)}°</span>)}</span></> : error ? <span className="mt-4 block text-xs text-white/65">Weather unavailable · Tap to retry in Weather</span> : <span className="mt-4 block animate-pulse text-xs text-white/65">Loading current weather…</span>}
    <span className="mt-3 block text-[9px] text-white/40">Weather data by Open-Meteo</span>
  </button>;
}

export function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const load = () => { setLoading(true); fetchJaipurWeather().then((data) => { setWeather(data); setError(false); }).catch(() => setError(true)).finally(() => setLoading(false)); };
  useEffect(() => { load(); const id = window.setInterval(load, 15 * 60 * 1000); return () => window.clearInterval(id); }, []);
  return <div className="h-full overflow-y-auto bg-gradient-to-b from-sky-500/20 to-slate-900/60 p-5 text-white sm:p-7"><div className="flex items-center gap-2 text-sm font-medium"><CloudSun size={18} className="text-sky-300"/> Jaipur, Rajasthan</div>{loading && !weather ? <p className="mt-8 text-sm text-white/70">Loading current weather…</p> : error && !weather ? <div className="mt-8"><p className="text-sm">Weather is temporarily unavailable.</p><button onClick={load} className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/15">Try again</button></div> : weather && <><div className="mt-7 flex items-center gap-5"><WeatherIcon code={weather.current.weatherCode} className="h-16 w-16 text-amber-300"/><div><div className="text-5xl font-light">{Math.round(weather.current.temperature)}°</div><div className="mt-1 text-sm text-white/70">{weatherCondition(weather.current.weatherCode)}</div></div></div><div className="mt-3 text-sm text-white/60">H {Math.round(weather.forecast[0]?.high ?? 0)}° · L {Math.round(weather.forecast[0]?.low ?? 0)}°</div><div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Thermometer,"Feels like",`${Math.round(weather.current.apparentTemperature)}°`],[Droplets,"Humidity",`${weather.current.humidity}%`],[Wind,"Wind",`${Math.round(weather.current.windSpeed)} km/h`],[Umbrella,"Precipitation",`${weather.current.precipitationProbability}%`]].map(([Icon,label,value]: any) => <div key={label} className="rounded-xl border border-white/10 bg-white/[0.07] p-3"><div className="flex items-center gap-2 text-[10px] text-white/55"><Icon size={13}/>{label}</div><div className="mt-2 text-sm font-medium">{value}</div></div>)}</div><h3 className="mt-7 text-xs font-semibold uppercase tracking-wider text-white/60">6 day forecast</h3><div className="mt-2 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.04]">{weather.forecast.map((day,index)=><div key={day.date} className="flex items-center gap-3 px-3 py-3 text-xs"><span className="w-20 text-white/75">{index===0?"Today":new Date(`${day.date}T12:00:00`).toLocaleDateString("en",{weekday:"long"})}</span><WeatherIcon code={day.weatherCode} className="h-4 w-4 text-sky-200"/><span className="flex-1 text-white/55">{weatherCondition(day.weatherCode)} · Rain {day.precipitationProbability}%</span><span className="text-white/60">{Math.round(day.low)}°</span><span className="w-8 text-right">{Math.round(day.high)}°</span></div>)}</div></>}<p className="mt-5 text-[10px] text-white/40">Weather data by Open-Meteo</p></div>;
}
