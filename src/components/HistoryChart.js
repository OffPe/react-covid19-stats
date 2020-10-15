import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { Card, CardContent } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import API_ENDPOINTS from "../constants/api";
import axios from "axios";

const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function(tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "D MMM",
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
          callback: function(value, index, values) {
            return numeral(value).format("0a");
          },
        },
        id: "y-axis-1",
        display: false,
      },
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function(value, index, values) {
            return numeral(value).format("0a");
          },
        },
        id: "y-axis-2",
        display: false,
      },
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function(value, index, values) {
            return numeral(value).format("0a");
          },
        },
        id: "y-axis-3",
        display: false,
      },
    ],
  },
};

const setData = async (setDataFunc, chart) => {
  let api_response;
  let chartData = [];
  let dataSel = chart;
  try {
    api_response = await axios.get(API_ENDPOINTS.DATA);
  } catch (error) {
    console.log("Error:", error);
    return;
  }
  for (let currentData of api_response.data.cases_time_series) {
    let newDataPoint = {
      x: currentData.date,
      y: currentData[dataSel],
    };
    chartData.push(newDataPoint);
  }

  setDataFunc(chartData.slice(Math.max(chartData.length - 50, 1)));
};

const HistoryChart = ({ chart }) => {
  const [historyData, sethistoryData] = useState();
  const [recoverData, setRecoverData] = useState();
  const [deathData, setDeathData] = useState();

  const chartCompleteData = [
    {
      name: "dailyconfirmed",
      data: {
        chartLabel: "Confirmed Cases",
        chartColor: red[500],
        chartBorderColor: red[500],
      },
    },
    {
      name: "dailyrecovered",
      data: {
        chartLabel: "Recovered Cases",
        chartColor: green[500],
        chartBorderColor: green[500],
      },
    },
    {
      name: "dailydeceased",
      data: {
        chartLabel: "Deceased Cases",
        chartColor: grey[500],
        chartBorderColor: grey[900],
      },
    },
  ];

  useEffect(() => {
    setData(sethistoryData, chartCompleteData[0].name);
    setData(setRecoverData, chartCompleteData[1].name);
    setData(setDeathData, chartCompleteData[2].name);
    // eslint-disable-next-line
  }, [chart]);

  return (
    <Card>
      <CardContent>
        {historyData?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  fill: false,
                  borderColor: chartCompleteData[0].data.chartBorderColor,
                  data: historyData,
                  label: chartCompleteData[0].data.chartLabel,
                  yAxisID: "y-axis-1",
                },
                {
                  fill: false,
                  borderColor: chartCompleteData[1].data.chartBorderColor,
                  data: recoverData,
                  label: chartCompleteData[1].data.chartLabel,
                  yAxisID: "y-axis-2",
                },
                {
                  fill: false,
                  borderColor: chartCompleteData[2].data.chartBorderColor,
                  data: deathData,
                  label: chartCompleteData[2].data.chartLabel,
                  yAxisID: "y-axis-3",
                },
              ],
            }}
            height={200}
            options={options}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default HistoryChart;
