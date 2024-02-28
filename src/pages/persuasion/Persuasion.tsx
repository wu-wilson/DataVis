import { useState, useRef, useEffect } from "react";
import { ParsedRawData, isParsedRawData } from "../analysis/Analysis";
import { parse } from "papaparse";
import Loader from "../../components/loader/Loader";
import styles from "./Persuasion.module.scss";

type VisualizationDataRow = {
  diameter: number;
  date: string;
};

const Persuasion = () => {
  const [showVisualization, setShowVisualization] = useState<boolean>(false);

  const beginVisualization = () => {
    setShowVisualization(true);
  };

  const [loading, setLoading] = useState<boolean | null>(false);

  useEffect(() => {
    if (showVisualization) {
      setLoading(true);
    }
  }, [showVisualization]);

  useEffect(() => {
    if (loading) {
      formatData();
    }
  }, [loading]);

  const formatData = async () => {
    // Parse CSV data
    const csv = await fetch("US_births_2000-2014_SSA.csv").then((res) =>
      res.text()
    );
    const data = parse(csv, { header: true }).data;
    if (isParsedRawData(data)) {
      let formatted: VisualizationDataRow[] = [
        {
          diameter: 0,
          date: new Date(2000, 0, 1).toLocaleString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      ];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          formatted.push({
            diameter: Math.floor(parseInt(data[i].births) / 1000),
            date: new Date(
              parseInt(data[i].year),
              parseInt(data[i].month) - 1,
              parseInt(data[i].date_of_month)
            ).toLocaleString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          });
        } else {
          formatted.push({
            diameter:
              Math.floor(parseInt(data[i].births) / 1000) +
              formatted[i - 1].diameter,
            date: new Date(
              parseInt(data[i].year),
              parseInt(data[i].month) - 1,
              parseInt(data[i].date_of_month)
            ).toLocaleString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          });
        }
      }
      setFormattedData(formatted);
    }
  };

  const [formattedData, setFormattedData] = useState<
    VisualizationDataRow[] | null
  >(null);

  const [animationIndex, setAnimationIndex] = useState<number>(0);

  useEffect(() => {
    if (formattedData) {
      setLoading(false);
    }
  }, [formattedData]);

  useEffect(() => {
    if (loading === false) {
      // create a interval and get the id
      const myInterval = setInterval(() => {
        setAnimationIndex((prevIndex) => prevIndex + 1);
      }, 50);
      // clear out the interval using it id when unmounting the component
      return () => clearInterval(myInterval);
    }
  }, [loading]);

  return (
    <div className={styles["container"]}>
      {showVisualization ? (
        loading ? (
          <Loader message={"Getting things ready..."} />
        ) : (
          <div className={styles["visualization"]}>
            <div className={styles["info"]}>
              <div className={styles["vars-container"]}>
                <div className={styles["vars"]}>
                  <span className={styles["title"]}>VARIABLES</span>
                  <div className={styles["subtext"]}>
                    <span>
                      Diameter:{" "}
                      <span className={styles["accent"]}>
                        {formattedData
                          ? formattedData[animationIndex].diameter
                          : null}{" "}
                        px
                      </span>
                    </span>
                    <span>
                      Date:{" "}
                      <span>
                        {formattedData
                          ? formattedData[animationIndex].date
                          : null}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles["scale-container"]}>
                <span className={styles["scale"]}>
                  <span className={styles["title"]}>SCALE</span>
                  <div className={styles["subtext"]}>
                    <span
                      className={styles["accent"]}
                    >{`1 pixel in diameter → `}</span>
                    <div className={`${styles["pixel"]} ${styles["accent"]}`} />
                    <span>{` = 1,000 births`}</span>
                  </div>
                  <div>That's enough people to fill commercial 2 planes!</div>
                </span>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className={styles["landing"]}>
          <span>Should we be worried about the U.S. birth rate?</span>
          <span>Probably not.</span>
          <button className={styles["button"]} onClick={beginVisualization}>
            BEGIN VISUALIZATION
          </button>
          <div className={styles["scale-container"]}>
            <span className={styles["scale"]}>
              <span className={styles["title"]}>SCALE</span>
              <div className={styles["subtext"]}>
                <span
                  className={styles["accent"]}
                >{`1 pixel in radius → `}</span>
                <div className={`${styles["pixel"]} ${styles["accent"]}`} />
                <span>{` = 1,000 births`}</span>
              </div>
              <div>That's enough people to fill 2 commercial planes!</div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Persuasion;
