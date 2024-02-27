import { useState, useEffect, useRef } from "react";
import { chart2Options, formatChart2Data } from "./util";
import { ParsedRawData } from "../../Analysis";
import Highcharts from "highcharts";
import HighchartsReact, {
  HighchartsReactRefObject,
} from "highcharts-react-official";
import styles from "./Chart2.module.scss";

const Chart2 = ({ data }: { data: ParsedRawData }) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const ref = useRef<HighchartsReactRefObject | null>(null);

  const resetZoom = () => {
    if (ref && ref.current) {
      ref.current.chart.zoomOut();
      setIsZoomed(false);
    }
  };

  const [options, setOptions] = useState<Highcharts.Options | null>(null);

  const initializeOptions = () => {
    const formatted = formatChart2Data(data);
    let optionsObj: Highcharts.Options = chart2Options;
    optionsObj.series = formatted;
    if (optionsObj.chart?.events) {
      optionsObj.chart.events.selection = function () {
        setIsZoomed(true);
        return true;
      };
    }
    setOptions(optionsObj);
  };

  useEffect(() => {
    initializeOptions();
  }, []);

  return options ? (
    <div className={styles["container"]}>
      {isZoomed ? (
        <button className={styles["zoom"]} onClick={resetZoom}>
          Reset Zoom
        </button>
      ) : null}
      <HighchartsReact ref={ref} highcharts={Highcharts} options={options} />
    </div>
  ) : null;
};

export default Chart2;
