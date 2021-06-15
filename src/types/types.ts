import dataDaily from '../features/covid/apiDataDaily.json';

export type DATADAILY = typeof dataDaily;

export type covidState = {
  daily: DATADAILY;
  country: string;
};
