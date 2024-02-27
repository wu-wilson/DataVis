import { ParsedRawData } from "../../Analysis";
import { SeriesHeatmapOptions } from "highcharts";
import { MapObj } from "../Chart2/util";
import themes from "../../../../_themes.module.scss";
import styles from "./Chart3.module.scss";

const MonthMap: MapObj = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const formatChart3Data = (
  data: ParsedRawData
): SeriesHeatmapOptions[] => {
  let formatted: SeriesHeatmapOptions[] = [
    { type: "heatmap", name: "Births", data: [] },
  ];
  // Map each month to its number of births
  let counts: { [key: string]: number } = {};
  data.forEach((row) => {
    const key = row.year + "," + (parseInt(row.month) - 1);
    if (counts[key]) {
      counts[key] += parseInt(row.births);
    } else {
      counts[key] = parseInt(row.births);
    }
  });
  // Based on the map, fill the data array
  for (const key in counts) {
    const [year, month] = key.split(",");
    formatted[0].data?.push({
      x: parseInt(month),
      y: parseInt(year),
      value: counts[key],
    });
  }
  return formatted;
};

export const chart3Options: Highcharts.Options = {
  chart: {
    type: "heatmap",
    height: 700,
    style: {
      fontFamily: themes.font_family,
    },
    backgroundColor: themes.chart_bg,
    panning: {
      enabled: true,
      type: "x",
    },
    panKey: "shift",
    events: {
      selection: undefined,
    },
  },
  colorAxis: {
    labels: {
      style: {
        color: themes.font_color,
      },
    },
    stops: [
      [0, "#ffffff"],
      [0.1, "#ccd7d7"],
      [0.2, "#b3c0c5"],
      [0.3, "#99a9b3"],
      [0.4, "#8092a1"],
      [0.5, "#667a8f"],
      [0.6, "#4d637d"],
      [0.7, "#334c6b"],
      [0.8, "#1a3559"],
      [0.9, "#002240"],
      [1, "#001624"],
    ],
  },
  title: {
    text: "U.S. Births By Month and Year",
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
        fillColor: themes.font_color,
      },
    },
    type: "datetime",
    labels: {
      format: "{value:%b. %Y}",
      style: {
        color: themes.font_color,
      },
    },
    categories: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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
    categories: Array.from({ length: 10 }, (_, i) => i + 2001 + ""),
    tickColor: themes.font_color,
  },
  plotOptions: {
    series: {
      animation: {
        duration: 1500,
      },
    },
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return `<div class=${styles["tooltip"]}><span class=${styles["title"]}>${
        MonthMap[this.point.x]
      } ${
        this.point.y
      }</span><span>${this.point.value?.toLocaleString()} Births</span></div>`;
    },
  },
  series: [],
};
