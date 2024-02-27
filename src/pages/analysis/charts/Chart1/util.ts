import { ParsedRawData } from "../../Analysis";
import { SeriesLineOptions } from "highcharts";
import themes from "../../../../_themes.module.scss";

export const formatChart1Data = (data: ParsedRawData): SeriesLineOptions[] => {
  let formatted: SeriesLineOptions[] = [
    { type: "line", color: themes.primary_color, name: "Births", data: [] },
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
    const date: number = Date.UTC(parseInt(year), parseInt(month));
    formatted[0].data?.push([date, counts[key]]);
  }
  return formatted;
};

export const chart1Options: Highcharts.Options = {
  chart: {
    type: "line",
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
    text: "U.S. Births Over Time",
    style: {
      color: themes.font_color,
      fontWeight: "normal",
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
      format: "{value:%b. %Y}",
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
  series: [],
};