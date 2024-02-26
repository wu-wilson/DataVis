import { ReactElement, useState } from "react";
import { BsBarChartFill, BsBookHalf } from "react-icons/bs";
import Analysis from "../../pages/analysis/Analysis";
import Persuasion from "../../pages/persuasion/Persuasion";
import styles from "./Card.module.scss";

type Tab = {
  name: string;
  icon: ReactElement;
  component: ReactElement;
};

const tabs: Tab[] = [
  {
    name: "Analysis",
    icon: <BsBarChartFill className={styles["tab-icon"]} size={15} />,
    component: <Analysis />,
  },
  {
    name: "Persuasion",
    icon: <BsBookHalf className={styles["tab-icon"]} size={15} />,
    component: <Persuasion />,
  },
];

const Card = () => {
  // Store selected tab
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

  return (
    <div className={styles["container"]}>
      <div className={styles["card"]}>
        <div className={styles["tabs"]}>
          {tabs.map((tab) => (
            <div
              className={`${styles["tab"]} ${
                selectedTab === tab ? styles["selectedTab"] : ""
              }`}
              key={tab.name}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.icon} {tab.name}
            </div>
          ))}
        </div>
        <div className={styles["content"]}>{selectedTab.component}</div>
      </div>
    </div>
  );
};

export default Card;
