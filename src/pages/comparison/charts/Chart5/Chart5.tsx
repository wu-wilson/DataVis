import { useState, useEffect, useRef } from "react";
import { chart5Options, formatChart5Data } from "./util";
import { ParsedRawData } from "../../../analysis/Analysis";
import Highcharts from "highcharts";
import HighchartsReact, {
  HighchartsReactRefObject,
} from "highcharts-react-official";
import styles from "./Chart5.module.scss";

const Chart5 = ({
  data,
  year1,
  year2,
}: {
  data: ParsedRawData;
  year1: number;
  year2: number;
}) => {
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
    const formatted = formatChart5Data(data, year1, year2);
    let optionsObj: Highcharts.Options = chart5Options;
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

export default Chart5;
