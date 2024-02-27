import { useState, useEffect, useRef } from "react";
import { chart3Options, formatChart3Data } from "./util";
import { ParsedRawData } from "../../Analysis";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Heatmap from "highcharts/modules/heatmap.js";
import styles from "./Chart3.module.scss";

Heatmap(Highcharts);

const Chart3 = ({ data }: { data: ParsedRawData }) => {
  const [options, setOptions] = useState<Highcharts.Options | null>(null);

  const initializeOptions = () => {
    const formatted = formatChart3Data(data);
    let optionsObj: Highcharts.Options = chart3Options;
    optionsObj.series = formatted;
    setOptions(optionsObj);
  };

  useEffect(() => {
    initializeOptions();
  }, []);

  return options ? (
    <div className={styles["container"]}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  ) : null;
};

export default Chart3;
