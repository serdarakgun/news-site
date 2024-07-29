'use client';
import { fetchFilm, reduxStore } from '@/src/redux';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import FilmCards from '@/src/components/filmCard';

interface FilmItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
const Movie = () => {
  const [inputFilm, setInputFilm] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FilmItem[]>([]);

  const handleFilmNameChange = (e: any) => {
    setInputFilm(e.target.value);
  };

  const handleReleaseDateChange = (e: any) => {
    setInputYear(e.target.value);
  };

  const fetchFilmData = async (film: string, year: string) => {
    setLoading(true);

    try {
      const resultAction = await reduxStore.dispatch(fetchFilm({ film, year }));
      if (fetchFilm.fulfilled.match(resultAction)) {
        const apiData = resultAction.payload.result;
        console.log(apiData);
        setData(apiData);
      } else {
        console.error('Failed to fetch data:');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleButton = () => {
    console.log('isim:' + inputFilm);
    console.log('yıl:' + inputYear);
    if (inputFilm) {
      fetchFilmData(inputFilm, inputYear);
    }
  };
  return (
    <div>
      <div className="col-12 flex justify-between card px-9 items-center">
        <div className="text-3xl col-12 md:col-5 font-bold">FİLMLER</div>
        <div className="">
          <div className="flex mb-2">
            <input
              className="border-green-300 bg-green-50 border-3 p-2 rounded-lg outline-none focus:border-green-500 focus:bg-green-100"
              placeholder="Film İsmi"
              value={inputFilm}
              onChange={handleFilmNameChange}
            />
          </div>
          <div className="flex mb-2">
            <input
              className="border-green-300 bg-green-50 border-3 p-2 rounded-lg outline-none focus:border-green-500 focus:bg-green-100"
              placeholder="Çıkış Tarihi"
              value={inputYear}
              onChange={handleReleaseDateChange}
            />
          </div>
          <div className="flex justify-center">
            <Button label="Ara" icon="pi pi-search" loading={loading} onClick={handleButton} className="w-7 text-sm" severity="success" />
          </div>
        </div>
      </div>
      <div>
        {data.length > 0 ? (
          <div className="col-12">
            {data.map((e, index) => (
              <FilmCards key={e.imdbID} title={e.Title} year={e.Year} type={e.Type} poster={e.Poster} />
            ))}
          </div>
        ) : (
          <div className="card col-12 text-center">Aramak İstediğiniz Filmi Giriniz</div>
        )}
      </div>
    </div>
  );
};
export default Movie;
