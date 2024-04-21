import Particles from "./components/particles/Particles";
import Card from "./components/card/Card";
import themes from "./_themes.module.scss";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles["container"]}>
      <Particles num={40} radius={6} color={themes["primary_color"]} />
      <div className={styles["credits"]}>
        Hi! This website was coded by Wilson Wu. Feel free to check out the code{" "}
        <a
          className={styles["link"]}
          href="https://github.com/wu-wilson/DataVis"
          target="_blank"
          rel="noopener noreferrer"
        >
          here!
        </a>
      </div>
      <Card />
    </div>
  );
};

export default App;
