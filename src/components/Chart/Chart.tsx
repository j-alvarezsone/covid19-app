import React from 'react';
import styles from './Chart.module.css';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../app/hooks';
import { selectDaily } from '../../features/covid/covidSlice';
export const Chart: React.FC = () => {
  const daily = useAppSelector(selectDaily);
  const dates = daily.map(({ Date }) => Date);

  const lineChart = daily[0] && (
    <Line
      type='line'
      data={{
        labels: dates.map((date) => new Date(date).toDateString()),

        datasets: [
          {
            data: daily.map((data) => data.Confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            showLine: false,
          },
          {
            data: daily.map((data) => data.Recovered),
            label: 'Recovered',
            borderColor: 'green',
            showLine: false,
          },
          {
            data: daily.map((data) => data.Deaths),
            label: 'Deaths',
            borderColor: '#ff3370',
            showLine: false,
          },
        ],
      }}
    />
  );
  return <div className={styles.container}>{lineChart}</div>;
};
