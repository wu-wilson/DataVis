import Particles from "./components/particles/Particles";
import Card from "./components/card/Card";
import themes from "./_themes.module.scss";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles["container"]}>
      <Particles num={40} radius={6} color={themes["primary_color"]} />
      <Card />
    </div>
  );
};

export default App;
