import { ParsedRawData } from "../../Analysis";
import { SeriesColumnOptions } from "highcharts";
import themes from "../../../../_themes.module.scss";

type MapObj = {
  [key: number]: string;
};

const dayMap: MapObj = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sundary",
};

const colorMap: MapObj = {
  0: "#89a4c7",
  1: "#9eb2cb",
  2: "#a4c789",
  3: "#afc7d3",
  4: "#8a82c7",
  5: "#7cc7a2",
  6: "#89c7a4",
  7: "#c78d97",
  8: "#7a89c7",
  9: "#b3b389",
  10: "#89c7c7",
  11: "#c789c7",
  12: "#c7c7a4",
  13: "#a489c7",
  14: "#c7a4c7",
};

type ColumnSeries = {
  type: "column";
  name: string;
  color: string;
  data: number[];
};

export const formatChart2Data = (data: ParsedRawData): ColumnSeries[] => {
  let formatted: ColumnSeries[] = [];

  for (let i = 2000; i <= 2014; i++) {
    formatted.push({
      type: "column",
      name: "" + i,
      color: colorMap[i - 2000],
      data: new Array<number>(7).fill(0),
    });
  }

  data.forEach((row) => {
    const seriesIndex = parseInt(row.year) - 2000;
    const dayIndex = parseInt(row.day_of_week) - 1;
    formatted[seriesIndex].data[dayIndex] += parseInt(row.births);
  });

  return formatted;
};

export const chart2Options: Highcharts.Options = {
  chart: {
    type: "column",
    zooming: {
      type: "xy",
    },
    style: {
      fontFamily: themes.font_family,
    },
    backgroundColor: themes.chart_bg,
    panKey: "shift",
    events: {
      selection: undefined,
    },
  },
  title: {
    text: "U.S. Births by Day of the Week",
    style: {
      color: themes.font_color,
      fontWeight: "normal",
    },
  },
  legend: {
    enabled: true,
    itemStyle: {
      color: themes.font_color,
    },
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
  xAxis: {
    title: {
      style: {
        color: themes.font_color,
      },
    },
    labels: {
      style: {
        color: themes.font_color,
      },
    },
    categories: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    tickColor: themes.font_color,
    lineColor: themes.font_color,
  },
  yAxis: {
    title: {
      text: "Births",
      style: {
        color: themes.font_color,
      },
    },
    labels: {
      style: {
        color: themes.font_color,
      },
    },
    tickColor: themes.font_color,
  },
  plotOptions: {
    series: {
      stacking: "normal",
    },
    column: {
      borderWidth: 0,
      borderRadius: 0,
    },
  },
  series: [],
};
