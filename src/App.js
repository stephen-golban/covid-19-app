import React, { useState, useEffect } from 'react';
import './App.css';
import { TextField, Card, CardContent, MenuItem, FormControl, Select,} from '@material-ui/core';
import InfoBox from './InfoBox';
import LineGraph from "./LineGraph";
import jsonCountries from './jsonCountries.json';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { sortData, prettyPrintStat } from './util';
import BoxGraph from './BoxGraph';
import News from './News';
import BottomMenu from './BottomMenu'
import Table from './Table';
import numeral from "numeral";

// style constant for the options of the select list of the Autocomplete component
const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      display: 'flex',
      alignItems: 'center',
      marginRight: 10,
      fontSize: 18,
    },
  },
});

function App() {
  // Hooks

  // setting the select-list option styling code into a const so I can use on the return()
  const classes = useStyles();
  
  // setting the list of countries into the select list of the Autocomplete component
  const [countries, setCountries] = useState([]);

  // setting the info for the InfoBoxes
  const [countryInfo, setCountryInfo] = useState([]);

  // setting the data for the Live cases table
  const [tableData, setTableData] = useState([]);
  // setting the default option of the Autocomplete component as Worldwide
  const [country, setInputCountry] = useState("Worldwide");

  // setting the cases type for the Linegraph
  const [casesType, setcasesType] = useState("cases");

  // setting the Heading country name, default will be Worldwide
  const [heading, setHeading] = useState("Worldwide");

  const [casee, setCasee] = useState("cases");

  // setting the Heading country flag, default will be https://img.icons8.com/pastel-glyph/64/000000/earth-planet.png
  const [headingIcon, setHeadingIcon] = useState("https://img.icons8.com/pastel-glyph/64/000000/earth-planet.png");

  // Setting default Worldwide info on load
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // Retrieving the data from the jsonCountries.json file 
  useEffect(() => {
    const countryList = jsonCountries.map((country) => ({
      name: country.country,
      code: country.countryInfo.iso2,
      flag: country.countryInfo.flag,
    }))

    // setting the countryList data into the setCountries Hook
    setCountries(countryList);
  }, [])
  
  // Setting the table data and sorting it
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
          let sortedData = sortData(data);
          setTableData(sortedData);
      })
    }
    getCountries();
  }, [])

  // Setting the data into the InfoBoxes  
  const onCountryChange = async (e, values) => {

    // getting the country name from the select list of the Autocomplete component
    const countryName = values.name;

    // if the clicked country from the select list of the Autocomplete component is Worldwide then it will fetch the 1st api else it will fetch the second api
    const url =
        countryName === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryName}`;

      await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
      setInputCountry(countryName);
      setHeading(countryName)
      setHeadingIcon(values.flag);
    });
  };
  
  return (
    <div className="app">
      <div className="inside-app">
        <div className="app__left">
          <div className="app__header">
            <h1>COVID-19 Tracker</h1>
            <Autocomplete
              className="country-select"
              options={countries}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              onChange={onCountryChange}
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <React.Fragment>
                  <span><img src={option.flag} alt="country-flag" className="country-select-flag"/></span>
                  {option.name} ({option.code})
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={country}
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </div>
          <div className="app__stats">
            <div className="heading">
              <img src={headingIcon} alt="heading-flag"/>
              <span>{heading}</span>
            </div>
            <div className="infobox-container">
              <InfoBox
                title="Coronavirus Cases"
                confirmed='fas fa-user'
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={numeral(countryInfo.cases).format("0.0a")}
              />
              <InfoBox
                title="Coronavirus Recovered"
                recovered="fas fa-smile"
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={numeral(countryInfo.recovered).format("0.0a")}
              />
              <InfoBox
                title="Coronavirus Deaths"
                death="fas fa-skull-crossbones"
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={numeral(countryInfo.deaths).format("0.0a")}
              />
            </div>
              <Card className="linegraph-container">
                <div className="select-type">
                <h3>Worldwide stats</h3>
                  <FormControl>
                    <Select
                      variant="outlined"
                      value={casee}
                      className="select-component"
                      onChange={(e) => {
                        setcasesType(e.target.value);
                        setCasee(e.target.value);
                      }}
                    >
                    <MenuItem value="cases">Infected</MenuItem>
                    <MenuItem value="recovered">Recovered</MenuItem>
                    <MenuItem value="deaths">Deaths</MenuItem>
                  </Select>
                  </FormControl>
                </div>
                <LineGraph casesType={casesType} />
                <h3>Top Continents</h3>
                <BoxGraph  casesType={casesType} className="boxgraph"/>
              </Card>
          </div>
        </div>
        <div className="app__right">
        <Card className="card">
          <CardContent>
            <div className="app__information">
              <h3>Live Cases by Country</h3>
              <Table countries={tableData}/>
            </div>
              <h2>Google News - Latest</h2>
            <div className="news-container">
              <News/>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
        <BottomMenu/>
        <p className="footer">Made with love by <a href="https://stefan-golban.netlify.app">Stefan Golban</a></p>
        <i className="fas fa-angle-up" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}></i>
    </div>
  );
}

export default App;
