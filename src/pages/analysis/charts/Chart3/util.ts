import { ParsedRawData } from "../../Analysis";
import { SeriesHeatmapOptions } from "highcharts";
import themes from "../../../../_themes.module.scss";

export const formatChart3Data = (
  data: ParsedRawData
): SeriesHeatmapOptions[] => {
  let formatted: SeriesHeatmapOptions[] = [
    { type: "heatmap", name: "Births", data: [] },
  ];
  return formatted;
};

export const chart3Options: Highcharts.Options = {};
