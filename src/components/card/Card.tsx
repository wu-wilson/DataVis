import { ReactElement, useState } from "react";
import { BsGraphUpArrow, BsBookHalf } from "react-icons/bs";
import Analysis from "../../pages/analysis/Analysis";
import Persuasion from "../../pages/persuasion/Persuasion";
import styles from "./Card.module.scss";

type tab = {
  name: string;
  icon: ReactElement;
  component: ReactElement;
};

const tabs: tab[] = [
  {
    name: "Analysis",
    icon: <BsGraphUpArrow className={styles["tab-icon"]} size={15} />,
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
  const [selectedTab, setSelectedTab] = useState<tab>(tabs[0]);

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
