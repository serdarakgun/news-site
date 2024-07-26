'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { fetchWeather, reduxStore, setToastMessage } from '@/src/redux';
import { useTranslations } from 'next-intl';
import citiesJson from './cities.json';

interface WeatherData {
  date: string;
  day: string;
  icon: string;
  description: string;
  status: string;
  degree: string;
  min: string;
  max: string;
  night: string;
  humidity: string;
}
interface CitySelection {
  name: string;
  key: string;
}
const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<CitySelection>({ name: 'Ankara', key: 'ankara' }); // Default city
  const t = useTranslations('Weather');
  const cities = citiesJson.map((e) => ({
    ...e,
    label: t(e.label),
  }));
  useEffect(() => {
    if (selectedCity) {
      console.log(selectedCity.name.toUpperCase());
      fetchWeatherData(selectedCity.key);
    }
  }, [selectedCity]);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);

    try {
      const resultAction = await reduxStore.dispatch(fetchWeather(city));
      if (fetchWeather.fulfilled.match(resultAction)) {
        const weatherData: WeatherData[] = resultAction.payload.result.map((item: any) => ({
          ...item,
          degree: Math.round(item.degree),
          min: Math.round(item.min),
          max: Math.round(item.max),
          night: Math.round(item.night),
          humidity: Math.round(item.humidity),
        }));
        setData(weatherData);
        reduxStore.dispatch(setToastMessage({ show: true, severity: 'success', summary: 'Başarılı', detail: 'Data çekildi' }));
      } else {
        console.error('Failed to fetch data:');
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="col-12 flex justify-center align-center">
          <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" className="mb-5" />
        </div>
      ) : (
        <div>
          <div className="col-12 card flex justify-center items-center flex-column md:flex-row md:justify-between">
            <div className="text-3xl mb-3 md:mb-0">
              {t('headerLabel')}: {selectedCity.name.toUpperCase()}
            </div>
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              optionGroupLabel="label"
              optionGroupChildren="items"
              options={cities}
              optionLabel="name"
              placeholder="Şehir seçiniz"
              filter
              className="w-12rem h-3rem md:w-14rem"
            />
          </div>
          <div className="col-12 card">
            <DataTable value={data} tableClassName="col-12">
              <Column field="date" header={t('label1')} body={(rowData: WeatherData) => `${rowData.date}`} />
              <Column field="day" header={t('label2')} body={(rowData: WeatherData) => `${t(rowData.day)}`} />
              <Column
                field="icon"
                header={t('label3')}
                body={(rowData: WeatherData) => <img src={rowData.icon} alt={rowData.description} style={{ maxWidth: '50px', maxHeight: '50px' }} />}
              />
              <Column field="description" header={t('label4')} body={(rowData: WeatherData) => `${t(rowData.description)}`} />
              <Column field="degree" header={t('label5')} body={(rowData: WeatherData) => `${rowData.degree}C°`} />
              <Column field="min" header={t('label6')} body={(rowData: WeatherData) => `${rowData.min}C°`} />
              <Column field="max" header={t('label7')} body={(rowData: WeatherData) => `${rowData.max}C°`} />
              <Column field="night" header={t('label8')} body={(rowData: WeatherData) => `${rowData.night}C°`} />
              <Column field="humidity" header={t('label9')} body={(rowData: WeatherData) => `${rowData.humidity}%`} />
            </DataTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
