'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { fetchReligion, reduxStore } from '@/src/redux';

interface Prayer {
  saat: string;
  vakit: string;
}

interface TransformedPrayer {
  imsak: string;
  sabah: string;
  öğle: string;
  ikindi: string;
  akşam: string;
  yatsı: string;
}

interface SelectedCity {
  name: string;
  key: string;
}

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const Religion = () => {
  const [selectedCity, setSelectedCity] = useState<SelectedCity>({ name: 'Ankara', key: 'ankara' });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TransformedPrayer[]>([]);
  const [nextPrayer, setNextPrayer] = useState<{ time: Date; name: string } | null>(null);
  const [countdownShow, setCountdownShow] = useState<Countdown | null>(null);

  const cities = [
    { name: 'Adana', key: 'adana' },
    { name: 'Adıyaman', key: 'adiyaman' },
    { name: 'Afyonkarahisar', key: 'afyonkarahisar' },
    { name: 'Ağrı', key: 'agri' },
    { name: 'Aksaray', key: 'aksaray' },
    { name: 'Amasya', key: 'amasya' },
    { name: 'Ankara', key: 'ankara' },
    { name: 'Antalya', key: 'antalya' },
    { name: 'Ardahan', key: 'ardahan' },
    { name: 'Artvin', key: 'artvin' },
    { name: 'Aydın', key: 'aydin' },
    { name: 'Balıkesir', key: 'balikesir' },
    { name: 'Bartın', key: 'bartin' },
    { name: 'Batman', key: 'batman' },
    { name: 'Bayburt', key: 'bayburt' },
    { name: 'Bilecik', key: 'bilecik' },
    { name: 'Bingöl', key: 'bingol' },
    { name: 'Bitlis', key: 'bitlis' },
    { name: 'Bolu', key: 'bolu' },
    { name: 'Burdur', key: 'burdur' },
    { name: 'Bursa', key: 'bursa' },
    { name: 'Çanakkale', key: 'canakkale' },
    { name: 'Çankırı', key: 'cankiri' },
    { name: 'Çorum', key: 'corum' },
    { name: 'Denizli', key: 'denizli' },
    { name: 'Diyarbakır', key: 'diyarbakir' },
    { name: 'Düzce', key: 'duzce' },
    { name: 'Edirne', key: 'edirne' },
    { name: 'Elazığ', key: 'elazig' },
    { name: 'Erzincan', key: 'erzincan' },
    { name: 'Erzurum', key: 'erzurum' },
    { name: 'Eskişehir', key: 'eskisehir' },
    { name: 'Gaziantep', key: 'gaziantep' },
    { name: 'Giresun', key: 'giresun' },
    { name: 'Gümüşhane', key: 'gumushane' },
    { name: 'Hakkari', key: 'hakkari' },
    { name: 'Hatay', key: 'hatay' },
    { name: 'Iğdır', key: 'igdir' },
    { name: 'Isparta', key: 'isparta' },
    { name: 'İstanbul', key: 'istanbul' },
    { name: 'İzmir', key: 'izmir' },
    { name: 'Kahramanmaraş', key: 'kahramanmaras' },
    { name: 'Karabük', key: 'karabuk' },
    { name: 'Karaman', key: 'karaman' },
    { name: 'Kars', key: 'kars' },
    { name: 'Kastamonu', key: 'kastamonu' },
    { name: 'Kayseri', key: 'kayseri' },
    { name: 'Kırıkkale', key: 'kirikkale' },
    { name: 'Kırklareli', key: 'kirklareli' },
    { name: 'Kırşehir', key: 'kirsehir' },
    { name: 'Kilis', key: 'kilis' },
    { name: 'Konya', key: 'konya' },
    { name: 'Kütahya', key: 'kutahya' },
    { name: 'Malatya', key: 'malatya' },
    { name: 'Manisa', key: 'manisa' },
    { name: 'Mardin', key: 'mardin' },
    { name: 'Mersin', key: 'mersin' },
    { name: 'Muğla', key: 'mugla' },
    { name: 'Muş', key: 'mus' },
    { name: 'Nevşehir', key: 'nevsehir' },
    { name: 'Niğde', key: 'nigde' },
    { name: 'Ordu', key: 'ordu' },
    { name: 'Osmaniye', key: 'osmaniye' },
    { name: 'Rize', key: 'rize' },
    { name: 'Sakarya', key: 'sakarya' },
    { name: 'Samsun', key: 'samsun' },
    { name: 'Şanlıurfa', key: 'sanliurfa' },
    { name: 'Şırnak', key: 'sirnak' },
    { name: 'Tekirdağ', key: 'tekirdag' },
    { name: 'Tokat', key: 'tokat' },
    { name: 'Trabzon', key: 'trabzon' },
    { name: 'Tunceli', key: 'tunceli' },
    { name: 'Uşak', key: 'usak' },
    { name: 'Van', key: 'van' },
    { name: 'Yalova', key: 'yalova' },
    { name: 'Yozgat', key: 'yozgat' },
    { name: 'Zonguldak', key: 'zonguldak' },
  ];

  const columns = [
    { field: 'imsak', header: 'İmsak' },
    { field: 'sabah', header: 'Sabah' },
    { field: 'öğle', header: 'Öğle' },
    { field: 'ikindi', header: 'İkindi' },
    { field: 'akşam', header: 'Akşam' },
    { field: 'yatsı', header: 'Yatsı' },
  ];

  useEffect(() => {
    if (selectedCity) {
      fetchReligionData(selectedCity.key);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (nextPrayer) {
      const interval = setInterval(() => {
        updateCountdown();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextPrayer]);

  const fetchReligionData = async (city: string) => {
    setLoading(true);

    try {
      const resultAction = await reduxStore.dispatch(fetchReligion(city));
      if (fetchReligion.fulfilled.match(resultAction)) {
        const apiData: Prayer[] = resultAction.payload.result;

        const transformedData: TransformedPrayer[] = [
          apiData.reduce((acc, prayer) => {
            switch (prayer.vakit) {
              case 'İmsak':
                acc.imsak = prayer.saat;
                break;
              case 'Güneş':
                acc.sabah = prayer.saat;
                break;
              case 'Öğle':
                acc.öğle = prayer.saat;
                break;
              case 'İkindi':
                acc.ikindi = prayer.saat;
                break;
              case 'Akşam':
                acc.akşam = prayer.saat;
                break;
              case 'Yatsı':
                acc.yatsı = prayer.saat;
                break;
              default:
                break;
            }
            return acc;
          }, {} as TransformedPrayer),
        ];

        setData(transformedData);
        const nextPrayerData = getNextPrayerDate(transformedData[0]);
        if (nextPrayerData) {
          setNextPrayer(nextPrayerData);
        }
      } else {
        console.error('Failed to fetch data:');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNextPrayerDate = (prayers: TransformedPrayer) => {
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format

    const prayerTimes = Object.entries(prayers).map(([key, time]) => {
      return { name: key, time: new Date(`${todayDate}T${time}:00`) };
    });

    // Ensure prayer times are ordered correctly
    prayerTimes.sort((a, b) => a.time.getTime() - b.time.getTime());

    const futurePrayers = prayerTimes.filter((prayer) => prayer.time > now);
    if (futurePrayers.length === 0) return null;

    return futurePrayers[0];
  };

  const updateCountdown = () => {
    const now = new Date();
    if (!nextPrayer) return;

    const nextPrayerDate = nextPrayer.time;

    if (nextPrayerDate <= now) {
      const nextPrayerData = getNextPrayerDate(data[0]);
      if (nextPrayerData) {
        setNextPrayer(nextPrayerData);
      }
      return;
    }

    const timeRemaining = getTimeRemaining(nextPrayerDate, now);
    setCountdownShow(timeRemaining);
  };

  const getTimeRemaining = (nextPrayerTime: Date, now: Date) => {
    const totalSeconds = Math.max(0, Math.floor((nextPrayerTime.getTime() - now.getTime()) / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
  };

  return (
    <div>
      {loading ? (
        <div className="col-12 flex justify-center align-center">
          <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" className="mb-5" />
        </div>
      ) : (
        <div>
          <div className="col-12 card flex justify-between">
            <div className="text-3xl">NAMAZ VAKİTLERİ: {selectedCity.name.toUpperCase()}</div>
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={cities}
              optionLabel="name"
              placeholder="şehir seçiniz"
              filter
              className="w-full md:w-14rem"
            />
          </div>

          <div className="col-12 card ">
            <DataTable value={data} tableClassName="col-12">
              {columns.map((col, i) => (
                <Column key={i} field={col.field} header={col.header} />
              ))}
            </DataTable>
          </div>
          {countdownShow && nextPrayer && (
            <div className="col-12 card">
              <div className="text-xl">
                {nextPrayer.name.toUpperCase()} VAKTİNE KALAN SÜRE:{' '}
                {`${countdownShow.hours} SAAT ${countdownShow.minutes} DAKİKA ${countdownShow.seconds} SANİYE`}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Religion;
