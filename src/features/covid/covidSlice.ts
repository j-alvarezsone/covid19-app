import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { covidState, DATADAILY } from '../../types/types';
import dataDaily from './apiDataDaily.json';

const apiURL = 'https://api.covid19api.com/total/country';

const initialState: covidState = {
  daily: dataDaily,
  country: 'Czech Republic',
};

export const fetchAsyncGetDaily = createAsyncThunk('covid/getDaily', async (country: string) => {
  const { data } = await axios.get<DATADAILY>(`${apiURL}/${country}`);
  return { data, country };
});

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        daily: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

export const selectDaily = (state: RootState) => state.covid.daily;
export const selectCountry = (state: RootState) => state.covid.country;

export default covidSlice.reducer;
