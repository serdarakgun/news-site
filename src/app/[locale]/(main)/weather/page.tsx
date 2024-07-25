'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { fetchWeather, reduxStore, setToastMessage } from '@/src/redux';

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

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('ankara'); // Default city

  const cities = [
    { name: 'Adana', key: 'adana' },
    { name: 'Ankara', key: 'ankara' },
    { name: 'Istanbul', key: 'istanbul' },
    // Add more cities as needed
  ];

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity]);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);

    try {
      const resultAction = await reduxStore.dispatch(fetchWeather(city));
      if (fetchWeather.fulfilled.match(resultAction)) {
        const weatherData: WeatherData[] = resultAction.payload.result;
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
          <div className="col-12 card flex justify-between opacity-90">
            <div className="text-3xl">HAVA DURUMU: {selectedCity.toUpperCase()}</div>
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="Şehir seçiniz"
              filter
              className="w-full md:w-14rem"
            />
          </div>
          <div className="col-12 card">
            <DataTable value={data} tableClassName="col-12">
              <Column field="date" header="Tarih" />
              <Column field="day" header="Gün" />
              <Column
                field="icon"
                header="İkon"
                body={(rowData: WeatherData) => <img src={rowData.icon} alt={rowData.description} style={{ maxWidth: '50px', maxHeight: '50px' }} />}
              />
              <Column field="description" header="Açıklama" />
              <Column field="status" header="Durum" />
              <Column field="degree" header="Derece" />
              <Column field="min" header="Min" />
              <Column field="max" header="Max" />
              <Column field="night" header="Gece" />
              <Column field="humidity" header="Nem" />
            </DataTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
