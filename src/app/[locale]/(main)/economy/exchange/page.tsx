'use client';
import React, { useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { fetchExchange, reduxStore } from '@/src/redux';
import { setToastMessage } from '@/src/redux/toastMessage-store';
import { useTranslations } from 'next-intl';

interface Items {
  name: string;
  buying: number;
  buyingstr: string;
  selling: number;
  sellingstr: string;
  time: string;
  date: string;
  datetime: string;
  rate: number;
}

const Gold = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Items[]>([]);
  const [flag, setFlag] = React.useState<boolean>(true);
  const t = useTranslations('Economy');
  useEffect(() => {
    if (flag) {
      fetchExchangeData();
      setFlag(false);
      console.log(data[0]);
    }
  }, []);
  const fetchExchangeData = async () => {
    setLoading(true);
    try {
      const resultAction = await reduxStore.dispatch(fetchExchange());
      if (fetchExchange.fulfilled.match(resultAction)) {
        const newsData = resultAction.payload;
        //console.log(newsData.result);
        setData(newsData.result);
        reduxStore.dispatch(setToastMessage({ show: true, severity: 'success', summary: 'Başarılı', detail: 'data çekildi' }));
      } else {
        console.error('Failed to fetch data:');
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };
  const rateBodyTemplate = (rowData: Items) => {
    if (rowData.rate > 0) {
      return <span className="text-green-500 font-bold">{`${rowData.rate} ↑`}</span>;
    } else if (rowData.rate === 0) {
      return <span className=" font-bold">{`${rowData.rate} =`}</span>;
    } else {
      return <span className="text-red-500 font-bold">{`${rowData.rate} ↓`}</span>;
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
          <div className="col-12 card flex flex-column align-center text-center md:flex-row md:justify-between md:items-center md:px-0">
            <div className=" text-3xl col-12 md:col-5 font-bold">{t('headerExchange')}</div>
            <div className="flex flex-column justify-center items-center col-12 md:flex-column md:col-3">
              <div className="text-xl mb-2 font-medium">son güncelleme</div>
              <div>saat: {data ? data[0]?.time : ''}</div>
              <div>tarih: {data ? data[0]?.date : ''}</div>
            </div>
          </div>
          <div className="col-12 card mb-3">
            <DataTable value={data} tableClassName="col-12 ">
              <Column field="name" header={t('label1')} body={(rowData: Items) => `${rowData.name}`} className="font-bold" />
              <Column field="buy" header={t('label2')} body={(rowData: Items) => `${rowData.buying} TL`} className="font-bold" />
              <Column field="sell" header={t('label3')} body={(rowData: Items) => `${rowData.selling} TL`} className="font-bold" />
              <Column field="rate" header={t('label4')} body={rateBodyTemplate} />
            </DataTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gold;
