import { useState, useEffect } from "react";
import { parse } from "papaparse";
import Loader from "../../components/loader/Loader";
import Chart1 from "./charts/Chart1/Chart1";
import styles from "./Analysis.module.scss";

export type ParsedRawData = {
  year: string;
  month: string;
  date_of_month: string;
  day_of_week: string;
  births: string;
}[];

const isParsedRawData = (data: any): data is ParsedRawData => {
  if (Array.isArray(data)) {
    return (
      data[0].year &&
      data[0].month &&
      data[0].date_of_month &&
      data[0].day_of_week &&
      data[0].births
    );
  }
  return false;
};

const Analysis = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [parsedData, setParsedData] = useState<ParsedRawData | null>(null);

  const parseData = async () => {
    // Parse CSV data
    const csv = await fetch("US_births_2000-2014_SSA.csv").then((res) =>
      res.text()
    );
    const data = parse(csv, { header: true }).data;
    if (isParsedRawData(data)) {
      setParsedData(data);
    }
  };

  useEffect(() => {
    parseData();
  }, []);

  useEffect(() => {
    if (parsedData) {
      setLoading(false);
    }
  }, [parsedData]);

  return loading ? (
    <div className={styles["loader"]}>
      <Loader message={"Getting your charts ready..."} />
    </div>
  ) : (
    <div className={styles["container"]}>
      {parsedData ? (
        <div className={styles["charts"]}>
          <Chart1 data={parsedData} />
        </div>
      ) : null}
    </div>
  );
};

export default Analysis;
