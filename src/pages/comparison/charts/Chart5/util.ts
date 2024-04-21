import { ParsedRawData } from "../../../analysis/Analysis";
import themes from "../../../../_themes.module.scss";
import styles from "./Chart5.module.scss";

export type MapObj = {
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
  1: "#7cc7a2",
};

type ColumnSeries = {
  type: "column";
  name: string;
  color: string;
  data: number[];
};

export const formatChart5Data = (
  data: ParsedRawData,
  year1: number,
  year2: number
): ColumnSeries[] => {
  let formatted: ColumnSeries[] = [];

  for (let i = 0; i < 2; i++) {
    const name = i === 0 ? "" + year1 : "" + year2;
    const color = colorMap[i];
    formatted.push({
      type: "column",
      name: name,
      color: color,
      data: new Array<number>(7).fill(0),
    });
  }

  data.forEach((row) => {
    if (parseInt(row.year) === year1 || parseInt(row.year) === year2) {
      const seriesIndex = parseInt(row.year) === year1 ? 0 : 1;
      const dayIndex = parseInt(row.day_of_week) - 1;
      formatted[seriesIndex].data[dayIndex] += parseInt(row.births);
    }
  });

  return formatted;
};

export const chart5Options: Highcharts.Options = {
  chart: {
    type: "column",
    height: 425,
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
      textDecoration: "underline",
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
      animation: {
        duration: 1500,
      },
    },
    column: {
      borderWidth: 0,
      borderRadius: 0,
    },
  },
  subtitle: {
    text: `<span class=${styles["subtitle"]}><span>Drag over an area to zoom</span></span>`,
    useHTML: true,
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return `<div class=${styles["tooltip"]}><span class=${styles["title"]}>${
        this.series.name
      } ${
        dayMap[this.point.x + 1]
      }</span><span>${this.point.y?.toLocaleString()} Births</span></div>`;
    },
  },
  series: [],
};
