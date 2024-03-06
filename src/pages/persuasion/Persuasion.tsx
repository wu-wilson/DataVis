import { useState, useEffect } from "react";
import { parse } from "papaparse";
import { isParsedRawData } from "../analysis/Analysis";
import { FaBaby } from "react-icons/fa";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import Loader from "../../components/loader/Loader";
import themes from "../../_themes.module.scss";
import styles from "./Persuasion.module.scss";

type Frame = {
  year: number;
  numSymbols: number;
};

const Persuasion = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [frames, setFrames] = useState<Frame[] | null>(null);
  const [frameIndex, setFrameIndex] = useState<number>(0);

  const initializeFrames = async () => {
    // Parse CSV data
    const csv = await fetch("US_births_2000-2014_SSA.csv").then((res) =>
      res.text()
    );
    const data = parse(csv, { header: true }).data;

    // Set frames
    if (isParsedRawData(data)) {
      let frames: Frame[] = [];
      for (let i = 2000; i <= 2014; i++) {
        frames.push({
          year: i,
          numSymbols: 0,
        });
      }
      for (let i = 0; i < data.length; i++) {
        const year = parseInt(data[i].year);
        const births = parseInt(data[i].births);
        for (let j = 0; j < frames.length; j++) {
          if (year <= frames[j].year) {
            frames[j].numSymbols += births;
          }
        }
      }
      for (let i = 0; i < frames.length; i++) {
        frames[i].numSymbols = Math.floor(frames[i].numSymbols / 10000);
      }
      setFrames(frames);
    }
  };

  useEffect(() => {
    initializeFrames();
  }, []);

  useEffect(() => {
    if (frames) {
      setLoading(false);
    }
  }, [frames]);

  const nextFrame = () => {
    if (frames && frameIndex + 1 < frames.length) {
      setFrameIndex(frameIndex + 1);
    }
  };

  const prevFrame = () => {
    if (frameIndex - 1 > -1) {
      setFrameIndex(frameIndex - 1);
    }
  };

  return loading ? (
    <Loader message={"Getting things ready..."} />
  ) : (
    <div className={styles["container"]}>
      <span className={styles["header"]}>
        Should we be worried about the U.S. birth rate? Probably not.
      </span>
      <div className={styles["cards"]}>
        <div className={styles["scale"]}>
          <div className={styles["content"]}>
            <span className={styles["title"]}>SCALE</span>
            <span className={styles["subtext-container"]}>
              <span className={styles["subtext"]}>
                <span className={styles["accent"]}>1 baby → </span>
                <FaBaby className={styles["accent"]} />
                <span> = 10,000 births!</span>
              </span>
              <span className={styles["subtext"]}>
                Enough people to fill 12 planes!
              </span>
            </span>
          </div>
        </div>
        <div className={styles["variables"]}>
          <div className={styles["content"]}>
            <span className={styles["title"]}>VARIABLES</span>
            <span className={styles["subtext-container"]}>
              <span className={styles["subtext"]}>
                Year ={" "}
                {frames && frames[frameIndex] ? frames[frameIndex].year : null}
              </span>
              <span className={styles["subtext"]}>
                Number of symbols ={" "}
                {frames && frames[frameIndex]
                  ? frames[frameIndex].numSymbols.toLocaleString()
                  : null}
              </span>
            </span>
          </div>
        </div>
        <div className={styles["controls"]}>
          <div className={styles["content"]}>
            <span className={styles["title"]}>CONTROLS</span>
            <span className={styles["subtext-container"]}>
              <span className={styles["subtext"]}>
                <button
                  className={`${styles["button"]} ${
                    frameIndex === 0 ? styles["disabled"] : ""
                  }`}
                  onClick={prevFrame}
                >
                  <MdOutlineNavigateBefore />
                  Prev
                </button>
                <button
                  className={`${styles["button"]} ${
                    frames && frameIndex === frames.length - 1
                      ? styles["disabled"]
                      : ""
                  }`}
                  onClick={nextFrame}
                >
                  Next
                  <MdOutlineNavigateNext />
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles["symbols-box"]}>
        {frames
          ? Array(frames[frameIndex].numSymbols)
              .fill(0)
              .map((_, i) => <FaBaby key={i} color={themes.primary_color} />)
          : null}
      </div>
    </div>
  );
};

export default Persuasion;
