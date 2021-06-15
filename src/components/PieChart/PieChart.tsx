import React from 'react';
import { Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { selectDaily } from '../../features/covid/covidSlice';
import { useAppSelector } from '../../app/hooks';
export const PieChart: React.FC = () => {
  const daily = useAppSelector(selectDaily);

  const motality = (100 * daily[daily.length - 1].Deaths) / daily[daily.length - 1].Confirmed;

  const pieChart = daily[0] && (
    <Doughnut
      type='pie'
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            data: [
              daily[daily.length - 1].Confirmed,
              daily[daily.length - 1].Recovered,
              daily[daily.length - 1].Deaths,
            ],
            backgroundColor: ['rgba(0, 0, 255, 0.5)', '#008080', 'rgba(255, 0, 0, 0.5)'],
            hoverBackgroundColor: ['#36A2EB', '#3cb371', '#FF6384'],
            borderColor: ['transparent', 'transparent', 'transparent'],
          },
        ],
      }}
      options={{
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 15,
          },
        },
      }}
    />
  );

  return (
    <>
      <Typography align='center' color='textSecondary' gutterBottom>
        Motarity {motality.toFixed(2)} [%]
      </Typography>
      {pieChart}
    </>
  );
};
