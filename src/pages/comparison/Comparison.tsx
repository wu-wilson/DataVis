import { useEffect, useState } from "react";
import { parse } from "papaparse";
import { ParsedRawData, isParsedRawData } from "../analysis/Analysis";
import Chart4 from "./charts/Chart4/Chart4";
import Chart5 from "./charts/Chart5/Chart5";
import styles from "./Comparison.module.scss";
import Loader from "../../components/loader/Loader";

const Comparison = ({ year1, year2 }: { year1: number; year2: number }) => {
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
      <div className={styles["instructions"]}>
        <span className={styles["title"]}>Want to Compare More?</span>
        <span className={styles["subtitle"]}>
          Place two different weights onto the physical prototype scale to
          compare the years they correspond to.
        </span>
      </div>
      {parsedData ? (
        <div className={styles["charts"]}>
          <Chart4 data={parsedData} year1={year1} year2={year2} />
          <Chart5 data={parsedData} year1={year1} year2={year2} />
        </div>
      ) : null}
    </div>
  );
};

export default Comparison;
