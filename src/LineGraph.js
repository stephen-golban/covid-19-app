import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 2,
    },
  },
  maintainAspectRatio: true,
  
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
    
  }
  return chartData;
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});
  const [chartBG, setchartBG] = useState("rgba(204, 16, 52, 0.5)");
  const [chartBorder, setchartBorder] = useState("#CC1034");
  
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          // buildChart(chartData);

        if(casesType === "cases"){
          setchartBG("rgba(204, 16, 52, 0.5)");
          setchartBorder("#CC1034");
        }
        else if(casesType === "recovered") {
          setchartBG("#fde088");

          setchartBorder("#ffc107");
        }
        else {
          setchartBG("gray");
          setchartBorder("black");
        }
              });
          };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line className="linegraph"
          data={{
            datasets: [
              {
                backgroundColor: chartBG,
                borderColor: chartBorder,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;