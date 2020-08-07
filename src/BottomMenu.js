import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="tab"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



export default function BottomMenu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="lol">
      <AppBar position="static" color="default" >
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            >
            <Tab label="Prevention" icon={<LocalHospitalIcon />}  />
            <Tab label="Symptoms" icon={<AccessibilityIcon />}  />
            <Tab label="Resources" icon={<PermDataSettingIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="element-row">
            <div className="element">
                <img src={require('./assets/3079188.svg')} alt=""/>
                <h3>Stay at home as much as you can</h3>
            </div>
            <div className="element">
                <img src={require('./assets/2932309.svg')} alt=""/>
                <h3>Observe social distancing from others around you.</h3>
            </div>
            <div className="element">
                <img src={require('./assets/2913409.svg')} alt=""/>
                <h3>Wash your hands often. Use soap and water, or an alcohol-based hand rub.</h3>
            </div>
            <div className="element">
                <img src={require('./assets/3022870.svg')} alt=""/>
                <h3>Wear a mask when physical distancing is not possible.</h3>
            </div>
            <div className="element">
                <img src={require('./assets/3159875.svg')} alt=""/>
                <h3>Cover your cough / sneeze with your bent elbow or a tissue.</h3>
            </div>
            <div className="element">
                <img src={require('./assets/2932519.svg')} alt=""/>
                <h3>Seek medical attention if you have a fever, cough and difficulty breathing.</h3>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="element-container">
            <h3>Most Common</h3>
            <div className="element-row">
                <div className="element">
                    <img src={require('./assets/symptoms/2966394.svg')} alt=""/>
                    <h3>Fever</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/2877820.svg')} alt=""/>
                    <h3>Dry Cough</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/3017369.svg')} alt=""/>
                    <h3>Fatigue</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/2166997.svg')} alt=""/>
                    <h3>Aches and Pains</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/2950146.svg')} alt=""/>
                    <h3>Sore Throat</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/2854976.svg')} alt=""/>
                    <h3>Diarrhea</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/2599633.svg')} alt=""/>
                    <h3>Conjunctivitis</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/2877824.svg')} alt=""/>
                    <h3>Headache</h3>
                </div>
                <div className="element">
                    <img src={require('./assets/symptoms/2913552.svg')} alt=""/>
                    <h3>Discoloration of Fingers or Toes</h3>
                </div>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="resource-container">
            <h3>About this Website / WebApp</h3>
            <p>This is a personal project made to not only understand this pandemic but also to work on my programming skills.</p>
            <div className="box">
            <h2>Sources:</h2>
                <ol>
                    <li><a href="https://disease.sh/">disease.sh - Open disease data</a></li>
                    <li><a href="https://news.google.com/topstories">Google News</a></li>
                    <li><a href="https://rss.app/">RSS APP</a></li>
                </ol>
            </div>
        </div>
      </TabPanel>
    </div>
  );
}