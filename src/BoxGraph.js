import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import numeral from "numeral";

function BoxGraph({ casesType }) {
const [number, setNumbers] = useState("");
const [chartBG, setchartBG] = useState("rgba(204, 16, 52, 0.5)");

const options = {
    legend: {
        display: false,
      },
    labels: ['N. America', 'S. America', 'Asia', 'Europe', 'Australia'],
        datasets:[
        {
            data: number,
            backgroundColor: chartBG,
        }
    ],
    
}

const settings = {
    legend: {
        display: false,
      },
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          ticks: {
            callback(value) {
              // you can add your own method here (just an example)
              return numeral(value).format("0.0a")
            }
          }
        }]
      },
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            return numeral(tooltipItem.value).format("+0,0");
          },
        },
      },
}


  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/continents")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            setNumbers(data.map(elem => elem[casesType]))

            // change the bgColor of the chart 
          if(casesType === "cases"){
            setchartBG("rgba(204, 16, 52, 0.5)");
          }
          else if(casesType === "recovered") {
            setchartBG("#fde088");
          }
          else {
            setchartBG("gray");
          }
        });
    };
    
    fetchData();
  }, [casesType]);

  return (
    <div>
      <HorizontalBar
        data={options}
        options={settings}
      />
    </div>
  );
}

export default BoxGraph;