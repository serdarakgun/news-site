'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useTranslations } from 'next-intl';
import { fetchFootballLeagueRanking } from '@/src/redux/FootballLeagueRanking-store';
import { fetchFootballLeagues } from '@/src/redux/footballLeagues-store';
import { reduxStore } from '@/src/redux';
import { setToastMessage } from '@/src/redux/toastMessage-store';

interface ColumnsMeta {
  field: string;
  header: string;
}

interface LeagueRanking {
  rank: string;
  lose: string;
  win: string;
  play: string;
  point: string;
  team: string;
}

interface Leagues {
  league: string;
  key: string;
}

const LeaguesPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<Leagues | null>(null);
  const [leagueRankingData, setLeagueRankingData] = useState<LeagueRanking[]>([]);
  const [leagueData, setLeagueData] = useState<Leagues[]>([]);
  const t = useTranslations('Football');
  const columnsLeague: ColumnsMeta[] = [{ field: 'league', header: t('headerLabel') }];
  const columnsLeagueRanking: ColumnsMeta[] = [
    { field: 'rank', header: t('label1') },
    { field: 'team', header: t('label2') },
    { field: 'play', header: t('label3') },
    { field: 'win', header: t('label4') },
    { field: 'lose', header: t('label5') },
    { field: 'point', header: t('label6') },
  ];
  const hasFetchedInitialPage = useRef(false); // useeffectten 1 tane fetchlemesi için

  useEffect(() => {
    setLeagueData([
      { league: 'a', key: 'a' },
      { league: 'b', key: 'b' },
      { league: 'c', key: 'c' },
      { league: 'd', key: 'd' },
    ]);
  }, []);

  /* useEffect(() => {
    if (hasFetchedInitialPage.current) {
      if (selectedLeague) {
        console.log(selectedLeague.key);
        fetchLeagueRanking(selectedLeague.key).then();
      }
    }
  }, [selectedLeague]);

  useEffect(() => {
    if (!hasFetchedInitialPage.current) {
      fetchLeagues().then();
      fetchLeagueRanking('super-lig').then();
      hasFetchedInitialPage.current = true;
    }
  }, []);

  const fetchLeagues = async () => {
    setLoading(true);
    try {
      const resultAction = await reduxStore.dispatch(fetchFootballLeagues());
      if (fetchFootballLeagues.fulfilled.match(resultAction)) {
        const newsData = resultAction.payload;
        console.log(newsData.result);
        setLeagueData(newsData.result);
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
  const fetchLeagueRanking = async (selectedLeague: string) => {
    setLoading(true);
    const league = selectedLeague ? selectedLeague : 'super-lig';
    console.log('bu lig çekilecek:' + league);
    try {
      const resultAction = await reduxStore.dispatch(fetchFootballLeagueRanking(league));
      if (fetchFootballLeagueRanking.fulfilled.match(resultAction)) {
        const newsData = resultAction.payload;
        console.log(newsData.result);
        setLeagueRankingData(newsData.result);
        reduxStore.dispatch(setToastMessage({ show: true, severity: 'success', summary: 'Başarılı', detail: 'data çekildi' }));
      } else {
        console.error('Failed to fetch data:');
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };*/

  return (
    <div>
      {loading ? (
        <div>
          <div
            className="flex justify-center p-4"
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.8)',
              borderRadius: '12px',
            }}
          >
            <div className="w-full">
              <DataTable
                value={leagueData}
                selectionMode="single"
                onSelectionChange={(e) => {
                  setSelectedLeague(e.value);
                }}
                className="rounded-lg overflow-hidden opacity-80 alignHeader-center"
                tableClassName="w-full"
                //alignHeader="center"
              >
                {columnsLeague.map((col, index) => (
                  <Column key={`${col.field}-${index}`} field={col.field} header={col.header} className="text-center" />
                ))}
              </DataTable>
            </div>
          </div>

          <div
            className="flex justify-center p-4"
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.8)',
              borderRadius: '12px',
            }}
          >
            <div className="w-full">
              <DataTable
                value={leagueData}
                className="rounded-lg overflow-hidden opacity-80 alignHeader-center"
                tableClassName="w-full"
                //alignHeader="center"
              >
                {columnsLeagueRanking.map((col, index) => (
                  <Column key={`${col.field}-${index}`} field={col.field} header={col.header} className="text-center" />
                ))}
              </DataTable>
            </div>
          </div>
        </div>
      ) : (
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" className="mb-5" />
      )}
    </div>
  );
};
export default LeaguesPage;
