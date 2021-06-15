import React, { useEffect } from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, Grid } from '@material-ui/core';
import styles from './DashBoard.module.css';
// redux
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAsyncGetDaily, selectDaily } from '../../features/covid/covidSlice';
// components
import { PieChart } from '../PieChart/PieChart';
import { Chart } from '../Chart/Chart';
import { Cards } from '../Cards/Cards';
import { SwitchCountry } from '../SwitchCountry/SwitchCountry';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#008080',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: 85,
  },
}));

export const DashBoard: React.FC = () => {
  const classes = useStyles();
  const daily = useAppSelector(selectDaily);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncGetDaily('Czech Republic'));
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <AppBar color='secondary' position='absolute'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Covid 19 Live Dashboard
            </Typography>
            <div>
              <Typography variant='body1'>{new Date(daily[daily.length - 1].Date).toDateString()}</Typography>
            </div>
          </Toolbar>
        </AppBar>

        <Container className={classes.content}>
          <div className={styles.container}>
            <SwitchCountry />
          </div>

          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Cards />
            </Grid>

            <Grid item xs={12} md={7}>
              <Chart />
            </Grid>

            <Grid item xs={12} md={5}>
              <PieChart />
            </Grid>
          </Grid>
        </Container>
      </div>
    </MuiThemeProvider>
  );
};
