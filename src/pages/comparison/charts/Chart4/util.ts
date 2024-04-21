import { ParsedRawData } from "../../../analysis/Analysis";
import { SeriesLineOptions } from "highcharts";
import themes from "../../../../_themes.module.scss";
import styles from "./Chart4.module.scss";

export const formatChart4Data = (
  data: ParsedRawData,
  year1: number,
  year2: number
): SeriesLineOptions[] => {
  let formatted: SeriesLineOptions[] = [
    { type: "line", color: themes.primary_color, name: "2000", data: [] },
    { type: "line", color: "#7cc7a2", name: "2014", data: [] },
  ];
  // Map each month of the chosen years to its number of births
  let counts: { [key: string]: number } = {};
  data.forEach((row) => {
    if (parseInt(row.year) === year1 || parseInt(row.year) === year2) {
      const key = row.year + "," + (parseInt(row.month) - 1);
      if (counts[key]) {
        counts[key] += parseInt(row.births);
      } else {
        counts[key] = parseInt(row.births);
      }
    }
  });
  // Based on the map, fill the data array
  for (const key in counts) {
    const [year, month] = key.split(",");
    const date: number = Date.UTC(2000, parseInt(month), 2);
    if (parseInt(year) === year1) {
      formatted[0].data?.push([date, counts[key]]);
    } else {
      formatted[1].data?.push([date, counts[key]]);
    }
  }
  console.log(data);
  return formatted;
};

const getTooltipTitle = (series: string, x: number) => {
  const months = [
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
  ];
  const date = new Date(x);
  const monthIndex = date.getUTCMonth();
  let title = `${series} ${months[monthIndex]}`;
  return title;
};

export const chart4Options: Highcharts.Options = {
  chart: {
    type: "line",
    height: 375,
    zooming: {
      type: "x",
    },
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
  title: {
    style: {
      color: themes.font_color,
      fontWeight: "normal",
      textDecoration: "underline",
    },
  },
  legend: {
    enabled: false,
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
    type: "datetime",
    labels: {
      format: "{value:%b.}",
      style: {
        color: themes.font_color,
      },
    },
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
  },
  subtitle: {
    text: `<span class=${styles["subtitle"]}><span>Drag over an area to zoom</span><span>Hold shift and drag to pan</span></span>`,
    useHTML: true,
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      return `<div class=${styles["tooltip"]}><span class=${
        styles["title"]
      }>${getTooltipTitle(
        this.series.name,
        this.point.x
      )}</span><span>${this.point.y?.toLocaleString()} Births</span></div>`;
    },
  },
  series: [],
};
